<template>
    <div class="slot-frame" :style="frameClass"
            @mousedown="onMouseAction"
            @mouseup="onMouseAction"
            @mouseenter="onMouseAction"
            @mouseleave="onMouseAction">
        <div class="slot-input" v-if="isInput">
            <div class="slot-point">
                <div ref="inputSocket" v-if="isSolid"
                    class="mark slot-solid" :class="{socketAccent: isSocketAccent}"></div>
                <div ref="inputSocket" v-if="isFluid"
                    class="mark slot-fluid" :class="{socketAccent: isSocketAccent}"></div>
            </div>
        </div>
        <div class="v-separator" v-if="isInput"></div>
        <div class="slot-content">
            <material-view ref="material" :material="material" :num="num" :machineInfo="machineInfo"></material-view>
        </div>
        <div class="v-separator" v-if="isOutput"></div>
        <div class="slot-input" v-if="isOutput" ref="outputSocket">
            <div class="slot-point">
                <div ref="outputSocket" v-if="isSolid"
                    class="mark slot-solid" :class="{socketAccent: isSocketAccent}"></div>
                <div ref="outputSocket" v-if="isFluid"
                    class="mark slot-fluid" :class="{socketAccent: isSocketAccent}"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { IODirection, MouseButton, MaterialState, EditorControlState } from 'const'
import ConfigLoader from 'models/ConfigLoader'
import { mapGetters, mapMutations } from 'vuex'
import MaterialView from 'node_editor/MaterialView'

export default {
    components: {
        MaterialView
    },
    props: {
        direction: { // ソケットの向き
            type: String,
            default: IODirection.Input,
        },
        material: { // 素材ID
            type: String,
            default: '',
        },
        num: { // 素材数
            type: Number,
            default: 1,
        },
        machineInfo: { // 設備情報
            type: Object,
            default: {},
        },
    },
    computed: {
        ...mapGetters('EditorStatus', {
            isIdling: 'isIdling', // 無操作中か
            isConnecting: 'isConnecting', // 運搬ライン接続中か
            originPoint: 'originPoint', // ページ上のエディタの原点の位置
        }),
        // 入力側を示す定義名
        isInput() {
            return this.direction == IODirection.Input;
        },
        // 出力側を示す定義名
        isOutput() {
            return this.direction == IODirection.Output;
        },
        // 固形を表す定義
        isSolid() {
            return this.state == MaterialState.Solid;
        },
        // 流形を表す定義
        isFluid() {
            return this.state == MaterialState.Fluid;
        },
        // 物質の状態
        state() {
            return ConfigLoader.getMaterialData(this.material).State;
        },
    },
    methods: {
        ...mapMutations('EditorStatus', {
            changeControlState: 'changeState', // 操作ステータス変更
        }),
        // 外向け関数
        getSocketPoint: function() {
            let rect = new DOMRect();
            if (this.isInput) {
                rect = this.$refs.inputSocket.getBoundingClientRect();
            }
            else if (this.isOutput) {
                rect = this.$refs.outputSocket.getBoundingClientRect();
            }
            return {
                x: rect.x + rect.width * 0.5 - this.originPoint.x,
                y: rect.y + rect.height * 0.5 - this.originPoint.y,
            };
        },
        // 連結可能か(同じ素材か)
        canConnectLine: function(material) {
            if (!this.material) return true; // 素材指定無しの場合はなんでもOK
            return this.material === material;
        },
        // 運搬ラインとソケット連結
        connectLine: function(line) {
            if (line in this.joinningLines) return;

            this.joinningLines.push(line);
        },
        onMoved: function() {
            // ノードが移動したら繋がっているラインにも伝達
            this.joinningLines.forEach(v => v.onMoved());
        },
        onMouseAction: function(e) {
            // マウス左ボタンが押されたら接続開始を通知
            if (e.type == 'mousedown' && e.button == MouseButton.Left) {
                if (this.isIdling) {
                    this.changeControlState(EditorControlState.Connect);
                    this.$emit('startconnection', {
                        event: e,
                        socket: this, // 同じソケットへの接続を回避するため設定
                        socketPos: this.getSocketPoint(),
                    });
                }
            }
            // マウス左ボタンが離されたら接続終了を通知
            else if (e.type == 'mouseup' && e.button == MouseButton.Left) {
                if (this.isConnecting) {
                    this.$emit('endconnection', {
                        event: e,
                        socket: this, // 同じソケットへの接続を回避するため設定
                        socketPos: this.getSocketPoint(),
                    });
                }
            }
            // マウスホバーでソケット強調表示
            else if (e.type == 'mouseenter') {
                this.isSocketAccent = true;
                e.stopPropagation();
                return false;
            }
            else if (e.type == 'mouseleave') {
                this.isSocketAccent = false;
                e.stopPropagation();
                return false;
            };
        }
    },
    data: function() {
        return {
            joinningLines: [], // 接続されている運搬ラインリスト
            frameClass: { // フレーム部に適用するマウス操作によるクラス群
                'mouseover-possible': false,
                'mouseover-impossible': false,
            },
            isSocketAccent: false, // ソケット部分の強調フラグ
        };
    }
}
</script>

<style scoped>
    .slot-frame {
        border: 1px solid black;
        border-radius: 4px;
        width: 100%;
        margin-bottom: 4px;
        display: flex;
        flex-direction: row;
    }
    .slot-input,.slot-output {
        display: flex;
        flex-direction: row;
        width: 20px;
        padding: 2px;
    }
    .slot-point {
        display: flex;
        flex-direction: column;
    }
    .slot-point .mark {
        width: 16px;
        height: 16px;
        border: 1px solid black;
    }
    .slot-point .mark.slot-solid {
        border-radius: 0px;
    }
    .slot-point .mark.slot-fluid {
        border-radius: 16px;
    }
    .slot-content {
        flex: 1;
        padding: 2px;
    }
    .slot-content material-view {
        width: 100%;
    }
    .abnormal {
        color: chocolate;
    }
    .v-separator {
        width: 1px;
        background: black;
    }
    .mouseover-possible {
        border-color: green;
    }
    .mouseover-impossible {
        border-color: red;
    }
    .socketAccent {
        background: black;
    }
</style>