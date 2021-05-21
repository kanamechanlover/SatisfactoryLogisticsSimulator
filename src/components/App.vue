<template>
    <div id="root">
        <div id="menu">
            <div id="items">
                <p>メニュー部</p>
            </div>
            <div class="debugModeToggle">
                <span><input type="checkbox" v-model="showGrid" />グリッド表示</span>
                <span><input type="checkbox" v-model="isDebugMode" />デバッグモード</span>
            </div>
        </div>
        <div id="editor">
            <node-editor ref="editor" :showGrid="showGrid" />
            <test-content :x="100" :y="100">
                Not Default
            </test-content>
        </div>
    </div>
</template>

<script>
import NodeEditor from 'node_editor/NodeEditor'
import { mapState, mapMutations } from 'vuex'

import TestContent from 'components/TestContent'
import MachineNode from 'node_editor/MachineNode'

export default {
    components: {
        NodeEditor,
        TestContent,
        MachineNode
    },
    computed: {
        ...mapState('EditorStatus', {
            debugMode: 'debugMode'
        }),
    },
    methods: {
        ...mapMutations('EditorStatus', {
            setDebugMode: 'setDebugMode'
        }),
    },
    data: function() {
        return {
            isDebugMode: false,
            loading: true,
            showGrid: true,
        };
    },
    watch: {
        isDebugMode(v) {
            this.setDebugMode(v);
        }
    }
}
</script>

<style scoped>
    #root {
        background: whitesmoke;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    #menu {
        background: silver;
        position: relative;
    }
    #menu p {
        margin: 0px;
    }
    #menu .debugModeToggle {
        position: absolute;
        right: 2px;
        top: 2px;
        bottom: 2px;
    }
    #menu .debugModeToggle span {
        margin-right: 10px;
    }
    #editor {
        background: whitesmoke;
        flex: 1;
        border: 1px solid black;
    }
    #loading {
        background: whitesmoke;
        flex: 1;
        border: 1px solid black;
        display: flex;
        flex-direction: row;
    }
    #loading text {
        background: whitesmoke;
        flex: 1;
        border: 1px solid black;
        font-weight: bold;
        font-size: 4rem;
    }

    test-content {
        position: relative;
        z-index: 100;
        color: black;
        padding: 4px;
        border: 1px solid black;
    }
</style>