import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp fmt",
  },
  pack: {
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
