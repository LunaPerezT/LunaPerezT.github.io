import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HeroBackdrop } from "./HeroBackdrop";

/**
 * ============================================================================
 * PASTE THE SPLINE SCENE URL HERE AND THE HERO SWAPS TO IT. Nothing else to do.
 * ============================================================================
 *
 *   export const SPLINE_SCENE_URL = "https://prod.spline.design/XXXXXXXXXXXX/scene.splinecode";
 *
 * How to get that URL, because it is the one thing that cannot be automated:
 *
 *   1. Open https://community.spline.design/file/aa07fb1a-a7a1-4995-a078-6ed0c217e9a6
 *      while signed in to Spline and press **Remix**. That copies the scene into
 *      your own account, which is what the CC BY 4.0 licence expects.
 *   2. In the editor: Export → Public URL (or "Code / React"), then Publish.
 *   3. Copy the link it gives you. It looks like
 *      https://prod.spline.design/HqdfCmOueigtautT/scene.splinecode — a short
 *      opaque token, not the community file's UUID.
 *
 * Why it has to be done from your account: the community page is a static
 * preview. It loads no scene asset at all (checked: no .splinecode request on
 * the page, and prod.spline.design/<community-uuid>/scene.splinecode answers
 * 403). The publishable token only comes into existence when someone publishes
 * the scene, and only the account owner can do that.
 *
 * ---------------------------------------------------------------------------
 * While the constant is empty this component is inert: no script tag, no
 * network request, nothing added to the bundle. The hero keeps the canvas flow
 * field, which costs ~3 kB.
 *
 * When it is set, the Spline web component is loaded from a CDN at runtime
 * rather than bundled, so the ~1.5 MB runtime never touches the main chunk. The
 * canvas stays underneath as the fallback: it is what a visitor sees while the
 * scene downloads, if the CDN or the scene fails, and whenever the visitor has
 * asked for reduced motion.
 *
 * Attribution, if you do use it: the scene is "Data Visualization" by
 * alfarialstudios, licensed CC BY 4.0, which requires a visible credit.
 *
 * Verified with a locally served copy of the viewer, since this sandbox cannot
 * reach a CDN: the script loads, <spline-viewer> mounts, it builds its own WebGL
 * canvas, the fallback stays underneath and nothing shifts. The one step that
 * could not be exercised here is the scene download itself, which needs the
 * token above. If unpkg is ever unreachable for a visitor, the CDN can be
 * swapped for https://cdn.jsdelivr.net/npm/@splinetool/viewer@1.9.82/build/spline-viewer.js
 * without touching anything else.
 * ---------------------------------------------------------------------------
 */
export const SPLINE_SCENE_URL = "";

/** Pinned rather than @latest, so a viewer release cannot change the hero. */
const VIEWER_SRC = "https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { url?: string; "events-target"?: string };
    }
  }
}

type Status = "idle" | "loading" | "ready" | "failed";

let viewerScript: Promise<void> | null = null;

function loadViewer(): Promise<void> {
  if (viewerScript) return viewerScript;
  viewerScript = new Promise((resolve, reject) => {
    if (customElements.get("spline-viewer")) return resolve();
    const script = document.createElement("script");
    script.type = "module";
    script.src = VIEWER_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("spline-viewer failed to load"));
    document.head.appendChild(script);
  });
  return viewerScript;
}

export function SplineBackdrop({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const enabled = SPLINE_SCENE_URL !== "" && !reduced;
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setStatus("loading");
    loadViewer().then(
      () => !cancelled && setStatus("ready"),
      () => !cancelled && setStatus("failed")
    );
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  // The canvas is always mounted: it is the reduced-motion answer, the loading
  // state, and the failure state, so there is never a blank hero.
  return (
    <div className={className}>
      <HeroBackdrop className="absolute inset-0 h-full w-full" />
      {enabled && status === "ready" && (
        <spline-viewer
          url={SPLINE_SCENE_URL}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
