import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp fmt --fix",
  },
  pack: {
    entry: [
      "src/index.ts",
      "src/animated.ts",
      "src/keyboard.ts",
      "src/keyboard-controller.ts",
      "src/reanimated.ts",
    ],
    dts: {
      tsgo: true,
    },
    exports: false,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
