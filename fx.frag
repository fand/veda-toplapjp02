/*{
    IMPORTED: {
        video: { PATH: './videos/1.mp4' },
        // video: { PATH: './videos/2.mp4' },
        // video: { PATH: './videos/3.mp4' },

        v1: { PATH: './videos/1.mp4' },
        v2: { PATH: './videos/2.mp4' },
        v3: { PATH: './videos/3.mp4' },
        name: { PATH: './images/name.png' },
    }
}*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D video;
uniform sampler2D v1;
uniform sampler2D v2;
uniform sampler2D v3;
uniform sampler2D backbuffer;
uniform sampler2D name;

/**
 * vec2を回転する関数
 * tは回転角度。例えば、3.14を渡すと約180度回転する
 */
vec2 rotate(in vec2 st, in float t) {
    float s = sin(t), c = cos(t);
    return mat2(c, -s, s, c) * st;
}

/**
 * 擬似乱数を生成する関数
 */
float random(vec2 st) {
    return fract(sin(mod(dot(st.xy ,vec2(12.9898, 78.233)), 3.14)) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;

    // uvをいじるので、backbuffer用にuvを保存しとく
    vec2 uv0 = uv;

    // 回転
    // uv = rotate(uv - .5, time * .3) + .5;

    // ズーム
    // uv = (uv - .5) * fract(time) + .5;

    // 座標ゆがませ
    // uv -= .5;
    // uv = uv * uv * 2.;

    // 万華鏡っぽいやつ
    // uv = fract(abs(uv - .5));
    // uv = rotate(uv, -time * .4) + .5;

    // x座標ずらし
    // uv.x += (random(vec2(uv.y * .001, time)) - .5) * .01;

    // ランダムにx座標ずらし
    // float r = random(vec2(uv.y * .001, time)); // 0 to 1
    // if (r < .1) {
    //     uv.x += r * .1;
    // }

    // 本体
    float t = time * .3;
    gl_FragColor = texture2D(video, uv) * 0.3;
    gl_FragColor += texture2D(name, uv);

    // お手軽RGBずらし
    // ランダムにやってもかっこいいです
    // gl_FragColor.r = texture2D(backbuffer, uv0 + vec2(.003, 0)).b;

    // 部分的にRGBずらし
    // 名前の部分だけずらし
    // float r = random(vec2(uv * .001) + time * .3);
    // if (r < .2) {
    //     gl_FragColor.r += texture2D(name, uv + vec2(.01, 0.)).b;
    //     gl_FragColor.b += texture2D(name, uv - vec2(.01, 0.)).g;
    // }

    // 動画のブレンド
    // gl_FragColor = texture2D(v1, uv) + texture2D(v3, uv);
    // gl_FragColor = texture2D(v1, uv) - texture2D(v3, uv);
    // gl_FragColor = texture2D(v1, uv) * texture2D(v3, uv);
    // gl_FragColor = texture2D(v1, uv) / texture2D(v3, uv);

    // 画像をディスプレイスメントマップとして使う
    // float d = texture2D(name, uv).r * 0.1;
    // // d = texture2D(v3, uv).r * 0.1;
    // gl_FragColor = texture2D(video, uv + d);
}
