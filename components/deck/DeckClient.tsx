"use client";

import dynamic from "next/dynamic";

// The deck reads window size, URL hash and saved theme on first render,
// so it renders on the client only.
const Deck = dynamic(() => import("./Deck"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-bg" />,
});

export default function DeckClient() {
  return <Deck />;
}
