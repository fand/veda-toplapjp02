/*{
  pixelRatio: 1,
  frameskip: 1,
  vertexMode: "TRIANGLES",
  // vertexMode: "LINES",
  PASSES: [{
    MODEL: {
      // PATH: './models/Pokemon.obj',
      // MATERIAL: './models/Pokemon.mtl',
      PATH: './models/apple.obj',
      MATERIAL: './models/apple.mtl',
    },
    vs: './obj-mtl.vert',
    fs: './obj-mtl.frag',
    TARGET: 'pass1',
    BLEND: 'NORMAL',
  }, {
  }],
  IMPORTED: {
    video: { PATH: './videos/1.mp4' },
  }
}*/
precision mediump float;
uniform float time;
uniform int PASSINDEX;
uniform sampler2D material0;
uniform sampler2D pass1;
uniform sampler2D backbuffer;
uniform vec2 resolution;
varying vec2 vUv;

varying vec4 v_color;
varying float vObjectId;
uniform sampler2D video;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  if (PASSINDEX == 0) {
    gl_FragColor = texture2D(material0, vUv);
    gl_FragColor += texture2D(video, fract(vUv * 2. + time * .3)) * (sin(time) * 0.5 + 0.5);
  }
  if (PASSINDEX == 1) {
    gl_FragColor = texture2D(pass1, uv);
    if (gl_FragColor.a < .5) {
      gl_FragColor = texture2D(video, abs(uv - .5)) * 2. - 1.;
    }
  }
}
