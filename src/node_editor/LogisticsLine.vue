<template>
    <div class="line-root">
        <div class="line-start" :style="{left: startLeft, top: startTop}">
            <span v-if="isDebugMode">S({{startPos.x}},{{startPos.y}})</span>
        </div>
        <div class="line-parts" v-for="(part, index) in parts" :key="index"
            :style="{left: part.x + 'px', top: part.y + 'px'}">
        </div>
        <div class="line-end" :style="{left: endLeft, top: endTop}">
            <span v-if="isDebugMode">E({{endPos.x}},{{endPos.y}})</span>
        </div>
    </div>
</template>

<script>
// パスをHTML上に自在に表示させてかつその線のクリック判定をする事ができないので、
// ベジェ曲線の式から一定の距離で分割して当たり判定divを表示する。
import { IODirection } from 'const'
import Calculator from 'models/Calculator'
import { mapGetters } from 'vuex'

export default {
    props: {
        outputSocket: { // 始点側のソケット
            type: Object,
            default: null,
        },
        inputSocket: { // 終点側のソケット
            type: Object,
            default: null,
        },
    },
    computed: {
        division() { return 20 }, // 分割数
        startLeft() { return this.startPos.x + 'px' }, // 始点のx座標
        startTop() { return this.startPos.y + 'px' }, // 始点のy座標
        endLeft() { return this.endPos.x + 'px' }, // 終点のx座標
        endTop() { return this.endPos.y + 'px' }, // 終点のy座標
        ...mapGetters('EditorStatus', {
            isDebugMode: 'isDebugMode', // デバッグモードか
        }),
    },
    created: function() {
        if (this.outputSocket) {
            this.updateStartSocketPos();
            this.outputSocket.connectLine(this);
        }
        if (this.inputSocket) {
            this.updateEndSocketPos();
            this.inputSocket.connectLine(this);
        }
        this.buildLine();
    },
    methods: {
        // 始点座標を直接指定(マニピュレータ用)
        setStartPoint: function(x, y) {
            this.startPos.x = x;
            this.startPos.y = y;
            this.inputSocket = null;
            this.buildLine();
        },
        // 終点座標を直接指定(マニピュレータ用)
        setEndPoint: function(x, y) {
            this.endPos.x = x;
            this.endPos.y = y;
            this.outputSocket = null;
            this.buildLine();
        },
        // ソケットが移動したら再構築
        onMoved: function() {
            updateStartSocketPos();
            updateEndSocketPos();
            buildLine();
        },
        buildLine: function() {
            const interval = 1 / this.division;
            for (let i = 0; i < this.division; i++) {
                const part = Calculator.bezierZ(
                    this.startPos.x, this.startPos.y,
                    this.endPos.x, this.endPos.y,
                    interval * i);
                this.parts[i] = part;
            }
            this.parts[this.division] = { x: this.endX, y: this.endY };
        },
        updateStartSocketPos() { // 始点のソケットの座標を取得
            if (this.outputSocket) {
                this.startPos = this.outputSocket.getSocketPoint();
            }
        },
        updateEndSocketPos() { // 終点のソケットの座標を取得
            if (this.inputSocket) {
                this.endPos = this.inputSocket.getSocketPoint();
            }
        },
    },
    updated: function() {
        this.$nextTick(() => {
            if (!this.outputSocket || !this.inputSocket) return;

            const prevStartPos = this.startPos;
            const prevEndPos = this.endPos;
            const currentStartPos = this.outputSocket.getSocketPoint();
            const currentEndPos = this.inputSocket.getSocketPoint();
            if (currentStartPos.x == prevStartPos.x && 
                currentStartPos.y == prevStartPos.y && 
                currentEndPos.x == prevEndPos.x && 
                currentEndPos.y == prevEndPos.y) return;
            this.buildLine();
        });
    },
    data: function() {
        return {
            startPos: { x: 10, y: 10 }, // 始点(ソケットにとって出力側)
            endPos: { x: 200, y: 200 }, // 終点(ソケットにとって入力側)
            parts: [], // 各パーツの座標
            material: '', // 運搬素材
        };
    },
    watch: {
        outputSocket(v) {
            if (v) {
                this.updateStartSocketPos();
                this.buildLine();
            }
        },
        inputSocket(v) {
            if (v) {
                this.updateEndSocketPos();
                this.buildLine();
            }
        },
    }
}
</script>

<style>
    .line-start,.line-end {
        position: absolute;
        border: 1px solid black;
        border-radius: 4px;
        width: 8px;
        height: 8px;
        background: white;
        color: red;
    }
    .line-parts {
        position: absolute;
        border: 1px solid black;
        border-radius: 4px;
        width: 4px;
        height: 4px;
        background: black;
    }
</style>