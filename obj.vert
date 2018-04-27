/*{
    frameskip: 1,
    vertexMode: "TRIANGLES",
    vertexCount: 3000,
    // vertexCount: 100000,
    // vertexMode: "LINES",
    // vertexMode: "POINTS",
    PASSES: [{
        MODEL: {
            PATH: './models/deer.obj',
            // PATH: './models/Pokemon.obj',
            // PATH: './models/apple.obj',
        },
        BLEND: 'NORMAL',
    }]
}*/
precision mediump float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute float vertexId;
uniform float vertexCount;
uniform float time;
uniform vec2 resolution;
varying vec2 vUv;
varying float vObjectId;
varying vec4 v_color;
#define PI 3.141592

/**
 * イージング関数
 * スムーズなアニメーションに利用する
 */
float ease(in float t) {
    return t == 0.0 || t == 1.0
        ? t
        : t < 0.5
            ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
            : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

/**
 * vec2を回転する関数
 * tは回転角度。例えば、3.14を渡すと約180度回転する
 */
vec2 rotate(in vec2 st, in float t) {
    float s = sin(t), c = cos(t);
    return mat2(c, -s, s, c) * st;
}

/**
 * 球体を作る関数
 */
vec3 sphere(in float id, in float count) {
    float yoffset = step(1.0, mod(id, 3.0));
    id = id - floor(id / 3.) + mod(id, 3.);

    float N = 100.;
    float u = floor(count / N); // 1段あたりの頂点数
    float s = floor(id / u) + yoffset; // 何段目にいるか
    float t = mod(id, u); // この段の何番目の頂点か

    float axz = 2. * PI * (t / u); // xz平面での角度
    float y = (s / N) * 2. - 1.;
    float axy = acos(y); // xy平面での角度
    float ry = sin(axy);
    float x = cos(axz) * ry;
    float z = sin(axz) * ry;
    return vec3(x, y, z);
}

void main() {
    vec3 pos = position;
    vec3 color = normal;

    // モデルを回転させる
    pos.xz = rotate(pos.xz, time * 0.2);
    pos.yz = rotate(pos.yz, 0.2);

    // 頂点をズラす
    // pos.x += sin(vertexId + time) * 0.2;

    // 頂点を歪ませる
    // 原点からの距離が 0.8倍〜1.2倍される
    // pos *= 1.0 + sin(vertexId + time) * 0.2;

    // 球体とモーフィング
    // float t = clamp(sin(time) * 1.2, -1., 1.) * 0.5 + 0.5;
    // pos = mix(pos, sphere(vertexId, vertexCount) * 0.5, t);
    // pos.xz = rotate(pos.xz, time * 0.2);
    // pos.yz = rotate(pos.yz, 0.2);

    color = (abs(position.xzy) + .1) * 2.;

    // 以下は触らないで！
    pos.x *= resolution.y / resolution.x; // アスペクト比を修正
    gl_Position = vec4(pos, 1.0);
    gl_PointSize = 3.;
    v_color = vec4(color, 1) * 0.7;
}
