// 定数定義

export const MouseButton = {
    Left: 0,
    Middle: 1, 
    Right: 2,
};
export const MouseWitch = {
    Left: 1,
    Middle: 2, 
    Right: 3,
};

export const KeyCode = {
    One: 49, // 1
    Two: 50, // 2
    Three: 51, // 3
    Four: 52, // 4
    Five: 53, // 5
    Six: 54, // 6
    Seven: 55, // 7
    Eight: 56, // 8
    Nine: 57, // 9
    Zero: 48, // 0
    A: 65, // A
    B: 66, // B
    C: 67, // C
    D: 68, // D
    E: 69, // E
    F: 70, // F
    G: 71, // G
    H: 72, // H
    I: 73, // I
    J: 74, // J
    K: 75, // K
    L: 76, // L
    M: 77, // M
    N: 78, // N
    O: 79, // O
    P: 80, // P
    Q: 81, // Q
    R: 82, // R
    S: 83, // S
    T: 84, // T
    U: 85, // U
    V: 86, // V
    W: 87, // W
    X: 88, // X
    Y: 89, // Y
    Z: 90, // Z
    Hyphen: 173, // -
    Hat: 160, // ^
    BackSlash: 220, // \
    At: 64, // @
    LeftSquareBracket: 219, // [
    RightSquareBracket: 221, // ]
    Semicolon: 59, // ;
    Colon: 58, // :
    Comma: 188, // ,
    Dot: 190, // .
    Slash: 191, // /
    Num1: 97, // テンキー1
    Num2: 98, // テンキー2
    Num3: 99, // テンキー3
    Num4: 100, // テンキー4
    Num5: 101, // テンキー5
    Num6: 102, // テンキー6
    Num7: 103, // テンキー7
    Num8: 104, // テンキー8
    Num9: 105, // テンキー9
    Num0: 96, // テンキー0
    NumSlash: 111, // テンキー/
    NumMultiple: 106, // テンキー*
    NumMinus: 109, // テンキー-
    NumPlus: 107, // テンキー+
    NumDot: 110, // テンキー.
    NumEnter: 13, // テンキーEnter
    F1: 112, // F1
    F2: 113, // F2
    F3: 114, // F3
    F4: 115, // F4
    F5: 116, // F5
    F6: 117, // F6
    F7: 118, // F7
    F8: 119, // F8
    F9: 120, // F9
    F10: 121, // F10
    F11: 122, // F11
    F12: 123, // F12
    Up: 38, // ↑
    Down: 40, // ↓
    Left: 37, // ←
    Right: 39, // →
    Enter: 13, // Enter
    Shift: 16, // Shift
    Ctrl: 17, // Ctrl
    Alt: 18, // Alt
    Space: 32, // Space
    BackSpace: 8, // BackSpace
    Esc: 27, // Esc
    Tab: 9, // Tab
    CapsLock: 20, // CapsLock
    NumLock: 144, // NumLock
    Insert: 45, // Insert
    Delete: 46, // Delete
    Home: 36, // Home
    End: 35, // End
    PageUp: 33, // PageUp
    PageDown: 34, // PageDown
    ScrollLock: 145, // ScrollLock
    Windows: 91, // Windows
    CapsLock: 240, // 英数(CapsLock)
    HalfwidthFullwidth: 243, // 半角/全角
    Kanji: 244, // 漢字
    NoConversion: 29, // 無変換
    Conversion: 28, // 変換
    Roman: 242, // カタカナ/ひらがな/ローマ字
};

// エディタの操作状態
export const EditorControlState = {
    Idle: 'Idle', // 無操作中
    Scroll: 'Scroll', // スクロール中
    DraggingNode: 'DraggingNode', // ノードドラッグ中
    Connect: 'Connect', // 運搬ライン接続中
};

// 入出力定義
export const IODirection = {
    None: 'None', // 無し
    Input: 'Input', // 入力側
    Output: 'Output', // 出力側
};

// 物質の状態
export const MaterialState = {
    Solid: 'Solid', // 固形
    Fluid: 'Fluid', // 流形
};

// 配置コンポーネントタイプ
export const ComponentType = {
    MachineNode: 'MachineNode',
    LogisticsLine: 'LogisticsLine',
};