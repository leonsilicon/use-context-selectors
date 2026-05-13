import { expect, test } from "vite-plus/test";
import esMain, { stripExt } from "../src/index.ts";

test("stripExt is re-exported", () => {
  expect(stripExt("file.ts")).toBe("file");
  expect(stripExt("file")).toBe("file");
});

test("default export matches es-main", () => {
  expect(typeof esMain).toBe("function");
  expect(esMain(undefined as unknown as ImportMeta)).toBe(false);
});
