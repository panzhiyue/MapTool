<template>
	<div class="status-bar">{{ cameraInfo }}{{ performanceInfo }}</div>
</template>
<script setup>
import { useVueCesium } from 'vue-cesium';
import { heightToLevel } from '../../utils/cesium-helpers';
import throttle from '@/utils/private/throttle';
const $vc = useVueCesium();
const viewer = $vc.viewer;

//相机信息
const cameraInfo = reactive({
	heading: 'NaN',
	pitch: 'NaN',
	roll: 'NaN',
	height: 'NaN',
	level: 'NaN',
});

//性能信息
const performanceInfo = reactive({
	fps: 'NaN',
	ms: 'NaN',
});
let lastMouseX = -1;
let lastMouseY = -1;
let debugShowFramesPerSecond = false;
const scratchArray = [];
const scratchSphereIntersectionResult = {
	start: 0.0,
	stop: 0.0,
};
const scratchV0 = {};
const scratchV1 = {};
const scratchV2 = {};
onMounted(() => {
	console.log(viewer);
	const viewerElement = viewer._element;
	viewerElement.addEventListener('wheel', onMouseMove, false);
	viewerElement.addEventListener('mousemove', onMouseMove, false);
	viewerElement.addEventListener('touchmove', onMouseMove, false);
	extendForMouseCoords();
	viewer.camera.changed.addEventListener(onCameraChanged);
	onCameraChanged();

	debugShowFramesPerSecond = viewer.scene.debugShowFramesPerSecond;
	viewer.scene.debugShowFramesPerSecond = true;
	viewer.scene.postRender.addEventListener(onScenePostRender);
});

onUnmounted(() => {
	viewerElement.removeEventListener('wheel', onMouseMove);
	viewerElement.removeEventListener('mousemove', onMouseMove);
	viewerElement.removeEventListener('touchmove', onMouseMove);

	viewer.camera.changed.removeEventListener(onCameraChanged);

	if (debugShowFramesPerSecond) {
		viewer.scene._performanceDisplay._container.style.display = 'block';
	} else {
		viewer.scene.debugShowFramesPerSecond = false;
	}

	viewer.scene.postRender.removeEventListener(onScenePostRender);
});

const onCameraChanged = () => {
	const scene = viewer.scene;
	const sscc = scene.screenSpaceCameraController;
	if (scene.mode === Cesium.SceneMode.MORPHING || !sscc.enableInputs) {
		return;
	}

	const { Math: CesiumMath } = Cesium;
	cameraInfo.heading = CesiumMath.toDegrees(viewer.camera.heading).toFixed(1);
	cameraInfo.pitch = CesiumMath.toDegrees(viewer.camera.pitch).toFixed(1);
	cameraInfo.roll = CesiumMath.toDegrees(viewer.camera.roll).toFixed(1);
	cameraInfo.height = viewer.camera.positionCartographic.height.toFixed(2);
	cameraInfo.level = heightToLevel(Number(cameraInfo.height)).toFixed(0);
};

const onScenePostRender = throttle((scene) => {
	performanceInfo.fps = scene._performanceDisplay?._fpsText.nodeValue;
	performanceInfo.ms = scene._performanceDisplay?._msText.nodeValue;
	scene._performanceDisplay._container.style.display = 'none';
}, 250);

const onMouseMove = (e) => {
	const { Cartesian2, SceneMode } = Cesium;

	if (viewer.scene.mode === SceneMode.MORPHING) return;

	const clientX =
		e.type === 'mousemove' || e.type === 'wheel' ? e.clientX : e.changedTouches[0].clientX;
	const clientY =
		e.type === 'mousemove' || e.type === 'wheel' ? e.clientY : e.changedTouches[0].clientY;

	if (clientX === lastMouseX && clientY === lastMouseY) {
		return;
	}

	lastMouseX = clientX;
	lastMouseY = clientY;

	const viewerElement = viewer._element;

	if (viewer) {
		const rect = viewerElement.getBoundingClientRect();
		const position = new Cartesian2(clientX - rect.left, clientY - rect.top);

		const { Cartographic, defined, EllipsoidTerrainProvider, Intersections2D, SceneMode } = Cesium;
		const scene = viewer.scene;
		// console.log(scene);
		const camera = scene.camera;
		const pickRay = camera.getPickRay(position);
		const globe = scene.globe;
		const pickedTriangle = globe.pickTriangle(pickRay, scene);
		if (defined(pickedTriangle)) {
			// Get a fast, accurate-ish height every time the mouse moves.
			const ellipsoid = globe.ellipsoid;

			const v0 = ellipsoid.cartesianToCartographic(pickedTriangle.v0);
			const v1 = ellipsoid.cartesianToCartographic(pickedTriangle.v1);
			const v2 = ellipsoid.cartesianToCartographic(pickedTriangle.v2);
			const intersection = ellipsoid.cartesianToCartographic(
				scene.mode === SceneMode.SCENE3D
					? pickedTriangle.intersection
					: scene.globe.pick(pickRay, scene),
			);
			let errorBar;

			if (globe.terrainProvider instanceof EllipsoidTerrainProvider) {
				intersection.height = undefined;
			} else {
				const barycentric = Intersections2D.computeBarycentricCoordinates(
					intersection.longitude,
					intersection.latitude,
					v0.longitude,
					v0.latitude,
					v1.longitude,
					v1.latitude,
					v2.longitude,
					v2.latitude,
				);

				if (barycentric.x >= -1e-15 && barycentric.y >= -1e-15 && barycentric.z >= -1e-15) {
					const height =
						barycentric.x * v0.height + barycentric.y * v1.height + barycentric.z * v2.height;
					intersection.height = height;
				}
				const geometricError = globe.terrainProvider.getLevelMaximumGeometricError(
					pickedTriangle.tile.level,
				);
				const approximateHeight = intersection.height;
				const minHeight = Math.max(
					pickedTriangle.tile.data.tileBoundingRegion.minimumHeight,
					approximateHeight - geometricError,
				);
				const maxHeight = Math.min(
					pickedTriangle.tile.data.tileBoundingRegion.maximumHeight,
					approximateHeight + geometricError,
				);
				const minHeightGeoid = minHeight - (this.geoidModel ? this.geoidModel.minimumHeight : 0.0);
				const maxHeightGeoid = maxHeight + (this.geoidModel ? this.geoidModel.maximumHeight : 0.0);
				errorBar = Math.max(
					Math.abs(approximateHeight - minHeightGeoid),
					Math.abs(maxHeightGeoid - approximateHeight),
				);
			}
			Cartographic.clone(intersection, this.lastHeightSamplePosition);
			const terrainProvider = globe.terrainProvider;

			cartographicToFields(intersection, errorBar);
			if (!(terrainProvider instanceof EllipsoidTerrainProvider)) {
				this.debounceSampleAccurateHeight(terrainProvider, intersection);
			}
		} else {
			// this.elevation = '';
			// this.utmZone = '';
			// this.latitude = '';
			// this.longitude = '';
			// this.north = '';
			// this.east = '';
		}
	}
};
const mouseInfo = reactive({
	utmZone: '',
	north: '',
	east: '',
	latitude: '',
	longitude: '',
	elevation: '',
});
const cartographicToFields = (coordinates, errorBar) => {
	const { Math: CesiumMath } = Cesium;
	const latitude = CesiumMath.toDegrees(coordinates.latitude);
	const longitude = CesiumMath.toDegrees(coordinates.longitude);

	if (this.useProjection) {
		const prettyProjection = prettifyProjection(
			longitude,
			latitude,
			this.proj4Projection,
			this.proj4longlat,
			this.projectionUnits,
		);
		mouseInfo.utmZone = prettyProjection.utmZone;
		mouseInfo.north = prettyProjection.north;
		mouseInfo.east = prettyProjection.east;
	}

	const prettyCoordinate = prettifyCoordinates(longitude, latitude, {
		height: coordinates.height,
		errorBar: errorBar,
		decimal: this.decimal,
		rangeType: this.rangeType,
	});

	mouseInfo.latitude = prettyCoordinate.latitude;
	mouseInfo.longitude = prettyCoordinate.longitude;
	mouseInfo.elevation = prettyCoordinate.elevation;
};

function extendForMouseCoords() {
	const {
		Globe,
		GlobeSurfaceTile,
		BoundingSphere,
		defaultValue,
		Cartesian3,
		defined,
		DeveloperError,
		IntersectionTests,
		SceneMode,
	} = Cesium;
	Globe.prototype.pickTriangle =
		Globe.prototype.pickTriangle ||
		function (ray, scene, cullBackFaces, result) {
			console.log(ray, scene);
			// >>includeStart('debug', pragmas.debug);
			if (!defined(ray)) {
				throw new DeveloperError('ray is required');
			}
			if (!defined(scene)) {
				throw new DeveloperError('scene is required');
			}
			// >>includeEnd('debug');

			cullBackFaces = defaultValue(cullBackFaces, true);

			const mode = scene.mode;
			const projection = scene.mapProjection;

			const sphereIntersections = scratchArray;
			sphereIntersections.length = 0;

			const tilesToRender = this._surface._tilesToRender;
			let length = tilesToRender.length;

			let tile;
			let i;

			for (i = 0; i < length; ++i) {
				tile = tilesToRender[i];
				const surfaceTile = tile.data;

				if (!defined(surfaceTile)) {
					continue;
				}

				const boundingVolume = surfaceTile.pickBoundingSphere;
				if (mode !== SceneMode.SCENE3D) {
					BoundingSphere.fromRectangleWithHeights2D(
						tile.rectangle,
						projection,
						surfaceTile.minimumHeight,
						surfaceTile.maximumHeight,
						boundingVolume,
					);
					Cartesian3.fromElements(
						boundingVolume.center.z,
						boundingVolume.center.x,
						boundingVolume.center.y,
						boundingVolume.center,
					);
				} else {
					BoundingSphere.clone(surfaceTile.boundingSphere3D, boundingVolume);
				}

				const boundingSphereIntersection = IntersectionTests.raySphere(
					ray,
					boundingVolume,
					scratchSphereIntersectionResult,
				);
				if (defined(boundingSphereIntersection)) {
					sphereIntersections.push(tile);
				}
			}

			sphereIntersections.sort(createComparePickTileFunction(ray.origin));

			let intersection;
			length = sphereIntersections.length;
			for (i = 0; i < length; ++i) {
				intersection = sphereIntersections[i].data.pickTriangle(
					ray,
					scene.mode,
					scene.mapProjection,
					cullBackFaces,
					result,
				);
				if (defined(intersection)) {
					intersection.tile = sphereIntersections[i];
					break;
				}
			}

			return intersection;
		};
	GlobeSurfaceTile.prototype.pickTriangle =
		GlobeSurfaceTile.prototype.pickTriangle ||
		function (ray, mode, projection, cullBackFaces) {
			const mesh = this.renderedMesh;
			if (!defined(mesh)) {
				return undefined;
			}

			const vertices = mesh.vertices;
			const indices = mesh.indices;
			const encoding = mesh.encoding;

			const length = indices.length;
			for (let i = 0; i < length; i += 3) {
				const i0 = indices[i];
				const i1 = indices[i + 1];
				const i2 = indices[i + 2];

				const v0 = getPosition(encoding, mode, projection, vertices, i0, scratchV0);
				const v1 = getPosition(encoding, mode, projection, vertices, i1, scratchV1);
				const v2 = getPosition(encoding, mode, projection, vertices, i2, scratchV2);

				const intersection = IntersectionTests.rayTriangle(
					ray,
					v0,
					v1,
					v2,
					cullBackFaces,
					new Cartesian3(),
				);
				if (defined(intersection)) {
					return {
						intersection: intersection,
						v0: v0,
						v1: v1,
						v2: v2,
					};
				}
			}

			return undefined;
		};
}

function createComparePickTileFunction(rayOrigin) {
	const { BoundingSphere } = Cesium;
	return function (a, b) {
		const aDist = BoundingSphere.distanceSquaredTo(a.data.pickBoundingSphere, rayOrigin);
		const bDist = BoundingSphere.distanceSquaredTo(b.data.pickBoundingSphere, rayOrigin);

		return aDist - bDist;
	};
}

// var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// const mouseOverHandler = function (movement) {
// 	let endPosition = movement.endPosition;

// 	//得到当前三维场景的椭球体
// 	var ellipsoid = viewer.scene.globe.ellipsoid;
// 	var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
// 	if (cartesian) {
// 		//将笛卡尔坐标转换为地理坐标
// 		var cartographic = ellipsoid.cartesianToCartographic(cartesian);
// 		//将弧度转为度的十进制度表示
// 		info.longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
// 		info.latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
// 		//获取高度
// 		info.height = Math.ceil(viewer.camera.positionCartographic.height.toFixed(2));
// 	}

// 	//俯仰角
// 	info.pitch = Number(viewer.scene.camera.pitch).toFixed(2);
// 	//方向
// 	info.heading = Number(viewer.scene.camera.heading).toFixed(2);
// };
// handler.setInputAction(mouseOverHandler, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
</script>
<style lang="less" scoped>
.status-bar {
	width: 100%;
	height: 30px;
	background: rgba(71, 71, 71, 0.8);
	position: absolute;
	bottom: 0px;
	font-size: 14px;
	line-height: 30px;
	z-index: 9999;
	color: white;
}
</style>
