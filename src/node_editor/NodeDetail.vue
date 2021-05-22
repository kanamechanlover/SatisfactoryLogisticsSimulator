<template>
    <div class="detail-frame">
        <div class="node-name">{{ name }}</div>
        <hr />
        <div class="parameter-list">
            <div class="parameter"  v-for="(property, index) in properties" :key="index">
                <div class="label">{{ property.label }}</div>
                <div class="value-area">
                    <div v-if="property.type == 'select'" class="value-item">
                        <select v-model="property.value" class="w100">
                            <option disabled value="">未選択</option>
                            <option v-for="option in property.options" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </div>
                    <div v-if="property.type == 'spinbox'" class="value-item">
                        <input type="number" v-model="property.value" class="w100"
                            :min="property.min" :max="property.max" :step="property.step" />
                    </div>
                    <div v-if="property.type == 'slider'" class="value-item">
                        <input type="range" v-model="property.value" class="flex-1"
                            name="volume" :min="property.min" :max="property.max" :step="property.step" />
                        <input type="number" class="slider-number" v-model="property.value" :min="property.min" :max="property.max" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Config } from 'models/Config'

export default {
    methods: {
        /*selectMachineNode: function(node) {
            this.selectingNode = node;
            this.name = '設備ノード';
            this.properties
        }*/
    },
    data: function() {
        return {
            selectingNode: null,
            name: '設備ノード',
            properties: [
                {
                    label: '設備名',
                    type: 'select',
                    value: Config.getMachineData('Blender').Name,
                    options: Config.getMachineNameList(),
                },
                {
                    label: '設備数',
                    type: 'spinbox',
                    value: 1,
                    min: 1,
                },
                {
                    label: 'レシピ名',
                    type: 'select',
                    value: '代替: 混合ターボ燃料',
                    options: Config.getRecipeNameForMachine('Blender'),
                },
                {
                    label: 'オーバークロック数',
                    type: 'slider',
                    value: 100,
                    min: 0,
                    max: 250,
                    step: 50,
                },
            ]
        }
    }
}
</script>

<style>
    .detail-frame {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 4px;
    }
    .node-name {
        font-weight: bold;
    }
    .parameter-list {
        flex: 1;
    }
    .value-item {
        display: flex;
        flex-direction: row;
    }
    .flex-1 {
        flex: 1;
    }
    .w100 {
        width: 100%;
    }
    .slider-number {
        width: 48px;
        text-align: center;
    }
    /* スピンボタンを常に表示 */
    input[type=number]::-webkit-inner-spin-button {
        opacity: 1
    }
</style>