<template>
	<panel
		class="layer-manager"
		title="图层管理器"
		placement="center-center"
		width="450px"
		height="300px"
		:draggable="{ target: $parent.$el }"
		:resizable="false"
		@close="handleClose">
		<div class="top">
			<ul>
				<li><button class="delete" @click="handleDelete"></button></li>
				<li><button class="add" @click="handleAdd"></button></li>
			</ul>
		</div>
		<div class="foot">
			<div class="item" v-for="(item, index) in list" :key="index" @dblclick="handleZoom(item)">
				<div class="img-container">
					<div class="img" :style="{ backgroundImage: 'url(' + item.image + ')' }"></div>
					<!-- <img :src="item.image" /> -->
				</div>

				<div class="tool">
					<a-checkbox v-model:checked="item.checked">{{ item.name }}</a-checkbox>
					<button class="edit"></button>
					<!-- <button class="setdefault"></button> -->
				</div>
			</div>
		</div>
	</panel>
</template>
<script setup>
import Panel from '../panel';
import { useCesiumViewerStore } from '@/store/cesiumViewer';
import { Math as CesiumMath, Cartesian3 } from 'cesium';
import { getSceneImageData } from '../../../utils/cesium-helpers';
const viewer = inject('viewer').value;
const cesiumViewerStore = useCesiumViewerStore();
const handleClose = () => {
	cesiumViewerStore.roamOpts.showViewManager = false;
};

const list = ref([]);
const handleAdd = () => {
	const cameraInfo = {};
	cameraInfo.heading = parseFloat(CesiumMath.toDegrees(viewer.camera.heading).toFixed(1));
	cameraInfo.pitch = parseFloat(CesiumMath.toDegrees(viewer.camera.pitch).toFixed(1));
	cameraInfo.roll = parseFloat(CesiumMath.toDegrees(viewer.camera.roll).toFixed(1));
	cameraInfo.height = parseFloat(viewer.camera.positionCartographic.height.toFixed(2));
	cameraInfo.longitude = parseFloat(
		CesiumMath.toDegrees(viewer.camera.positionCartographic.longitude).toFixed(1),
	);
	cameraInfo.latitude = parseFloat(
		CesiumMath.toDegrees(viewer.camera.positionCartographic.latitude).toFixed(1),
	);
	list.value.push({
		cameraInfo,
		image: getSceneImageData(viewer.scene),
		checked: false,
		name: '新视角',
	});
};

const handleDelete = () => {
	list.value = list.value.filter((item) => {
		return !item.checked;
	});
};

const handleZoom = (data) => {
	viewer.camera.flyTo({
		destination: Cartesian3.fromDegrees(
			data.cameraInfo.longitude,
			data.cameraInfo.latitude,
			data.cameraInfo.height,
		),
		orientation: {
			pitch: CesiumMath.toRadians(data.cameraInfo.pitch),
			roll: CesiumMath.toRadians(data.cameraInfo.roll),
			heading: CesiumMath.toRadians(data.cameraInfo.heading),
		},
		duration: 3,
	});
};
</script>
<style lang="less" scoped>
.view-manager :deep {
	min-width: 450px;
	top: 10px;

	.top {
		height: 35px;
		ul {
			height: 35px;
			margin-right: 20px;
			li {
				float: right;
				list-style: none;
				width: 28px;
				height: 28px;
				margin-top: 3.5px;
				padding-left: 5px;
				cursor: pointer;

				button {
					width: 20px;
					height: 20px;
					border: none;
					margin-top: 4px px;
					margin-left: -1px;
					cursor: pointer;
				}

				.cancel {
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABeElEQVQ4jZ3Uv0uVYRQH8I83IyiIFqcG79BUIbQINRsEIQ0ZtdTUVNLQ5ubUFEhzaIKCkEaBEQWhJThEWw39BzkpQdGieOOB88Dj23uvvve7nOfn9/2e8z3PO9But6fwRHe8w/Ue+wcwGGTbWIuNXXSKQ5+OSiYIE17iQZOLhxGejngez3CxD64tTLdishdxEWN9iruE11nhfsRz+ImzfRAu4U5WOBDxbzFuit+KGg5FTO62GhJ9wdfwoZMIX+FDoTQrbBWl6Ia3GMUIfuRLE3heKNyKAn/DtR5kb4qGT6TrSUw1vV84g/e4gFVcriFbwY0Yj+N7NrJKeAp/MBnzVJLPoSAjuXkzxhORdsKxOsIToXAZt2PtODZwBU9Ta8T6rah/RkfhcsZ+EIjneBIv4kObxbm7kfZ/qGuR0tl53K/s34sXVYuj9NwsHsf4ERZ6Ha6m3A0z+Bhu9kSdy/lHUcVhZAeeXsYOhsOQprhaR/gQc9ESTdHB1D9WH0JiamnLLQAAAABJRU5ErkJggg==)
						no-repeat;
				}

				.delete {
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAYAAABroNZJAAABAUlEQVQ4je3UPUoEQRAF4G9dkw00EY3EQMFAEMVAMBA8g1fwCJp6hkn3AOIBPIOBBqKZYGQgRoqI4A/uqjRUS9PMJhvvg+FNVXW9eTPT1Z2maYzAGfaq0gPW6uXTWMJci846ZqrcKrbwW4ucYHeUnQpdXLU5OcVjS8MnfqpcB702kX5cY2OqaDzGYREfRS5jP+L5iA8i7uW/k8SGhWXFx+vGa11iGzu4wCtmsVg6SXgq7p+r2n3wR/Bd8KAWGQsTkYlIMYSZB8H/x0EtUk5tPcFfwXknf+dCmuKMNDsLuI5EHrSbeGo6pBLO8YbNbKQUucVyUXwP4Y1iTWpeKZy8YPgHu0czAxzuy8AAAAAASUVORK5CYII=)
						no-repeat;
				}

				.add {
					width: 20px;
					height: 20px;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAArklEQVQ4jd2TvQ3CMBBGHz8joNSmQOxAAyUT0KRJHeaBmiI70MIaVNRkhYCQpStSxOezlSqfZOkVn5588nnmnCOSLXCXyhF4afV5zAZUwFpOFStbhN8e/8YQdgHOFiZlGsJPgAezBDZAqXQOPT4BhdJt/GK3wMpwU0va0R/Fj7wzjLwXfgIPpdtY/nINXITPwFUrW0YuApwtTMo0hH4ThjhbuEjpW4Q34C3HczjAH+FqFj+kdb/fAAAAAElFTkSuQmCC)
						no-repeat;
					background-size: contain;
					border: none;
					margin-top: 0px;
					margin-left: -1px;
					cursor: pointer;
				}
			}
		}
	}

	.foot {
		width: 100%;
		// display: flex;
		// flex-wrap: wrap;
		.item {
			width: 120px;
			height: 160px;
			float: left;

			.img-container {
				width: 114px;
				height: 114px;
				border-radius: 10px;
				margin: 3px;
				cursor: pointer;
				padding: 5px;
				.img {
					width: 104px;
					height: 104px;
					border-radius: 10px;
					cursor: pointer;

					background-size: auto 104px;
					background-position: center bottom;
					border: 5px solid #626262;

					&:hover {
						border: 5px solid #23dede;
					}
				}
			}

			.tool {
				padding: 2px 5px;

				button {
					width: 14px;
					height: 14px;
					border: none;
					margin-left: -1px;
					cursor: pointer;
					float: left;
					margin-top: 4px;
				}

				.ant-checkbox-wrapper {
					float: left;
					// display: inline-block;
					color: white;
					height: 14px;
					margin-left: 5px;
					.ant-checkbox {
						// top: 0px;
					}
					.ant-checkbox-inner {
						background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTE5VDE2OjAyOjQzKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0xOVQxNjowOTo1MCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNi0xOVQxNjowOTo1MCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZjdmYzUwOS0wMmU2LThiNGYtYjUwNy1lMWQzZjE3YTVmZDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Y2Y3ZmM1MDktMDJlNi04YjRmLWI1MDctZTFkM2YxN2E1ZmQ5IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Y2Y3ZmM1MDktMDJlNi04YjRmLWI1MDctZTFkM2YxN2E1ZmQ5Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjZjdmYzUwOS0wMmU2LThiNGYtYjUwNy1lMWQzZjE3YTVmZDkiIHN0RXZ0OndoZW49IjIwMTktMDYtMTlUMTY6MDI6NDMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7MkEDDAAAAKElEQVRIie3NQQEAMAgAIbTS+ndbCn9HAQbPsb0OSkpKSkpKSkpKwAf2ywBloax2nAAAAABJRU5ErkJggg==)
							no-repeat top;
						width: 14px;
						height: 14px;
					}
					span {
						font-size: 12px;
					}
				}

				.edit {
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAABqUlEQVQ4jZ3US0hVURTG8Z8pDiKLwMgSesycNIiwxwWhTCJyElGDRmKBQdFAAhsEgTQJEq49cBYVBtEDRw6lqCgaNAyaZESD7AFREGIYFBvWgdPheh9+cNiwH/+z1rfW3k3lctkytAf30ITjeJkQK5YBKuE5NmMTngW8YdhavEBzbq45gLsbgR3EJKYqrLXgUb2wlMY0+vED1yrs+VAPrBQGZ6mdQBuu5va8w9FasJ7wqKjB8G8Gb7ETn1uqgPbH5pHw6w9WYytu4zzu4hAWVanmvgANJy8ijYv4jl3oTJHE3GJ2qFJke/EY5/Aep3AJV3A2xmPYiLn8wWJk2/EEt/A6QBcCNhKRJND6IqgIa8cAvqAPT9Ea12YHLuNwpPi1kjd52BmcxHX8jbkE7YrKdWMdPi3h83+wX1gV0Bt4k1ubxZYowJLKYNuiShPYEFV8iPnwJvXRt2qgfGQHwtgO3AzgaHzdtSLKlLXG6RiPRCWH8BMP6oHkYSnFlRjHfbxqBFCE9WIsOn4hLvaaaNzf0cTpZ7U0n2CpHZJHCZhX8i/13J14UauLj/8AasRUFbJ4dawAAAAASUVORK5CYII=)
						no-repeat;
					background-size: contain;
					cursor: pointer;
					margin-left: 0px;
				}

				.setdefault {
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA70lEQVQ4jeWVvw7BUBSHv0pjIFYzi1ksRjOL98CAF6kBCasnYJDYJHZhsXoG8WeRqJzkiuvmapvW5kt6k3Nuz9emufnV8TwPQJYub858kiMccfRdYAi0gQVwBGpA2RjfA+sAZRHoAWlXyZZAU222gJExMAXGIe8ojnZKFTttI2+52dYz2Ur9EmYiDISR1YXOD4SOLtTxI/asBAkP6uLLQ6y4lmYJeABVVZ9UL7ZwA8yAi6obQCGJcGLUq6gyvnzDRPyxMPI5C8DXhbcfCK+60My/OFRkkXMo2SeZOFcBGwcJ2Lq4RNgB7sYvIA4DoPcErEMnjhusmGoAAAAASUVORK5CYII=)
						no-repeat;
					background-size: contain;
					cursor: pointer;
					margin-left: 5px;
				}
			}
		}
	}
}
</style>
