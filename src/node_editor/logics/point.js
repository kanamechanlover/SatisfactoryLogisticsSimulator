import { ref } from "vue";

export const Point = () => {
    const x = ref(0);
    const y = ref(0);
    const move = (dx, dy) => {
        x.value += dx;
        y.value += dy;
    };
    const set = (ax, ay) => {
        x.value = ax;
        y.value = ay;
    };

    return {
        x, // x 座標
        y, // y 座標
        move, // 相対移動
        set, // 絶対移動
    };
};