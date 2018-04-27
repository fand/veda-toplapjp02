precision mediump float;
uniform vec2 resolution; // 画面のサイズ
uniform float time; // VEDA起動からの経過時間(秒)
#define PI 3.141593

void main() {
    // ピクセルの位置
    vec2 p = gl_FragCoord.xy / resolution;

    // あとで使う変数
    vec3 color = vec3(0.0);
    float angle = 0.0;

    // 原点からの距離を表示
    color = vec3(length(p));

    // 距離で割る
    // color = vec3(0.1 / length(p));

    // 画面中央を原点にする
    // p -= .5;
    // color = vec3(0.1 / length(p));

    // アスペクト比を修正
    // p.x *= resolution.x / resolution.y;
    // color = vec3(0.1 / length(p));

    // step関数で円を描く
    // color = vec3(step(0.2, length(p)));

    // atan関数で角度を取得
    // angle = atan(-p.x, p.y) / PI + 1.0; // atanは-PIからPIの範囲を返す
    // color = vec3(angle);

    // 角度にsin関数
    // color = vec3(sin(angle * 10. * PI));

    // 回転させる
    // color = vec3(sin(angle * 10. * PI + time));

    // stepもかける
    // color = vec3(step(0.0, sin(angle * 10. * PI + time)));

    // r,g,bでズラす
    // color.r = step(0.0, sin(angle * 10. * PI + time + 0.1));
    // color.g = step(0.0, sin(angle * 10. * PI + time + 0.2));
    // color.b = step(0.0, sin(angle * 10. * PI + time + 0.3));

    gl_FragColor = vec4(color, 1.0);
}
