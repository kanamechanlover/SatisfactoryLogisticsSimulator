<template>
    <div class="detail-frame">
        <div class="node-name">{{ name }}</div>
        <hr />
        <div class="parameter-list">
            <div class="parameter"  v-for="(property, index) in properties" :key="index">
                <div class="label">{{ property.label }}</div>
                <div class="value-area">
                    <div v-if="property.type == 'select'" class="value-item">
                        <select :value="property.value" class="w100" @change="property.changed">
                            <option disabled value="">未選択</option>
                            <option v-for="option in property.options" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </div>
                    <div v-if="property.type == 'spinbox'" class="value-item">
                        <input type="number" :value="property.value" class="w100" @input="property.changed"
                            :min="property.min" :max="property.max" :step="property.step" />
                    </div>
                    <div v-if="property.type == 'slider'" class="value-item">
                        <input type="range" :value="property.value" class="flex-1" @input="property.changed"
                            name="volume" :min="property.min" :max="property.max" :step="property.step" />
                        <input type="number" class="slider-number" :value="property.value" @input="property.changed"
                             :min="property.min" :max="property.max" />
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
        // ノードが選択された
        selectedNode: function(event) {
            if (this.selectingNode === event.node.value) return;
            const node = event.node;
            const machineName = Config.getMachineData(node.value.data.machine).Name;
            const machineNum = node.value.data.machineNum;
            const recipe = node.value.data.recipe;
            const overclock = node.value.data.overclock;
            const self = this;
            this.selectingNode = node;
            this.name = '設備ノード';
            this.properties = [
                {
                    label: '設備名',
                    type: 'select',
                    value: machineName,
                    options: Config.getMachineNameList(),
                    changed: function(e) {
                        if (self.properties[0].value == e.target.value) return;
                        self.properties[0].value = e.target.value;
                        const value = e.target.value;
                        const id = Config.getMachineIdFromName(value);
                        node.value.data.machine = id;
                        self.properties[2].options = Config.getRecipeNameForMachine(id);
                        self.properties[2].value = self.properties[2].options[0];
                        node.value.data.recipe = self.properties[2].value;
                    }
                },
                {
                    label: '設備数',
                    type: 'spinbox',
                    value: machineNum,
                    min: 1,
                    changed: function(e) {
                        const number = Number.parseInt(e.target.value);
                        self.properties[1].value = number;
                        node.value.data.machineNum = number;
                    }
                },
                {
                    label: 'レシピ名',
                    type: 'select',
                    value: recipe,
                    options: Config.getRecipeNameForMachine('Blender'),
                    changed: function(e) {
                        self.properties[2].value = e.target.value;
                        node.value.data.recipe = e.target.value;
                    }
                },
                {
                    label: 'オーバークロック数',
                    type: 'slider',
                    value: overclock,
                    min: 0,
                    max: 250,
                    step: 50,
                    changed: function(e) {
                        const value = Math.round( e.target.value * 10000 ) / 10000; // 小数点以下5桁目を四捨五入
                        self.properties[3].value = value;
                        node.value.data.overclock = value;
                    }
                },
            ]
        }
    },
    data: function() {
        const self = this;
        return {
            selectingNode: null,
            name: '',
            properties: []
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
        width: 64px;
        text-align: center;
    }
    /* スピンボタンを常に表示 */
    input[type=number]::-webkit-inner-spin-button {
        opacity: 1
    }
</style>