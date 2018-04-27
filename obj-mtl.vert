/*{
  frameskip: 1,
  vertexMode: "TRIANGLES",
  PASSES: [{
    MODEL: {
      PATH: './models/Pokemon.obj',
      PATH: './models/apple.obj',
    },
  }]
}*/
precision mediump float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute float vertexId;
attribute float objectId;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 uvTransform;
uniform float time;
uniform vec2 resolution;
varying vec2 vUv;
varying float vObjectId;
varying vec4 v_color;

vec2 rot(in vec2 p, in float t) {
  float s = sin(t);
  float c = cos(t);
  return mat2(s, c, -c, s) * p;
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

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = smoothstep(0., 1., f);

    return mix(a, b, u.x) +
        (c - a)* u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

void main() {
    vec3 pos = position;
    pos.xz = rot(pos.xz, time * 0.2);

    // float d = ease(sin(time * 2.) * .5 + .5);
    // pos.x += (fract(vertexId / 30.) - 0.5) * d;

    // pos *= 1. + sin(vertexId * 0.1 + time);
    // pos *= .5 + noise(vec2(vertexId * 0.001 + time * 0.3, time * 0.1));
    // pos *= 1. + noise(pos.xy * 10. + time) * 0.3;

    pos.x *= resolution.y / resolution.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    vUv = uv;
    vObjectId = objectId;
    v_color = vec4(abs(pos) *2., 1);
}
