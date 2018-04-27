precision mediump float;
uniform vec2 resolution; // 画面のサイズ
uniform float time; // VEDA起動からの経過時間(秒)

void main() {
    // フラグメントシェーダーのmain関数では、
    // gl_FragColorにピクセルの色を入れてあげる、という計算をする
    // 色は Red, Green, Blue, Alpha(不透明度) で表す
    gl_FragColor = vec4(0.0, 0.5, 0.7, 1.0);

    vec3 color = vec3(0.0);

    // gl_FragCoord には、ピクセルの位置情報が入っている
    // そのため、resolutionで割ると 0~1の範囲になる
    // color = vec3(
    //     gl_FragCoord.x / resolution.x,
    //     gl_FragCoord.y / resolution.y,
    //     1.0
    // );

    // x座標でサイン波を作る
    // color = vec3(
    //     sin(gl_FragCoord.x / resolution.x * 30.)
    // );

    // timeを使ってアニメーション
    // color = vec3(
    //     sin(gl_FragCoord.x / resolution.x * 30. + time)
    // );

    // timeを使ってアニメーション 2
    // color = vec3(
    //     sin(gl_FragCoord.x / resolution.x * 30. + sin(time * 3.))
    // );

    // sin, cosだけで模様を作る
    // このような模様は plasma と呼ばれる
    // color = vec3(
    //     sin(gl_FragCoord.x / resolution.x * 30. + time) + sin(gl_FragCoord.y / resolution.y * 20. + time * 3.)
    //     // + sin(gl_FragCoord.x / resolution.y * 11. + time * 2. + gl_FragCoord.y / resolution.y * 30.)
    // );

    // RGBでちょっとだけズラしてみる
    // color = vec3(
    //     sin(gl_FragCoord.x / resolution.x * 30. + time) + sin(gl_FragCoord.y / resolution.y * 20. + time * 3.),
    //     sin(gl_FragCoord.x / resolution.x * 31. + time) + sin(gl_FragCoord.y / resolution.y * 21. + time * 3.),
    //     sin(gl_FragCoord.x / resolution.x * 32. + time) + sin(gl_FragCoord.y / resolution.y * 22. + time * 3.)
    // );

    gl_FragColor = vec4(color, 1.0);
}
