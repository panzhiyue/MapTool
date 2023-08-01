import { defineStore } from "pinia";

interface IState {
    viewOpts: Object
}

export const useCesiumViewerStore = defineStore({
    id: "cesiumViewer",
    state: (): IState => ({
        viewOpts: {
            showStatusBar: true
        }
    }),
    actions: {


    },
});
