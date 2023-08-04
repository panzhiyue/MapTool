import { defineStore } from "pinia";

interface IState {
    viewOpts: Object,
    roamOpts: Object
}

export const useCesiumViewerStore = defineStore({
    id: "cesiumViewer",
    state: (): IState => ({
        viewOpts: {
            showStatusBar: true,
            showDistanceLegend: true,
            showNavigation: true,
            showTimeline: false,
            showLayerManager: true
        },
        roamOpts: {
            showViewManager: false
        }

    }),
    actions: {
    },
});
