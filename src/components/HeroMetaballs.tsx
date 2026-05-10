import { memo, useEffect, useRef } from "react";

const NUM_METABALLS = 28;

type Metaball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("createShader failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "";
    gl.deleteShader(shader);
    throw new Error(`Shader compile: ${log}`);
  }
  return shader;
}

function linkProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error("createProgram failed");
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? "";
    gl.deleteProgram(program);
    throw new Error(`Program link: ${log}`);
  }
  return program;
}

const vertexSrc = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Metaball field — stronger color at the edges, attenuated in the center so
 * title, subcopy, and CTAs stay crisp (canvas stays pointer-events: none).
 */
function fragmentSrc(num: number): string {
  return `
precision highp float;
uniform vec3 u_metaballs[${num}];
uniform vec2 u_resolution;

void main() {
  float x = gl_FragCoord.x;
  float y = u_resolution.y - gl_FragCoord.y;
  float sum = 0.0;
  for (int i = 0; i < ${num}; i++) {
    vec3 mb = u_metaballs[i];
    float dx = mb.x - x;
    float dy = mb.y - y;
    float radius = mb.z;
    sum += (radius * radius) / (dx * dx + dy * dy + 1.0);
  }
  if (sum < 0.78) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    return;
  }
  float edge = smoothstep(0.78, 1.08, sum);
  vec3 c1 = vec3(0.05, 0.28, 0.78);
  vec3 c2 = vec3(0.25, 0.62, 1.0);
  vec3 c3 = vec3(0.45, 0.85, 1.0);
  vec3 col = mix(mix(c1, c2, edge), c3, edge * edge);
  float baseAlpha = smoothstep(0.78, 1.02, sum) * 0.48;

  vec2 uv = vec2(x, y) / u_resolution;
  vec2 focus = vec2(0.5, 0.44);
  vec2 d = (uv - focus) / vec2(0.5, 0.58);
  float dist = length(d);
  float contentSafe = smoothstep(0.05, 0.92, dist);
  float protect = mix(0.08, 1.0, contentSafe * contentSafe);

  gl_FragColor = vec4(col, baseAlpha * protect);
}
`;
}

const HeroMetaballs = memo(function HeroMetaballs() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const canvas = document.createElement("canvas");
    canvas.className = "block w-full h-full min-h-[220px]";

    try {
    wrap.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      if (canvas.isConnected) canvas.remove();
      return;
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const metaballs: Metaball[] = [];

    const resize = () => {
      const dpr = Math.min(globalThis.devicePixelRatio ?? 1, 2);
      const cw = Math.max(1, wrap.clientWidth);
      const ch = Math.max(1, wrap.clientHeight);
      const w = Math.floor(cw * dpr);
      const h = Math.floor(ch * dpr);
      if (w < 2 || h < 2) return;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${wrap.clientWidth}px`;
      canvas.style.height = `${wrap.clientHeight}px`;
      gl.viewport(0, 0, w, h);

      if (metaballs.length === 0) {
        for (let i = 0; i < NUM_METABALLS; i++) {
          const radius = Math.random() * 48 + 14;
          const r = radius * 0.78;
          const minX = r;
          const maxX = w - r;
          const minY = r;
          const maxY = h - r;
          const x = minX <= maxX ? Math.random() * (maxX - minX) + minX : (minX + maxX) * 0.5;
          const y = minY <= maxY ? Math.random() * (maxY - minY) + minY : (minY + maxY) * 0.5;
          metaballs.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 2.2,
            vy: (Math.random() - 0.5) * 2.2,
            r,
          });
        }
      } else {
        for (const mb of metaballs) {
          mb.x = Math.min(Math.max(mb.r, mb.x), w - mb.r);
          mb.y = Math.min(Math.max(mb.r, mb.y), h - mb.r);
        }
      }
    };

    resize();

    let vs: WebGLShader | undefined;
    let fs: WebGLShader | undefined;
    let program: WebGLProgram | undefined;
    try {
      vs = compileShader(gl, vertexSrc, gl.VERTEX_SHADER);
      fs = compileShader(gl, fragmentSrc(NUM_METABALLS), gl.FRAGMENT_SHADER);
      program = linkProgram(gl, vs, fs);
    } catch {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      // `linkProgram` already deletes the program on link failure; calling again is a no-op.
      if (program) gl.deleteProgram(program);
      if (canvas.isConnected) canvas.remove();
      return;
    }

    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(program);

    const quad = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    const buf = gl.createBuffer();
    if (!buf) {
      gl.deleteProgram(program);
      if (canvas.isConnected) canvas.remove();
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const locPos = gl.getAttribLocation(program, "a_position");
    const locMb = gl.getUniformLocation(program, "u_metaballs");
    const locRes = gl.getUniformLocation(program, "u_resolution");
    if (locPos < 0 || !locMb || !locRes) {
      gl.deleteBuffer(buf);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteProgram(program);
      gl.useProgram(null);
      const lose = gl.getExtension("WEBGL_lose_context");
      lose?.loseContext();
      if (canvas.isConnected) canvas.remove();
      return;
    }

    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 8, 0);

    const data = new Float32Array(3 * NUM_METABALLS);
    let raf = 0;
    let stopped = false;
    let inView = true;

    const shouldAnimate = () =>
      document.visibilityState === "visible" && inView;

    const stopFrame = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const scheduleFrame = () => {
      if (stopped || raf !== 0 || !shouldAnimate()) return;
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (stopped) return;
      if (document.visibilityState === "hidden") {
        stopFrame();
      } else {
        scheduleFrame();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        if (stopped) return;
        if (!inView) {
          stopFrame();
        } else {
          scheduleFrame();
        }
      },
      { root: null, threshold: 0, rootMargin: "0px 0px 48px 0px" },
    );
    io.observe(wrap);

    const loop = () => {
      if (stopped) return;
      raf = 0;
      if (!shouldAnimate()) return;

      const w = canvas.width;
      const h = canvas.height;
      if (w < 1 || h < 1) {
        scheduleFrame();
        return;
      }

      for (const mb of metaballs) {
        mb.x += mb.vx;
        mb.y += mb.vy;
        // Resolve against bounds with inward-facing velocity only. Unconditional `vx *= -1`
        // when out of bounds can flip an already-inward velocity and pin the ball on the edge.
        const minX = mb.r;
        const maxX = w - mb.r;
        if (minX <= maxX) {
          if (mb.x < minX) {
            mb.x = minX;
            mb.vx = Math.abs(mb.vx);
          } else if (mb.x > maxX) {
            mb.x = maxX;
            mb.vx = -Math.abs(mb.vx);
          }
        } else {
          mb.x = (minX + maxX) * 0.5;
          mb.vx = 0;
        }
        const minY = mb.r;
        const maxY = h - mb.r;
        if (minY <= maxY) {
          if (mb.y < minY) {
            mb.y = minY;
            mb.vy = Math.abs(mb.vy);
          } else if (mb.y > maxY) {
            mb.y = maxY;
            mb.vy = -Math.abs(mb.vy);
          }
        } else {
          mb.y = (minY + maxY) * 0.5;
          mb.vy = 0;
        }
      }

      for (let i = 0; i < NUM_METABALLS; i++) {
        const mb = metaballs[i]!;
        data[i * 3] = mb.x;
        data[i * 3 + 1] = mb.y;
        data[i * 3 + 2] = mb.r;
      }

      gl.uniform3fv(locMb, data);
      gl.uniform2f(locRes, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      scheduleFrame();
    };

    scheduleFrame();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(wrap);

    return () => {
      stopped = true;
      stopFrame();
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
      const lose = gl.getExtension("WEBGL_lose_context");
      lose?.loseContext();
      if (canvas.isConnected) canvas.remove();
    };
    } catch (err) {
      if (canvas.isConnected) {
        canvas.remove();
      }
      throw err;
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none [&_canvas]:opacity-100"
      aria-hidden
    />
  );
});

export default HeroMetaballs;
