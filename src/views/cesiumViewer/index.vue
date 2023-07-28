<template>
	<vc-config-provider :cesiumPath="''">
		<vc-viewer :access-token="'cc4ded9c8fa65c654611568acc889439'">
			<vc-ajax-bar position="bottom" color="#21BA45" size="5px" positioning="fixed"></vc-ajax-bar>
		</vc-viewer>
	</vc-config-provider>
</template>
<script setup>
import * as Cesium from 'cesium';

window.Cesium = Cesium;
</script>
