"use client";

import { createContext, useContext } from "react";

/** Lets any slide jump the deck to another slide index. */
export const DeckNav = createContext<(index: number) => void>(() => {});

export const useDeckNav = () => useContext(DeckNav);
