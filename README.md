# use-context-selectors

Call several [`useContextSelector`](https://github.com/dai-shi/use-context-selector) hooks in one expression, with tuple-typed results that line up with your selectors.

This package **vendors** [`use-context-selector`](https://github.com/dai-shi/use-context-selector) into the published build and **re-exports its full public API**. Install only `use-context-selectors`; you do not add `use-context-selector` separately.

## Installation

```bash
pnpm add use-context-selectors
# or: npm install use-context-selectors / yarn add use-context-selectors
```

Peer dependencies: **React** 18+ and **scheduler** 0.19+ (same as upstream `use-context-selector`; the bundled code imports both).

```bash
pnpm add react scheduler
```

In many apps, `scheduler` is already satisfied transitively (for example via `react-dom`). If the bundler reports a missing `scheduler` module, add it explicitly.

## Usage

Import context helpers from this package, then pass a context and one or more selectors to `useContextSelectors`. You get an array of selected values in the same order as the selectors, with types inferred from each selector’s return type.

```tsx
import { createContext, useContextSelectors } from "use-context-selectors";

type Store = { count: number; label: string };

const StoreContext = createContext<Store>({ count: 0, label: "" });

function Counter() {
  const [count, label] = useContextSelectors(
    StoreContext,
    (s) => s.count,
    (s) => s.label,
  );

  return (
    <button type="button">
      {label}: {count}
    </button>
  );
}
```

That is equivalent to calling `useContextSelector` once per selector, but keeps selectors and results grouped and easier to refactor.

### Re-exports

Everything exported by [`use-context-selector`](https://github.com/dai-shi/use-context-selector) is also exported from `use-context-selectors` (for example `createContext`, `useContextSelector`, `useContext`, `useContextUpdate`, `BridgeProvider`, `useBridgeValue`). Prefer importing those symbols from `use-context-selectors` so you stay on a single dependency and one version of the implementation.

## API

### `useContextSelectors(context, ...selectors)`

- **context** — A `Context` created with `createContext` from this package (or the same API as upstream).
- **selectors** — One or more functions `(value) => selected` where `value` is the context’s current value.

**Returns:** A tuple (array) whose element types are the return types of the selectors, in order.

Each selector still runs under the same rules as upstream: the component re-renders only when the selected slice changes (by `Object.is`).

### `ContextType<C>`

Utility type: the value type held by a given context `C` (the `infer` partner to your context generic).

```ts
import type { Context, ContextType } from "use-context-selectors";

declare const MyContext: Context<MyState>;

type State = ContextType<typeof MyContext>;
```

## Development

This repo uses [Vite+](https://viteplus.dev/guide/) (`vp`).

- Install dependencies: `vp install`
- Format, lint, and typecheck: `vp check`
- Tests: `vp test`
- Build the library: `vp pack`

## License

MIT
