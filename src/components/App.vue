<template>
    <div id="root">
        <div id="menu">
            <div id="items">
                <p>メニュー部</p>
            </div>
            <div class="debugModeToggle">
                {{ controlState }}
                <span><input type="checkbox" v-model="showGrid" />グリッド表示</span>
                <span><input type="checkbox" v-model="isDebugMode" />デバッグモード</span>
            </div>
        </div>
        <div id="editor">
            <div v-show="loading" class="loading">
                <div class="text">設定読込中 ...</div>
            </div>
            <node-editor v-if="!loading" ref="editor" :showGrid="showGrid" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { mapState, mapMutations } from 'vuex'
import NodeEditor from 'node_editor/NodeEditor'
import ConfigLoader from 'models/ConfigLoader'

export default {
    components: {
        NodeEditor
    },
    setup() {
        const editor = ref(null);

        return {
            editor,
        };
    },
    mounted() {
        this.$nextTick(() => {
            ConfigLoader.loadConfig(() => {
                this.loading = false;
            });
        });
    },
    computed: {
        ...mapState('EditorStatus', {
            debugMode: 'debugMode',
            controlState: 'controlState',
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
        width: 100%;
        height: 100%;
        background: whitesmoke;
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
        text-align: center;
    }
</style>