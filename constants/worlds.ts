import { MapPreset } from '../types';

export const MAP_PRESETS: MapPreset[] = [
  {
    id: 'solar-core',
    name: 'The Solar Core',
    description: 'The inner planets of the old system.',
    planets: [
      {
        id: 'earth',
        name: 'Earth',
        description: 'The Blue Marble. A lush world of oceans and continents.',
        state: {
          sessionId: 'earth',
          shaderCode: `
// Earth Shader - High Fidelity
vec3 a=vec3(1,0,0),q,p=u_cameraPosition;
vec2 centered_uv=FC.xy*2.-r;
float rollAngle=u_cameraRoll;
mat2 rollMat=mat2(cos(rollAngle),-sin(rollAngle),sin(rollAngle),cos(rollAngle));
centered_uv=rollMat*centered_uv;
vec3 v=vec3(centered_uv/slider_zoom,r.y);
v=rotate3D(u_cameraRotation.y,a.yxy)*v;
vec3 camRight=normalize(cross(a.yxy,v));
v=rotate3D(slider_cameraXRotation+u_cameraRotation.x,camRight)*v;
vec3 rd=normalize(v);

float d,i,l,t_dist=0.;
for(l=0.;l<slider_maxIterations;l++){
    q=p+rd*t_dist;
    float sphere = length(q) - 100.0;
    
    // Fractal Noise for Terrain
    float noise = 0.0;
    float amp = 1.0;
    float freq = 0.02;
    for(int j=0; j<5; j++) {
        noise += (sin(q.x*freq + q.y*freq*1.1 + q.z*freq*0.9) + 
                  sin(q.y*freq*0.8 + q.z*freq*1.2 + q.x*freq*0.7)) * amp;
        amp *= 0.5;
        freq *= 2.1;
    }
    
    d = sphere - noise * 1.5;
    
    if(d<1e-3||t_dist>1000.)break;
    t_dist+=d;
}

p+=rd*t_dist;

if(t_dist<1000.){
    vec3 n = normalize(p);
    
    // Detailed Terrain
    float noise = 0.0;
    float amp = 1.0;
    float freq = 0.03;
    for(int j=0; j<8; j++) {
        noise += (sin(p.x*freq) + sin(p.y*freq*1.1) + sin(p.z*freq*0.9)) * amp;
        amp *= 0.5;
        freq *= 2.0;
    }
    
    if(noise > 0.1) {
        // Land
        vec3 grass = vec3(0.1, 0.35, 0.1);
        vec3 desert = vec3(0.45, 0.4, 0.2);
        vec3 mountain = vec3(0.3, 0.3, 0.3);
        
        o.rgb = mix(grass, desert, smoothstep(0.1, 0.5, noise));
        o.rgb = mix(o.rgb, mountain, smoothstep(0.5, 0.8, noise));
        if(noise > 0.9) o.rgb = vec3(0.95); // Snow caps
        
        // Specular for land (low)
        o.rgb *= 0.8;
    } else {
        // Water
        vec3 deep = vec3(0.0, 0.05, 0.2);
        vec3 shallow = vec3(0.0, 0.2, 0.5);
        o.rgb = mix(deep, shallow, smoothstep(-0.5, 0.1, noise));
        
        // Specular for water
        vec3 sunDir = normalize(vec3(1, 1, 1));
        float spec = pow(max(0.0, dot(reflect(rd, n), sunDir)), 32.0);
        o.rgb += vec3(0.5, 0.7, 1.0) * spec * 0.5;
    }
    
    // Lighting
    vec3 sunDir = normalize(vec3(1, 1, 1));
    float diff = max(0.1, dot(n, sunDir));
    o.rgb *= diff;
    
    // Night Lights
    float night = smoothstep(0.2, -0.2, dot(n, sunDir));
    if(night > 0.0 && noise > 0.2) {
        float cityLights = fract(sin(dot(floor(p*0.5).xz, vec2(12.9898, 78.233))) * 43758.5453);
        if(cityLights > 0.98) o.rgb += vec3(1.0, 0.8, 0.4) * night * 2.0;
    }
    
    // Clouds
    float cloudNoise = 0.0;
    amp = 1.0;
    freq = 0.04;
    for(int j=0; j<5; j++) {
        cloudNoise += (sin(p.x*freq + u_time*0.05) + sin(p.y*freq*1.1) + sin(p.z*freq*0.9 + u_time*0.03)) * amp;
        amp *= 0.5;
        freq *= 2.0;
    }
    float cloudMask = smoothstep(0.4, 0.8, cloudNoise);
    o.rgb = mix(o.rgb, vec3(1), cloudMask * 0.8 * max(0.2, diff));
} else {
    // Stars
    float stars = fract(sin(dot(rd.xy, vec2(12.9898, 78.233))) * 43758.5453);
    if(stars > 0.9995) o.rgb = vec3(1);
    else o.rgb = vec3(0);
}

// Atmosphere Glow
float atmo = pow(max(0.0, 1.0 - dot(rd, normalize(-u_cameraPosition))), 6.0);
o.rgb += vec3(0.4, 0.6, 1.0) * atmo * 0.4;
          `,
          sliders: [
            { name: "Zoom", variableName: "slider_zoom", min: 0.1, max: 10, step: 0.1, defaultValue: 4.0 },
            { name: "Max Iterations", variableName: "slider_maxIterations", min: 10, max: 500, step: 1, defaultValue: 100 },
            { name: "Camera X Rotation", variableName: "slider_cameraXRotation", min: -3.14, max: 3.14, step: 0.01, defaultValue: 0 }
          ],
          uniforms: {
            slider_zoom: 4.0,
            slider_maxIterations: 100,
            slider_cameraXRotation: 0
          },
          cameraControlsEnabled: true,
          soundConfig: {
            enabled: true,
            masterVolume: 0.5,
            reverb: { enabled: true, mix: 0.5, decay: 5, tone: 2000 },
            drone: { enabled: true, gain: 0.2, filter: 200, pitch: 0 },
            atmosphere: { enabled: true, gain: 0.1, texture: 'smooth' },
            melody: { enabled: true, gain: 0.1, density: 0.3, scale: 'dorian' },
            arp: { enabled: false, gain: 0, speed: 1, octaves: 2, filter: 600, direction: 'up' },
            rhythm: { enabled: false, gain: 0, bpm: 120, filter: 1000 },
            modulations: []
          },
          shipConfig: {
            complexity: 6, fold1: 0.75, fold2: 0.85, fold3: 0.15, scale: 1.65, stretch: 1.2, taper: 0, twist: 0,
            asymmetryX: 0, asymmetryY: 0, asymmetryZ: 0, twistAsymX: 0, scaleAsymX: 0, fold1AsymX: 0, fold2AsymX: 0,
            chaseDistance: 200, chaseVerticalOffset: 0, pitchOffset: 0, generalScale: 1, translucency: 1, modulations: []
          }
        }
      },
      {
        id: 'mars',
        name: 'Mars',
        description: 'The Red Planet. A cold, dusty world of iron oxide.',
        state: {
          sessionId: 'mars',
          shaderCode: `
// Mars Shader
vec3 a=vec3(1,0,0),q,p=u_cameraPosition;
vec2 centered_uv=FC.xy*2.-r;
float rollAngle=u_cameraRoll;
mat2 rollMat=mat2(cos(rollAngle),-sin(rollAngle),sin(rollAngle),cos(rollAngle));
centered_uv=rollMat*centered_uv;
vec3 v=vec3(centered_uv/slider_zoom,r.y);
v=rotate3D(u_cameraRotation.y,a.yxy)*v;
vec3 camRight=normalize(cross(a.yxy,v));
v=rotate3D(slider_cameraXRotation+u_cameraRotation.x,camRight)*v;
vec3 rd=normalize(v);

float d,i,l,t_dist=0.;
for(l=0.;l<slider_maxIterations;l++){
    q=p+rd*t_dist;
    float sphere = length(q) - 100.0;
    float noise = 0.0;
    float amp = 1.0;
    float freq = 0.05;
    for(int j=0; j<4; j++) {
        noise += sin(q.x*freq + q.y*freq*1.1 + q.z*freq*0.9) * amp;
        amp *= 0.5;
        freq *= 2.0;
    }
    d = sphere - noise * 3.0;
    if(d<1e-3||t_dist>1000.)break;
    t_dist+=d;
}

p+=rd*t_dist;

if(t_dist<1000.){
    vec3 n = normalize(p);
    float noise = 0.0;
    float amp = 1.0;
    float freq = 0.05;
    for(int j=0; j<6; j++) {
        noise += sin(p.x*freq + p.y*freq*1.1 + p.z*freq*0.9) * amp;
        amp *= 0.5;
        freq *= 2.0;
    }
    o.rgb = mix(vec3(0.5, 0.2, 0.1), vec3(0.7, 0.3, 0.1), noise);
    vec3 sunDir = normalize(vec3(1, 1, 1));
    float diff = max(0.2, dot(n, sunDir));
    o.rgb *= diff;
} else {
    float stars = fract(sin(dot(rd.xy, vec2(12.9898, 78.233))) * 43758.5453);
    if(stars > 0.999) o.rgb = vec3(1);
    else o.rgb = vec3(0);
}

float atmo = pow(max(0.0, 1.0 - dot(rd, normalize(-u_cameraPosition))), 4.0);
o.rgb += vec3(0.8, 0.4, 0.2) * atmo * 0.3;
          `,
          sliders: [
            { name: "Zoom", variableName: "slider_zoom", min: 0.1, max: 10, step: 0.1, defaultValue: 4.0 },
            { name: "Max Iterations", variableName: "slider_maxIterations", min: 10, max: 500, step: 1, defaultValue: 100 },
            { name: "Camera X Rotation", variableName: "slider_cameraXRotation", min: -3.14, max: 3.14, step: 0.01, defaultValue: 0 }
          ],
          uniforms: {
            slider_zoom: 4.0,
            slider_maxIterations: 100,
            slider_cameraXRotation: 0
          },
          cameraControlsEnabled: true,
          soundConfig: {
            enabled: true,
            masterVolume: 0.5,
            reverb: { enabled: true, mix: 0.5, decay: 5, tone: 2000 },
            drone: { enabled: true, gain: 0.2, filter: 150, pitch: -2 },
            atmosphere: { enabled: true, gain: 0.2, texture: 'grit' },
            melody: { enabled: true, gain: 0.1, density: 0.2, scale: 'phrygian' },
            arp: { enabled: false, gain: 0, speed: 1, octaves: 2, filter: 600, direction: 'up' },
            rhythm: { enabled: false, gain: 0, bpm: 120, filter: 1000 },
            modulations: []
          },
          shipConfig: {
            complexity: 6, fold1: 0.75, fold2: 0.85, fold3: 0.15, scale: 1.65, stretch: 1.2, taper: 0, twist: 0,
            asymmetryX: 0, asymmetryY: 0, asymmetryZ: 0, twistAsymX: 0, scaleAsymX: 0, fold1AsymX: 0, fold2AsymX: 0,
            chaseDistance: 200, chaseVerticalOffset: 0, pitchOffset: 0, generalScale: 1, translucency: 1, modulations: []
          }
        }
      }
    ]
  },
  {
    id: 'outer-rim',
    name: 'The Outer Rim',
    description: 'The mysterious moons and gas giants.',
    planets: [
      {
        id: 'titan',
        name: 'Titan',
        description: 'A world of methane lakes and thick orange haze.',
        state: {
          sessionId: 'titan',
          shaderCode: `
// Titan Shader
vec3 a=vec3(1,0,0),q,p=u_cameraPosition;
vec2 centered_uv=FC.xy*2.-r;
float rollAngle=u_cameraRoll;
mat2 rollMat=mat2(cos(rollAngle),-sin(rollAngle),sin(rollAngle),cos(rollAngle));
centered_uv=rollMat*centered_uv;
vec3 v=vec3(centered_uv/slider_zoom,r.y);
v=rotate3D(u_cameraRotation.y,a.yxy)*v;
vec3 camRight=normalize(cross(a.yxy,v));
v=rotate3D(slider_cameraXRotation+u_cameraRotation.x,camRight)*v;
vec3 rd=normalize(v);

float d,i,l,t_dist=0.;
for(l=0.;l<slider_maxIterations;l++){
    q=p+rd*t_dist;
    float sphere = length(q) - 100.0;
    float noise = 0.0;
    float amp = 1.0;
    float freq = 0.05;
    for(int j=0; j<4; j++) {
        noise += sin(q.x*freq + q.y*freq*1.1 + q.z*freq*0.9) * amp;
        amp *= 0.5;
        freq *= 2.0;
    }
    d = sphere - noise * 2.0;
    if(d<1e-3||t_dist>1000.)break;
    t_dist+=d;
}

p+=rd*t_dist;

if(t_dist<1000.){
    vec3 n = normalize(p);
    o.rgb = vec3(0.6, 0.4, 0.1); // Orange haze surface
    vec3 sunDir = normalize(vec3(1, 1, 1));
    float diff = max(0.2, dot(n, sunDir));
    o.rgb *= diff;
} else {
    o.rgb = vec3(0.1, 0.05, 0.0);
}

float atmo = pow(max(0.0, 1.0 - dot(rd, normalize(-u_cameraPosition))), 2.0);
o.rgb += vec3(1.0, 0.6, 0.2) * atmo * 0.6;
          `,
          sliders: [
            { name: "Zoom", variableName: "slider_zoom", min: 0.1, max: 10, step: 0.1, defaultValue: 4.0 },
            { name: "Max Iterations", variableName: "slider_maxIterations", min: 10, max: 500, step: 1, defaultValue: 100 },
            { name: "Camera X Rotation", variableName: "slider_cameraXRotation", min: -3.14, max: 3.14, step: 0.01, defaultValue: 0 }
          ],
          uniforms: {
            slider_zoom: 4.0,
            slider_maxIterations: 100,
            slider_cameraXRotation: 0
          },
          cameraControlsEnabled: true,
          soundConfig: {
            enabled: true,
            masterVolume: 0.5,
            reverb: { enabled: true, mix: 0.7, decay: 10, tone: 1000 },
            drone: { enabled: true, gain: 0.3, filter: 100, pitch: -5 },
            atmosphere: { enabled: true, gain: 0.3, texture: 'grit' },
            melody: { enabled: true, gain: 0.05, density: 0.1, scale: 'phrygian' },
            arp: { enabled: false, gain: 0, speed: 1, octaves: 2, filter: 600, direction: 'up' },
            rhythm: { enabled: false, gain: 0, bpm: 120, filter: 1000 },
            modulations: []
          },
          shipConfig: {
            complexity: 6, fold1: 0.75, fold2: 0.85, fold3: 0.15, scale: 1.65, stretch: 1.2, taper: 0, twist: 0,
            asymmetryX: 0, asymmetryY: 0, asymmetryZ: 0, twistAsymX: 0, scaleAsymX: 0, fold1AsymX: 0, fold2AsymX: 0,
            chaseDistance: 200, chaseVerticalOffset: 0, pitchOffset: 0, generalScale: 1, translucency: 1, modulations: []
          }
        }
      }
    ]
  }
];
