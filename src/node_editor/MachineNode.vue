<template>
    <div class="machine-root" :style="{ left: left, top: top }" :ref="setRefs($event, 'root')" @mousedown="onMouseAction">
        <div class="machine">
            <div class="name">
                {{ machineName }}<span v-if="showMachineNum"> x{{ machineNum }}</span>
            </div>
            <div class="collapse" @click="onToggleCollapse">
                <i class="far fa-caret-square-up" v-show="collapsed"></i>
                <i class="far fa-caret-square-down" v-show="!collapsed"></i>
            </div>
        </div>
        <div class="machine-frame">
            <div class="machine-recipe" v-show="!collapsed">
                <div class="name">
                    {{ recipeName }}
                </div>
            </div>
            <div class="h-separator" v-show="!collapsed"></div>
            <div class="machine-inout">
                <div class="machine-input">
                    <div class="machine-sockets" v-if="recipeData.input.solid.length > 0">
                        <div class="item" v-show="!collapsed">
                            固形入力
                        </div>
                        <div class="item"
                                v-for="(item, index) in recipeData.input.solid" :key="index">
                            <node-socket :ref="setSockets(el, 'inputSolidSockets')"
                                :material="item.id"
                                :num="item.num"
                                :direction="input"
                                :machineInfo="machineInfo"
                                @startconnection="$emit('startconnection', $event)"
                                @endconnection="$emit('endconnection', $event)">
                            </node-socket>
                        </div>
                    </div>
                    <div class="machine-sockets" v-if="recipeData.input.fluid.length > 0">
                        <div class="item" v-if="recipeData.input.fluid.length > 0" v-show="!collapsed">
                            流形入力
                        </div>
                        <div class="item" :ref="setSockets($event, 'inputFluidSockets')"
                                v-for="(item, index) in recipeData.input.fluid" :key="index">
                            <node-socket
                                :material="item.id"
                                :num="item.num"
                                :direction="input"
                                :machineInfo="machineInfo"
                                @startconnection="$emit('startconnection', $event)"
                                @endconnection="$emit('endconnection', $event)">
                            </node-socket>
                        </div>
                    </div>
                </div>
                <div class="v-separator"></div>
                <div class="machine-output">
                    <div class="machine-sockets" v-if="recipeData.output.solid.length > 0">
                        <div class="item" v-show="!collapsed">
                            固形入力
                        </div>
                        <div class="item" :ref="setSockets($event, 'outputSolidSockets')"
                                v-for="(item, index) in recipeData.output.solid" :key="index">
                            <node-socket
                                :material="item.id"
                                :num="item.num"
                                :direction="output"
                                :machineInfo="machineInfo"
                                @startconnection="$emit('startconnection', $event)"
                                @endconnection="$emit('endconnection', $event)">
                            </node-socket>
                        </div>
                    </div>
                    <div class="machine-sockets" v-if="recipeData.output.fluid.length > 0">
                        <div class="item" v-show="!collapsed">
                            流形入力
                        </div>
                        <div class="item" :ref="setSockets($event, 'outputFluidSockets')"
                                v-for="(item, index) in recipeData.output.fluid" :key="index">
                            <node-socket
                                :material="item.id"
                                :num="item.num"
                                :direction="output"
                                :machineInfo="machineInfo"
                                @startconnection="$emit('startconnection', $event)"
                                @endconnection="$emit('endconnection', $event)">
                            </node-socket>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-separator" v-show="!collapsed"></div>
            <div class="machine-product-time" v-show="!collapsed">
                <div class="name">
                    製造時間：
                    <span :class="{abnormal: abnormalValue}">
                        {{ productTime }}s
                    </span>
                </div>
            </div>
            <div class="h-separator" v-show="!collapsed"></div>
            <div class="machine-overclock" v-show="!collapsed">
                <div class="name">
                    オーバークロック：
                    <span :class="{abnormal: abnormalValue}">
                        {{ overclock }} %
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MouseButton, IODirection, MaterialState } from 'const'
import NodeSocket from 'node_editor/NodeSocket'
import ConfigLoader from 'models/ConfigLoader'
import { ref } from 'vue'

export default {
    components: {
        NodeSocket
    },
    props: {
        position: { // 表示する座標(ノードの左上)
            type: Object,
            default: {},
        },
        machine: { // 設備名
            type: String,
            default: '',
        },
        machineNum: { // 設備数
            type: Number,
            default: 2,
        },
        recipe: { // レシピ名
            type: String,
            default: '',
        },
        overclock: { // オーバークロック数(%)
            type: Number,
            default: 0,
        },
    },
    computed: {
        left() {
            return this.position.x + 'px';
        },
        top() {
            return this.position.y + 'px';
        },
        input() {
            return IODirection.Input;
        },
        output() {
            return IODirection.Output;
        },
        showMachineNum() {
            return this.machineNum > 1;
        },
        machineName() {
            return ConfigLoader.getMachineData(this.machine).Name;
        },
        recipeName() {
            return this.recipe;
        },
        recipeData() {
            const data = ConfigLoader.getRecipeData(this.recipe);

            const input = Object.keys(data.Input).map((v, i) => {
                return { id: v, num: data.Input[v] };
            });
            const output = Object.keys(data.Output).map((v, i) => {
                return { id: v, num: data.Output[v] };
            });
            const result = {
                input: {
                    solid: input.filter((v, i) => {
                        return ConfigLoader.getMaterialData(v.id).State == MaterialState.Solid
                    }),
                    fluid: input.filter((v, i) => {
                        return ConfigLoader.getMaterialData(v.id).State == MaterialState.Fluid
                    }),
                },
                output: {
                    solid: output.filter((v, i) => {
                        return ConfigLoader.getMaterialData(v.id).State == MaterialState.Solid
                    }),
                    fluid: output.filter((v, i) => {
                        return ConfigLoader.getMaterialData(v.id).State == MaterialState.Fluid
                    }),
                },
                productTime: data.ProductTime,
            };
            return result;
        },
        productTime() {
            return this.recipeData.productTime * this.overclock * 0.01;
        },
        abnormalValue() {
            return this.overclock != 100;
        },
        machineInfo() {
            return {
                machineNum: this.machineNum,
                overclock: this.overclock,
                productTime: this.productTime,
            };
        },
    },
    methods: {
        setRefs: function(el, name) {
            this.refs[name] = el;
        },
        setSockets: function(el, name) {
            console.log(el, name);
            this.refs[name] = el.children[0];
        },
        getSocketPoint: function() {
            console.log('root', this.root);
            const selfRect = this.root.getBoundingClientRect();
            const socketRelativePos = this.inputSolidSockets[0].getSocketPoint(selfRect);
            return {
                x: this.position.x + socketRelativePos.x,
                y: this.position.y + socketRelativePos.y,
            };
        },
        onMoved: function() {
            console.log('inputSolidSockets', this.inputSolidSockets);
            // 自身が移動したらソケットにも伝達
            this.inputSolidSockets.forEach(v => {
                v.onMoved();
            });
            this.inputFluidSockets.forEach(v => v.onMoved());
            this.outputSolidSockets.forEach(v => v.onMoved());
            this.outputFluidSockets.forEach(v => v.onMoved());
        },
        onMouseAction: function(e) {
            // マウス左ボタン操作でドラッグ状態更新
            if (e.button == MouseButton.Left) {
                if (e.type == 'mousedown') {
                    this.dragging = true;
                    this.$emit('nodemousedown', {
                        event: e,
                        node: this,
                    });
                }
            }
        },
        // 格納/展開ボタンクリック時
        onToggleCollapse(e) {
            this.collapsed = this.collapsed ? false: true;
        },
    },
    data: function() {
        return {
            dragging: false, // 自身をドラッグ中か
            collapsed: false, // 格納状態か
            refs: {}, // $refs の代わり
        }
    },
    watch: {
        position(v) {
            this.onMoved();
        },
    }
}
</script>

<style scoped>
    .machine-root {
        position: absolute;
        display: flex;
        flex-direction: column;
        min-width: 240px;
        white-space: nowrap;
        font-weight: bold;
    }
    .machine {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 2px;
        /*position: relative;*/
    }
    .machine .name {
        flex: 1;
        text-align: center;
        background: lightgray;
        border-radius: 4px;
        border: 1px solid black;
    }
    .machine-name {
        font-weight: bold;
    }
    .machine-frame {
        border: 1px solid black;
        border-radius: 4px;
        background: silver;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .machine-recipe {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .machine-recipe .name {
        flex: 1;
        text-align: center;
    }
    .machine-inout {
        flex: 1;
        display: flex;
        flex-direction: row;
    }
    .machine-input,.machine-output {
        padding: 4px;
    }
    .machine-socket {
        border: 1px solid black;
        border-radius: 4px;
        width: 100%;
        margin-bottom: 4px;
    }
    .h-separator {
        width: 100%;
        height: 1px;
        background: black;
    }
    .v-separator {
        width: 1px;
        background: black;
    }
    .machine-overclock,.machine-product-time {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .machine-overclock,.machine-product-time .name {
        flex: 1;
        text-align: center;
    }
    .abnormal {
        color: chocolate;
    }
    .machine-sockets {
        width: 100%;
    }
    .machine-sockets .item {
        width: 100%;
    }

    .collapse {
        width: 1rem;
        height: 1rem;
        font-weight: 800;
        position: absolute;
        right: 4px;
        top: 2px;
        bottom: 2px;
    }
</style>