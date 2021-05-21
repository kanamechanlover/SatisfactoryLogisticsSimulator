<template>
    <div class="root">
        <div class="frame" :class="{ 'grid-sheet': showGrid, scrolling: scrollMode }" ref="frame"
                :style="{ 'background-position-x': left, 'background-position-y': top}">
            <div class="origin" :style="{ left: left, top: top }">
                <span>どや</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { Point } from 'node_editor/logics/point'
import { KeyCode } from 'const'

export default {
    components: {
    },
    props: {
        showGrid: Boolean,
    },
    setup: function() {
        const frame = ref(null);
        return {
            frame,
            position: Point(),
        }
    },
    mounted: function() {
        console.log('mounted', this);
        // 次 Tick 時に構築
        this.$nextTick(() => {
            // イベント登録
            window.addEventListener('keydown',   this.onKeyAction);
            window.addEventListener('keyup',     this.onKeyAction);
            window.addEventListener('mousedown', this.onMouseAction);
            window.addEventListener('mouseup',   this.onMouseAction);
            window.addEventListener('mousemove', this.onMouseAction);
        });
    },
    beforeUnmount: function() {
        // イベント解消
        window.removeEventListener('keydown',   this.onKeyAction);
        window.removeEventListener('keyup',     this.onKeyAction);
        window.removeEventListener('mousedown', this.onMouseAction);
        window.removeEventListener('mouseup',   this.onMouseAction);
        window.removeEventListener('mousemove', this.onMouseAction);
    },
    computed: {
        left() { return this.position.x.value + 'px'; },
        top() { return this.position.y.value + 'px'; },
    },
    methods: {
        // キー操作定義
        onKeyAction: function(e) {
            // Spaceキー入力中は「スクロールモード」にする
            if (e.keyCode == KeyCode.Space && !this.scrolling) {
                this.scrollMode = (e.type == 'keydown');
            }
        },
        // マウス操作定義
        onMouseAction: function(e) {
            // マウス左ドラッグでスクロール操作
            if (e.type == 'mousedown') {
                if (this.scrollMode) {
                    this.scrolling = true;
                }
            }
            else if (e.type == 'mouseup') {
                this.scrolling = false;
            }
            else if (e.type == 'mousemove') {
                if (this.scrolling) {
                    const diff = {
                        x: e.pageX - this.page.x,
                        y: e.pageY - this.page.y,
                    };
                    this.position.move(diff.x, diff.y);
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
            scrollMode: false,
            scrolling: false,
        }
    }
}
</script>

<style scoped>
    .root {
        /* 親要素いっぱいに表示 */
        width: 100%;
        height: 100%;
    }
    .frame {
        /* 親要素いっぱいに表示 */
        width: 100%;
        height: 100%;
        /* スクローラブル(バーは出さずにマウス操作でスクロール) */
        overflow: hidden;
        /* 位置指定の基準要素とする */
        position: relative;
        /* テキスト選択不可にする */
        user-select: none;
    }
    .grid-sheet {
        /* 方眼紙ライクな表示 */
        background-color: whitesmoke;
        opacity: 0.8;
        background-image:   linear-gradient(silver 2px, transparent 2px),
                            linear-gradient(90deg, silver 2px, transparent 2px),
                            linear-gradient(silver 1px, transparent 1px),
                            linear-gradient(90deg, silver 1px, whitesmoke 1px);
        background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
    }
    .origin {
        width: 2px;
        height: 2px;
        margin: 0px;
        padding: 0px;
        position: absolute;
        left: 0px;
        top: 0px;
        background: red;
    }
    .scrolling {
        cursor: grab;
    }
</style>