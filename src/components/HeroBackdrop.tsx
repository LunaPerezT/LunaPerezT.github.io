import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A flow field drifting behind the hero: particles advected through a slowly
 * rotating noise field, leaving faint trails. Blue by default, with roughly one
 * in seven carrying the orange highlight.
 *
 * It is a phase portrait, which is a picture a data scientist recognises — the
 * point was a moving background that still belongs on this particular site.
 *
 * Costs: ~3 kB of code, one canvas, no dependency, no network. It stops
 * completely when the tab is hidden or the hero scrolls out of view, and with
 * `prefers-reduced-motion` it paints a single frame and never animates.
 *
 * ---------------------------------------------------------------------------
 * To swap this for a Spline scene instead:
 *
 *   1. Open the community file in Spline, then File → Export → "Code (React)"
 *      or "Public URL". You need the resulting
 *      `https://prod.spline.design/<id>/scene.splinecode` URL — the
 *      app.spline.design/community/file/... link is the editor, and cannot be
 *      embedded.
 *   2. `npm i @splinetool/react-spline @splinetool/runtime`
 *   3. Replace the <canvas> below with:
 *
 *        const Spline = lazy(() => import("@splinetool/react-spline"));
 *        <Suspense fallback={null}>
 *          <Spline scene="https://prod.spline.design/<id>/scene.splinecode" />
 *        </Suspense>
 *
 * Worth knowing before you do: the Spline runtime is roughly 1.5 MB of
 * JavaScript plus the scene itself, against 3 kB here, and it renders WebGL
 * continuously. On a portfolio whose first impression is a page that loads
 * instantly, that is a real trade — which is why this is the default and Spline
 * is the documented upgrade rather than the other way round.
 * ---------------------------------------------------------------------------
 */
interface Particle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  warm: boolean;
}

const PARTICLE_COUNT = 90;
const FIELD_SCALE = 0.0016;

export function HeroBackdrop({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;
    let running = true;
    let particles: Particle[] = [];

    const styles = getComputedStyle(document.documentElement);
    const cool = styles.getPropertyValue("--primary").trim();
    const warm = styles.getPropertyValue("--highlight").trim();

    const reset = (particle: Particle) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      particle.life = 0;
      particle.maxLife = 120 + Math.random() * 220;
      particle.warm = Math.random() < 0.14;
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const particle: Particle = { x: 0, y: 0, life: 0, maxLife: 0, warm: false };
        reset(particle);
        particle.life = Math.random() * particle.maxLife;
        return particle;
      });
    };

    /** Cheap smooth pseudo-noise: three sines, no lookup tables. */
    const angleAt = (x: number, y: number, t: number) =>
      (Math.sin(x * FIELD_SCALE + t) +
        Math.sin(y * FIELD_SCALE * 1.3 - t * 0.8) +
        Math.sin((x + y) * FIELD_SCALE * 0.6 + t * 0.5)) *
      1.4;

    const step = () => {
      if (!running) return;
      time += 0.0016;

      // Fade rather than clear, so each particle leaves a short trail.
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.045)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      for (const particle of particles) {
        const angle = angleAt(particle.x, particle.y, time);
        const previousX = particle.x;
        const previousY = particle.y;
        particle.x += Math.cos(angle) * 0.7;
        particle.y += Math.sin(angle) * 0.7;
        particle.life += 1;

        if (
          particle.life > particle.maxLife ||
          particle.x < -20 ||
          particle.x > width + 20 ||
          particle.y < -20 ||
          particle.y > height + 20
        ) {
          reset(particle);
          continue;
        }

        // Fade in and out so nothing pops into or out of existence.
        const phase = particle.life / particle.maxLife;
        const alpha = Math.sin(phase * Math.PI) * (particle.warm ? 0.5 : 0.34);

        context.strokeStyle = `hsl(${particle.warm ? warm : cool} / ${alpha})`;
        context.lineWidth = particle.warm ? 1.4 : 1;
        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      }

      frame = requestAnimationFrame(step);
    };

    const paintStatic = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        context.fillStyle = `hsl(${particle.warm ? warm : cool} / 0.28)`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.warm ? 1.6 : 1.1, 0, Math.PI * 2);
        context.fill();
      }
    };

    resize();

    if (reduced) {
      paintStatic();
      const onResize = () => {
        resize();
        paintStatic();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // Stop entirely when nobody can see it: off-screen or tab in the background.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running && !document.hidden) {
          running = true;
          frame = requestAnimationFrame(step);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(step);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      // The field is decoration; the mask keeps it out of the way of the text.
      style={{
        maskImage: "radial-gradient(ellipse 75% 70% at 55% 45%, #000 25%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 70% at 55% 45%, #000 25%, transparent 75%)",
      }}
    />
  );
}
