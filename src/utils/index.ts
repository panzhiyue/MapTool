import * as TableApi from "@/api/table";
import ResponseCode from "@/enum/ResponseCode";
import ResponseResult from "./db/ResponseResult";
import { add as insertLayerInfo } from "@/api/layerInfo";
import { buildUUID } from "./uuid";
import { useMainWindow } from "@/hooks/electron/useMainWindow"
import { message } from "ant-design-vue";
import { getDefaultStyle } from "@/utils/style";

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

