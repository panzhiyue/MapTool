import { ipcRenderer } from 'electron';
import { useWindow } from '@/hooks/electron/useWindow';
import { buildUUID } from '@/utils/uuid';
import { useMapToolStore } from '@/store/mapTool';
import SpatialReference from '@/utils/SpatialReference';
const remote = require('@electron/remote');


export function useCoordinateSystem() {
    const mapToolStore = useMapToolStore();
    const selectCoordinateSystem = (callback) => {
        const { getWindowTitle } = useWindow();
        const uuid = buildUUID();
        ipcRenderer.send('open-win', '选择坐标系', `coordinateSystem?uuid=${uuid}`, {
            width: 700,
            height: 800,
            frame: true,
            parent: getWindowTitle(),
        });

        remote.ipcMain.on(`changeSpatialReference_${uuid}`, async (event, spatialReference) => {
            callback(spatialReference);
        });
    }

    /**
     * 根据Auth获取坐标系
     * @example
     * getByAuth("EPSG:4490")
     */
    const getByAuth = (auth) => {
        for (let i in mapToolStore.spatial_ref_sys) {
            let item = mapToolStore.spatial_ref_sys[i]
            if (`${item.auth_name}:${item.auth_srid}` == auth) {
                return new SpatialReference(item)
            }
        }
        return null;
    }

    return { selectCoordinateSystem, getByAuth }

}