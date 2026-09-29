import { useEffect } from "react";

/** Met à jour les variables CSS --mx / --my / --px / --py utilisées par le glow et le hero. */
export function useMouseGlow() {
  useEffect(() => {
    const root = document.documentElement;

    const move = (event: MouseEvent) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
      root.style.setProperty(
        "--px",
        `${(event.clientX / window.innerWidth - 0.5) * 18}px`,
      );
      root.style.setProperty(
        "--py",
        `${(event.clientY / window.innerHeight - 0.5) * 18}px`,
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
}
