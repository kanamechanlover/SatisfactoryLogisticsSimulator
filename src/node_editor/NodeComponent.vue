<template>
    <div class="node-root">
        <machine-node v-if="type == machineNode" ref="content"
            :position="buildData.position"
            :machine="buildData.machine"
            :recipe="buildData.recipe"
            :overclock="buildData.overclock"
            :machineNum="buildData.machineNum"
            @nodemousedown="$emit('nodemousedown', $event)"
            @startconnection="$emit('startconnection', $event)"
            @endconnection="$emit('endconnection', $event)">
        </machine-node>
        <logistics-line v-if="type == logisticsLine" ref="content"
            :inputSocket="buildData.inputSocket"
            :outputSocket="buildData.outputSocket">
        </logistics-line>
    </div>
</template>

<script>
// ノードと運搬ラインを同じ扱いにする為だけのコンポーネント
import { ComponentType } from 'const'
import MachineNode from 'node_editor/MachineNode'
import LogisticsLine from 'node_editor/LogisticsLine'

export default {
    components: {
        MachineNode,
        LogisticsLine,
    },
    props: {
        type: { // コンポーネントタイプ
            type: String,
            default: '',
        },
        buildData: { // 拡張情報(コンポーネント構築に必要な情報)
            type: Object,
        },
    },
    computed: {
        machineNode() {
            return ComponentType.MachineNode;
        },
        logisticsLine() {
            return ComponentType.LogisticsLine;
        },
    },
}
</script>

<style scoped>
    .node-root {
        position: relative;
    }
</style>