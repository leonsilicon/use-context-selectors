import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vite-plus/test";
import { createContext, useContextSelectors } from "../src/index.ts";

type Store = { n: number; label: string };

const StoreContext = createContext<Store>({ n: 0, label: "" });

function tree(value: Store, children: ReactNode) {
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

function MultiProbe({ sink }: { sink: { current: unknown } }) {
  const tuple = useContextSelectors(
    StoreContext,
    (s) => s.n,
    (s) => s.label,
  );
  sink.current = tuple;
  return null;
}

function SingleProbe({ sink }: { sink: { current: unknown } }) {
  const tuple = useContextSelectors(StoreContext, (s) => s.label);
  sink.current = tuple;
  return null;
}

test("returns one selected value per selector in order", () => {
  const sink: { current: unknown } = { current: null };
  const value = { n: 7, label: "alpha" };

  render(tree(value, <MultiProbe sink={sink} />));

  expect(sink.current).toEqual([7, "alpha"]);
});

test("updates when the context value changes", () => {
  const sink: { current: unknown } = { current: null };

  const { rerender } = render(tree({ n: 1, label: "a" }, <MultiProbe sink={sink} />));

  expect(sink.current).toEqual([1, "a"]);

  rerender(tree({ n: 2, label: "b" }, <MultiProbe sink={sink} />));

  expect(sink.current).toEqual([2, "b"]);
});

test("works with a single selector", () => {
  const sink: { current: unknown } = { current: null };

  render(tree({ n: 0, label: "only" }, <SingleProbe sink={sink} />));

  expect(sink.current).toEqual(["only"]);
});
