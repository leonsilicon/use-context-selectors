# use-context-selectors

Call several [`use-context-selector`](https://github.com/dai-shi/use-context-selector) hooks in one expression, with tuple-typed results that line up with your selectors.

## Installation

```bash
pnpm add use-context-selectors
# or: npm install use-context-selectors / yarn add use-context-selectors
```

Peer dependencies: **React** 18+ and **use-context-selector** 2+.

```bash
pnpm add react use-context-selector
```

## Usage

Pass a context created with `createContext` from `use-context-selector`, then one or more selector functions. You get an array of selected values in the same order as the selectors, with types inferred from each selector’s return type.

```tsx
import { createContext } from "use-context-selector";
import { useContextSelectors } from "use-context-selectors";

type Store = { count: number; label: string };

const StoreContext = createContext<Store | null>(null);

function Counter() {
  const [count, label] = useContextSelectors(
    StoreContext,
    (s) => s!.count,
    (s) => s!.label,
  );

  return (
    <button type="button">
      {label}: {count}
    </button>
  );
}
```

That is equivalent to calling `useContextSelector` once per selector, but keeps selectors and results grouped and easier to refactor.

## API

### `useContextSelectors(context, ...selectors)`

- **context** — A `Context` from `use-context-selector`.
- **selectors** — One or more functions `(value) => selected` where `value` is the context’s current value.

**Returns:** A tuple (array) whose element types are the return types of the selectors, in order.

Each selector still runs under `use-context-selector`’s rules: the component re-renders only when the selected slice changes (by `Object.is`).

### `ContextType<C>`

Utility type: the value type held by a given context `C` (the `infer` partner to your context generic).

```ts
import type { ContextType } from "use-context-selectors";

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
