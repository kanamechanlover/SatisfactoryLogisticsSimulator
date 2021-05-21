// 計算処理を定義

export default {
    // 製造レート(毎分の製造量)
    productRate(num, time) {
        return num * (60 / time);
    },
    // ３次ベジェ曲線上の座標を取得(Z字型用)
    // startX : 1点目のx座標
    // startX : 1点目のy座標
    // endX : 4点目のx座標
    // endX : 4点目のy座標
    // time : 現在の時間(0-1)
    // 必ず start を右に出て左から end に入る線を引く
    bezierZ(startX, startY, endX, endY, time) {
        const _bezier = function(posList, t) {
            if (posList.length == 1) return posList[0];
            const left = _bezier(posList.slice(0, posList.length - 1), t);
            const right = _bezier(posList.slice(1, posList.length), t);
            return {
                x: (1 - t) * left.x + t * right.x,
                y: (1 - t) * left.y + t * right.y
            };
        };
        const diffX = Math.abs(endX - startX); // 水平方向だけは反転させない
        return _bezier([
            { x: startX, y: startY },
            { x: startX + diffX, y: startY },
            { x: endX - diffX, y: endY },
            { x: endX, y: endY },
        ], time);
    }
}