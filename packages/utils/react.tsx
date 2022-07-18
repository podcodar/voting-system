import { EffectCallback, FC, ReactNode, useEffect, ChangeEvent } from 'react';

export type ReactEvent = ChangeEvent<HTMLInputElement>;

export interface ChildrenProps {
  readonly children: ReactNode;
}

export function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export function withProviders(
  initialElement: ReactNode,
  providers: FC<ChildrenProps>[],
) {
  return providers.reduce(
    (children, Provider) => <Provider>{children}</Provider>,
    initialElement,
  );
}
