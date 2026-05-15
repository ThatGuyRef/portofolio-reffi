import { startTransition, useEffect, useRef, useState } from "react";

export default function LazySection({
  children,
  id,
  minHeightClassName = "",
  onVisible,
  placeholder,
  rootMargin = "320px 0px",
}) {
  const markerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    if (shouldRender) return;

    const marker = markerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        onVisible?.();
        startTransition(() => {
          setShouldRender(true);
        });
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, [onVisible, rootMargin, shouldRender]);

  if (shouldRender) {
    return children;
  }

  return (
    <section
      ref={markerRef}
      id={id}
      aria-hidden="true"
      className={minHeightClassName}
    >
      {placeholder}
    </section>
  );
}
