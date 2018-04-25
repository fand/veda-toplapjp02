precision mediump float;
uniform vec2 resolution; // 画面のサイズ
uniform vec2 time; // VEDA起動からの経過時間(秒)

void main() {
    // フラグメントシェーダーでは、
    gl_FragColor = vec4(0.0, 0.5, 0.7, 1.0);

    // gl_FragCoord には、ピクセルの位置情報が入っている
    // そのため、resolutionで割ると 0~1の範囲になる
    // gl_FragColor = vec4(
    //     gl_FragCoord.x / resolution.x,
    //     gl_FragCoord.y / resolution.y,
    //     1.0,
    //     1.0
    // );

    // gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
