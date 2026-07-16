"use client";

import { useCallback, useRef, useState } from "react";

export interface HoverTagProps {
  label?: string;
  children: React.ReactNode;
}

/**
 * Reimplements the Webflow "Coming Soon" cursor tooltip (.tag-viewport /
 * .hover-tag). Webflow drove this with an interaction that pinned the tag to
 * the cursor; here the wrapped element shows the tag on hover and the tag
 * tracks mousemove. The viewport container is pointer-events: none via the
 * ported `.tag-viewport` CSS.
 */
export default function HoverTag({ label = "Coming Soon", children }: HoverTagProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const frame = useRef<number | null>(null);

  const move = useCallback((event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setPosition({ x: clientX, y: clientY });
    });
  }, []);

  const leave = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setPosition(null);
  }, []);

  return (
    <span
      style={{ display: "contents" }}
      onMouseEnter={move}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
      {position && (
        <span
          className="tag-viewport"
          style={{ display: "flex", top: 0, left: 0 }}
          aria-hidden="true"
        >
          <span
            className="hover-tag"
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <span className="hover-text overline size-xs">{label}</span>
          </span>
        </span>
      )}
    </span>
  );
}
