"use client";

// CLIENT component: a simple toggle that uses React state.

import { useState } from "react";

export default function VisitedButton({ name }) {
  const [visited, setVisited] = useState(false);

  return (
    <button
      onClick={() => setVisited((v) => !v)}
      className={visited ? "primary" : ""}
      aria-pressed={visited}
    >
      {visited ? `✓ I've been to ${name}` : `Mark ${name} as visited`}
    </button>
  );
}
