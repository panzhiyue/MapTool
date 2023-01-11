import * as TableApi from "@/api/table";
import ResponseCode from "@/enum/ResponseCode";
import ResponseResult from "./db/ResponseResult";
import { add as insertLayerInfo } from "@/api/layerInfo";
import { buildUUID } from "./uuid";
import { useMainWindow } from "@/hooks/electron/useMainWindow"
import { message } from "ant-design-vue";
import { useWindow } from "@/hooks/electron/useWindow";

const { close } = useWindow();

export const importVector = (parentId: string, geometryType, tableName: string, tableData: any, attributes: any, layerName: string) => {
    const { refreshLayerInfos } = useMainWindow();
    TableApi.create(
        tableName,
        tableData
            .filter((item) => {
                return item.selected;
            })
            .map((item) => {
                return {
                    ...item,
                    name: item.destName,
                };
            })
    ).then((result: ResponseResult<any>) => {
        if (result.code == ResponseCode.SUCCESS) {

            TableApi.insert(
                tableName,
                attributes.map((item1) => {
                    let obj = {};
                    tableData
                        .filter((item) => {
                            return item.selected;
                        })
                        .forEach((item2) => {
                            obj[item2.destName] = item1[item2.originName];
                        });
                    return obj;
                })
            ).then((result) => {
                if (result.code == ResponseCode.SUCCESS) {
                    insertLayerInfo({
                        id: buildUUID(),
                        parentId: parentId,
                        mapId: 1,
                        title: layerName,
                        type: "layer",
                        canDelete: true,
                        canEdit: true,
                        expand: true,
                        info: {
                            type: "vector",
                            table: tableName,
                            srs: `GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433],AUTHORITY["EPSG",4490]]`,
                            geometryType: geometryType,
                        },
                    }).then((result) => {
                        if (result.code == ResponseCode.SUCCESS) {
                            refreshLayerInfos();
                            close();
                        } else {
                            message.error(result.msg as string, 1);
                        }
                    });
                } else {
                    message.error(result.msg as string, 1);
                }
            });
        } else {
            message.error(result.msg as string, 1);
        }
    });
}

