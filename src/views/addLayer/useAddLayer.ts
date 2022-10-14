import { getVectorType } from "@/utils/gis";
import { getTableData } from "@/utils/json";
import { buildUUID } from "@/utils/uuid";
import { WKT } from "ol/format"

export const useAddLayer = () => {
    const features = ref(null)
    const geometryType = ref("");
    const geometryTypeList = ref();
    let tableData: any = reactive([]);
    const attributes = ref(null);

    watch(features, () => {
        if (!features.value && features.value.length > 0) {
            geometryTypeList.value = [];
            geometryType.value = "";
            tableData.value = [];
            attributes.value = null;
        } else {
            geometryTypeList.value = features.value.map((feature) => {
                return getVectorType(feature.getGeometry());
            });
            geometryTypeList.value = Array.from(new Set(geometryTypeList.value));
            geometryType.value = geometryTypeList.value[0];

            let wktFormat = new WKT();
            const data = getTableData(
                features.value.map((item) => {
                    let obj = {};
                    for (let field in item.getProperties()) {
                        if (field == "geometry") {
                            obj["geom_wkt"] = wktFormat.writeGeometry(item.getGeometry());
                        } else {
                            obj[field.trim()] = item.get(field);
                        }
                    }
                    return obj;
                })
            );
            data.fields.forEach((item) => {
                tableData.push({
                    key: buildUUID(),
                    originName: item.name,
                    destName: item.name,
                    type: item.type,
                    length: item.length,
                    scale: item.scale,
                    primary: item.primary,
                    selected: true,
                });
            });

            attributes.value = data.attributes;
        }
    });

    // const importVector = () => {

    // }

    return { geometryType, geometryTypeList, features, tableData, attributes }
}