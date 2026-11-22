"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/* Sample a deformed torus in 3D. Each streamline winds once around its surface. */
function field() {
  const count = 156,
    steps = 152;
  const lines = new Float32Array(count * (steps + 1) * 3);
  let index = 0;
  for (let row = 0; row < count; row++) {
    const v = (row / count) * Math.PI * 2;
    for (let col = 0; col <= steps; col++) {
      const u = (col / steps) * Math.PI * 2;
      const a = v + u + 0.3 * Math.sin(2 * u - v);
      const tube =
        0.37 + 0.065 * Math.sin(3 * u + 0.25) + 0.055 * Math.cos(2 * u - v);
      const radius = 0.86 + 0.105 * Math.cos(2 * u + 0.1) + tube * Math.cos(a);
      lines[index++] = radius * Math.cos(u);
      lines[index++] = radius * Math.sin(u);
      lines[index++] = tube * Math.sin(a) + 0.29 * Math.sin(2 * u - 0.4);
    }
  }
  return { count, steps, lines };
}
let geometry: ReturnType<typeof field> | undefined;

export default function Flux() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [moving, setMoving] = useState(false);
  const motion = useRef(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      motion.current = !media.matches;
      setMoving(motion.current);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const { count, steps, lines } = (geometry ??= field());
    let w = 0,
      h = 0,
      time = 0,
      frame = 0,
      last = 0,
      dirty = true,
      visible = true;
    let px = 0,
      py = 0,
      tx = 0,
      ty = 0;
    const theme = new MutationObserver(() => {
      dirty = true;
    });
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const resize = new ResizeObserver(() => {
      w = el.clientWidth;
      h = el.clientHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
    });
    resize.observe(el);
    const intersect = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    intersect.observe(el);
    function pointer(e: PointerEvent) {
      if (!el || e.pointerType === "touch") return;
      const rect = el.getBoundingClientRect();
      tx = (e.clientX - rect.left) / w - 0.5;
      ty = (e.clientY - rect.top) / h - 0.5;
    }
    function leave() {
      tx = 0;
      ty = 0;
    }
    el.addEventListener("pointermove", pointer);
    el.addEventListener("pointerleave", leave);
    // Render in short depth-sorted segments so back-facing strands recede behind the rim.
    const segment = 8,
      groups = steps / segment,
      stride = segment + 1;
    const points = new Float32Array(count * groups * stride * 2);
    const depths = new Float32Array(count * groups);
    const order = Array.from({ length: count * groups }, (_, i) => i);
    function render(stamp: number) {
      frame = requestAnimationFrame(render);
      if (
        !ctx ||
        !visible ||
        document.hidden ||
        !w ||
        stamp - last < 33 ||
        (!motion.current && !dirty)
      )
        return;
      if (motion.current) {
        time += Math.min((stamp - last) / 1000, 0.06);
        px += (tx - px) * 0.07;
        py += (ty - py) * 0.07;
      }
      last = stamp;
      dirty = false;
      const light = document.documentElement.dataset.theme === "light";
      const rot = -0.42 + Math.sin(time * 0.13) * 0.18 + px * 0.28;
      const tilt = 0.61 + Math.sin(time * 0.16) * 0.085 + py * 0.22;
      const cr = Math.cos(rot),
        sr = Math.sin(rot),
        ct = Math.cos(tilt),
        st = Math.sin(tilt);
      const scale = Math.min(w * 0.278, h * 0.364),
        cx = w * 0.5,
        cy = h * 0.5;
      ctx.clearRect(0, 0, w, h);
      // Fine elliptical guides share the scene's coordinate system.
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.32);
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          scale * (1.74 + i * 0.15),
          scale * (0.59 + i * 0.14),
          i * 0.23,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = light
          ? "rgba(20,97,75,.24)"
          : "rgba(137,217,177,.20)";
        ctx.lineWidth = 0.64;
        ctx.stroke();
      }
      for (const a of [-0.24, 2.78]) {
        const x = Math.cos(a) * 1.74 * scale,
          y = Math.sin(a) * 0.59 * scale;
        ctx.fillStyle = light ? "#137e59" : "#adffd9";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      for (let row = 0; row < count; row++)
        for (let g = 0; g < groups; g++) {
          const id = row * groups + g;
          for (let j = 0; j < stride; j++) {
            const src = (row * (steps + 1) + g * segment + j) * 3;
            const x = lines[src] * cr - lines[src + 1] * sr,
              y = lines[src] * sr + lines[src + 1] * cr,
              z = lines[src + 2];
            const depth = y * st + z * ct;
            const screenY = y * ct - z * st;
            const p = (id * stride + j) * 2,
              persp = 3.8 / (3.8 - depth * 0.32);
            points[p] = cx + scale * (x * 0.905 - screenY * 0.425) * persp;
            points[p + 1] = cy + scale * (x * 0.425 + screenY * 0.905) * persp;
            if (j === 4) depths[id] = depth;
          }
        }
      order.sort((a, b) => depths[a] - depths[b]);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (const id of order) {
        const d = Math.max(0, Math.min(1, (depths[id] + 1.03) / 2.08));
        const p = id * stride * 2;
        const shine = Math.max(
          0,
          1 -
            Math.abs(
              ((points[p] - cx) / scale) * 0.42 +
                (points[p + 1] - cy) / scale +
                0.2,
            ),
        );
        const glow = Math.max(0, Math.min(1, d * 0.76 + shine * 0.34));
        if (light)
          ctx.strokeStyle =
            "rgba(" +
            Math.round(7 + 14 * glow) +
            "," +
            Math.round(55 + 102 * glow) +
            "," +
            Math.round(49 + 68 * glow) +
            "," +
            (0.24 + 0.7 * d) +
            ")";
        else
          ctx.strokeStyle =
            "rgba(" +
            Math.round(26 + 174 * glow ** 2) +
            "," +
            Math.round(103 + 150 * glow) +
            "," +
            Math.round(78 + 120 * glow) +
            "," +
            (0.25 + 0.68 * d) +
            ")";
        ctx.lineWidth = 0.52 + d * 0.54;
        ctx.beginPath();
        ctx.moveTo(points[p], points[p + 1]);
        for (let j = 1; j < stride; j++)
          ctx.lineTo(points[p + j * 2], points[p + j * 2 + 1]);
        ctx.stroke();
      }
    }
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      theme.disconnect();
      intersect.disconnect();
      el.removeEventListener("pointermove", pointer);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <figure className="flux-figure">
      <span className="registration reg-one" aria-hidden="true">
        +
      </span>
      <span className="registration reg-two" aria-hidden="true">
        +
      </span>
      <canvas
        ref={canvas}
        role="img"
        aria-label="A mint-green torus woven from three-dimensional orbital streamlines."
      />
      <figcaption>
        <span className="figure-number">FIG. 01</span>
        <span className="caption-rule" />
        Flux field
      </figcaption>
      <button
        className="motion-toggle"
        aria-label={moving ? "Pause animation" : "Play animation"}
        title={moving ? "Pause animation" : "Play animation"}
        onClick={() => {
          motion.current = !moving;
          setMoving(!moving);
        }}
      >
        {moving ? <Pause size={13} /> : <Play size={13} />}
      </button>
    </figure>
  );
}
