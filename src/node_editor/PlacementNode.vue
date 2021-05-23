<template>
    <div class="frame" :style="{ left: left, top: top }" @mousedown="onMouseAction">
        <machine-node v-if="isMachineNode" ref="node"
            :machine="nodeData.machine"
            :machineNum="nodeData.machineNum"
            :recipe="nodeData.recipe"
            :overclock="nodeData.overclock">
        </machine-node>
    </div>
</template>

<script>
import { ref } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { EditorControlState, MouseButton } from 'const'
import { Point } from 'node_editor/logics/point.js'
import MachineNode from 'node_editor/MachineNode'

// 配置ノードタイプ
export const NodeType = {
    MachineNode: 'MachineNode', // 設備ノード
    ResourceNode: 'ResourceNode', // 資源ノード
};

const EmitEvents = {
    Moved: 'moved', // ノードが移動した
    Selected: 'selected', // 選択状態変更
};

export default {
    components: {
        MachineNode,
    },
    props: {
        id: {
            type: Number,
            default: 0,
        },
        nodeType: {
            type: String,
            default: '',
        },
        nodeData: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup() {
        const frame = ref(null);
        const node = ref(null);
        return {
            frame,
            node,
            position: Point(),
        };
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('mouseup', this.onMouseAction);
            window.addEventListener('mousemove', this.onMouseAction);
        });
    },
    beforeUnmount() {
        window.removeEventListener('mouseup', this.onMouseAction);
        window.removeEventListener('mousemove', this.onMouseAction);
    },
    computed: {
        ...mapGetters('EditorStatus', {
            isDebugMode: 'isDebugMode', // デバッグモードか
            isIdling: 'isIdling', // 無操作中か
            isScrolling: 'isScrolling', // スクロール中か
            isNodeDragging: 'isNodeDragging', // ノードをドラッグ中か
        }),
        left() { return this.position.x.value + 'px'; },
        top() { return this.position.y.value + 'px'; },
        isMachineNode() {
            return this.nodeType == NodeType.MachineNode;
        }
    },
    methods: {
        getNode: function() {
            return this.node;
        },
        ...mapMutations('EditorStatus', {
            changeControlState: 'changeState', // 操作ステータス変更
        }),
        // マウス操作定義
        onMouseAction: function(e) {
            // マウス左ドラッグでノードの移動操作
            if (e.type == 'mousedown' && e.button == MouseButton.Left) {
                this.page.x = e.pageX;
                this.page.y = e.pageY;
                if (this.isIdling) {
                    this.moving = true;
                    this.changeControlState(EditorControlState.NodeDragging);
                    this.$emit(EmitEvents.Selected, {
                        position: this.position,
                    });
                }
            }
            else if (e.type == 'mouseup') {
                this.moving = false;
                if (this.isNodeDragging) {
                    this.changeControlState(EditorControlState.Idling);
                }
            }
            else if (e.type == 'mousemove') {
                if (this.moving) {
                    const diff = {
                        x: e.pageX - this.page.x,
                        y: e.pageY - this.page.y,
                    };
                    this.position.move(diff.x, diff.y);
                    this.$emit(EmitEvents.Moved, {
                        position: this.position,
                    });
                }
                this.page.x = e.pageX;
                this.page.y = e.pageY;
            }
        },
    },
    data: function() {
        return {
            page: { // ページ上のカーソル位置
                x: 0,
                y: 0,
            },
            moving: false, // ノードドラッグ中か
        }
    }
}
</script>

<style>
    .frame {
        position: absolute;
    }
</style>