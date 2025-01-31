import React from 'react';

/**
 * Merge react refs.
 * Adapted from https://github.com/smooth-code/react-merge-refs
 */
export const mergeRefs = refs => {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null) {
        ref.current = value;
      }
    });
  };
};

export function elementFromClass<K extends keyof React.JSX.IntrinsicElements>(
  type: K,
  className: string,
): React.ForwardRefExoticComponent<React.JSX.IntrinsicElements[K]>;
// eslint-disable-next-line no-redeclare
export function elementFromClass<T>(type: T, className: string): T;
// eslint-disable-next-line no-redeclare
export function elementFromClass(type, className) {
  const render = (
    { children, ...props }: Parameters<typeof React.createElement>[1] & { children: React.ReactNode },
    ref,
  ) => {
    children = Array.isArray(children) ? children : [children];
    // TODO: Merge classNames using Gustav's helper function
    return React.createElement(type, { ...props, className, ref } as any, ...(children as any));
  };
  render.displayName = typeof type === 'string' ? type : type.name;
  return React.forwardRef(render);
}
