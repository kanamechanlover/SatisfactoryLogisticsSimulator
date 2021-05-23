import { EditorControlState } from 'const'

const state = {
    debugMode: false, // デバッグモードフラグ
    controlState: EditorControlState.Idling, // 操作ステータス
    originPoint: {x: 0, y: 0}, // ページ上のエディタの原点の位置
}

const getters = {
    isDebugMode(state) { // デバッグモードか
        return state.debugMode;
    },
    isIdling(state) { // 無操作中
        return state.controlState === EditorControlState.Idling;
    },
    isScrolling(state) { // スクロール中
        return state.controlState === EditorControlState.Scrolling;
    },
    isNodeDragging(state) { // ノードをドラッグ中か
        return state.controlState === EditorControlState.NodeDragging;
    },
    isConnecting(state) { // 運搬ライン接続操作中か
        return state.controlState === EditorControlState.Connecting;
    },
    originPoint(state) { // ページ上のエディタの原点の位置
        return state.originPoint;
    },
    getPlacedNodes(state) {
        return state.placedNodes;
    }
}
const mutations = {
    setDebugMode(state, payload) {
        state.debugMode = payload;
    },
    changeState(state, payload) {
        state.controlState = payload;
    },
    setOriginPoint(state, payload) {
        state.originPoint.x = payload.x;
        state.originPoint.y = payload.y;
    },
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}