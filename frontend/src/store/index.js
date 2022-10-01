import Vue from "vue";
import Vuex from "vuex";
import layout from "./modules/layout";
import drawer from "./modules/drawer";
import editor from "./modules/editor";
import compare from "./modules/compare";
import scalar from "./modules/scalar";
import history from "./modules/history";
import indicator from "./modules/indicator";
import listPanel from "./modules/listPanel";
import modelView from "./modules/modelView";
import debug from "./modules/debug";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    layout: layout,
    drawer: drawer,
    editor: editor,
    compare: compare,
    scalar: scalar,
    history: history,
    indicator: indicator,
    listPanel: listPanel,
    modelView: modelView,
    debug: debug
  }
});

export default store;
