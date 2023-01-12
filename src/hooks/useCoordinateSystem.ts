import { ipcRenderer } from 'electron';
import { useWindow } from '@/hooks/electron/useWindow';
import { buildUUID } from '@/utils/uuid';
const remote = require('@electron/remote');


export function useCoordinateSystem() {
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

    return { selectCoordinateSystem }

}