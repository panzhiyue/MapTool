import { Ref } from "vue";
import { getList } from "@/api/mapLayerInfo"
import { IMapLayerInfo, IResponseResult } from "#/index";

export function useMapLayerInfo(mapLayerInfoId: Ref<string>) {
    const mapLayerInfo = ref(null);

    const init = () => {
        mapLayerInfo.value = null;
        getList(1).then((result: IResponseResult<IMapLayerInfo[]>) => {
            let filter = result.data.filter((item) => {
                return item.id == mapLayerInfoId.value;
            })
            if (filter && filter.length) {
                mapLayerInfo.value = filter[0];
            }
        })

    }

    watch(mapLayerInfoId, () => {
        init();
    })

    init();

    return { mapLayerInfo }
} 