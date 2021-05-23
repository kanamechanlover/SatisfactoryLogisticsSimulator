<template>
    <div class="material-frame">
        <div class="material-top">
            <div class="material-name">
                <span>{{ name }}</span>
            </div>
            <div class="material-num">
                <span v-if="isSolid">x</span>{{ num }}<span v-if="isFluid">㎡</span>
            </div>
        </div>
        <div class="material-bottom">
            <div class="material-rate" :class="{abnormal: abnormalValue}">
                <span class="frame">{{ rate }}<span v-if="isFluid">㎡</span>/分</span>
            </div>
        </div>
    </div>
</template>

<script>
import { MaterialState } from 'const'
import Calculator from 'models/Calculator'
import { Config } from 'models/Config'

export default {
    props: {
        material: { // 素材ID
            type: String,
            default: '',
        },
        num: { // 素材の必要数
            type: Number,
            default: 1,
        },
        machineInfo: { // 設備情報
            type: Object,
            default: {},
        },
    },
    computed: {
        // 素材名
        name() {
            return Config.getMaterialData(this.material).Name;
        },
        // 物質の状態
        state() {
            return Config.getMaterialData(this.material).State;
        },
        // 固形を表す定義
        isSolid() {
            return this.state == MaterialState.Solid;
        },
        // 流形を表す定義
        isFluid() {
            return this.state == MaterialState.Fluid;
        },
        // 効率
        rate() {
            const value = Calculator.productRate(this.num, this.machineInfo.productTime);
            if (value == Infinity) return 0; 
            return Math.floor(value * 100) * 0.01 * this.machineInfo.machineNum;
        },
        // オーバークロック時かどうか
        abnormalValue() {
            return this.machineInfo.overclock != 100;
        },
    },
}
</script>

<style>
    .material-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 2px;
    }
    .material-top {
        display: flex;
        flex-direction: row;
    }
    .material-name {
        flex: 1;
    }
    .material-num {
        padding-left: 4px;
    }
    .material-bottom {
        display: flex;
        flex-direction: column;
    }
    .material-rate {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        text-align: center;
        font-size: 0.8rem;
        height: 1rem;
    }
    .material-rate .frame {
        align-items: center;
        border-radius: 4px;
        background: whitesmoke;
        padding: 0px 8px;
        line-height: 1rem;
    }
    .abnormal {
        color: chocolate;
    }
</style>