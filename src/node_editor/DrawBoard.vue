<template>
    <div class="area" ref="area">
        <placement-node
            v-for="(node, index) in nodes" :key="index"
            :id="node.value.id"
            :nodeType="node.value.type"
            :nodeData="node.value.data"
            @selected="selectedNode(index, $event)"
            @moved="movedNode(index, $event)">
        </placement-node>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import PlacementNode from 'node_editor/PlacementNode'
import { NodeType } from 'node_editor/PlacementNode'
import MachineNode from 'node_editor/MachineNode'

const EmitEvents = {
    SelectedNode: 'selectednode', // ノードが選択された
    MovedNode: 'nodemove', // ノードが移動した
};

export default {
    components: {
        PlacementNode,
        MachineNode,
    },
    setup() {
        const area = ref(null);
        const nodes = reactive([]);

        return {
            area, // ルート要素
            nodes, // 配置するノードリスト
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.addNode(NodeType.MachineNode, {
                machine: 'Blender',
                machineNum: 2,
                recipe: '代替: 混合ターボ燃料',
                overclock: 100
            });
        });
    },
    methods: {
        selectedNode: function(index, event) {
            this.$emit(EmitEvents.SelectedNode, {
                position: event.position,
                node: this.nodes[index],
            });
        },
        movedNode: function(index, event) {
            this.$emit(EmitEvents.MovedNode, {
                position: event.position,
            });
        },
        addNode: function(type, data) {
            console.log(this.nodes, type, data);
            this.nodes.push(ref({
                id: this.nodes.length, // 配置 id
                type: type, // 配置ノードタイプ
                data: data, // ノード設定
            }));
        },
    },
    data: function() {
        return {
            selectingNodeIndex: -1,
        }
    }
}
</script>

<style>
    .area {
        position: relative,
    }
</style>