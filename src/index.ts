import type { Context } from "use-context-selector";
import { useContextSelector } from "use-context-selector";

export type ContextType<C extends Context<any>> = C extends Context<infer T> ? T : never;

export function useContextSelectors<
  $Context extends Context<any>,
  $Selectors extends Array<(state: ContextType<$Context>) => any>,
>(
  context: $Context,
  ...selectors: $Selectors
): { [K in keyof $Selectors]: ReturnType<$Selectors[K]> } {
  const results = selectors.map((selector) => useContextSelector(context, selector as any));

  // @ts-expect-error: complex mapped tuple return type
  return results;
}
