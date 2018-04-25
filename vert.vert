/*{
    frameskip: 1,
    vertexMode: "POINTS",
    // vertexMode: "TRIANGLES",
    vertexMode: "LINES",
    // vertexMode: "LINE_LOOP",
    vertexCount: 300,
}*/
precision mediump float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute float vertexId;
attribute float objectId;
uniform float time;
uniform vec2 resolution;
varying vec4 v_color;

/**
 * vec2を回転する関数
 * tは回転角度。例えば、3.14を渡すと約180度回転する
 */
vec2 rotate(in vec2 st, in float t) {
    float s = sin(t), c = cos(t);
    return mat2(c, -s, s, c) * st;
}

float ease(in float t) {
    return t == 0.0 || t == 1.0
        ? t
        : t < 0.5
            ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
            : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec3 pos = vec3(0);
    vec3 color = vec3(0);

    gl_Position = vec4(0, 0, 0, 1); // 点の位置
    gl_PointSize = 10.; // 点のサイズ
    v_color = vec4(1, 0, 0, 1.0);  // 点の色

    // 円を描く
    // float angle = vertexId * 0.1;
    // pos = vec3(cos(angle), sin(angle), 1.);

    // 回転させる
    float a = vertexId * 0.1 + time;
    pos = vec3(cos(a), sin(a), 1.);

    // 色を変化させる
    color.r = pos.x;
    color.g = pos.y;
    color.b = -pos.x - pos.y;
    // color *= sin(vertexId);

    // リサージュ曲線を描く
    float a2 = vertexId * 0.5 + time;
    pos = vec3(
        cos(a2),
        sin(a2 * 2.),
        1
    );

    // ねじる
    // pos.xy = rotate(pos.xy, length(pos.xy) * 2.);

    // アスペクト比に合わせる
    pos.x *= resolution.y / resolution.x;

    gl_Position = vec4(pos, 1);
    gl_PointSize = 10.; // 点のサイズ
    v_color = vec4(color, 1.0);  // 点の色
}
