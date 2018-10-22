import React from 'react';
import { withCSSContext } from '@emotion/core';
import { themed, PropsWithTheme, BaseProps, ThemedComponentProps } from '../theme';

type IconProps = { src: string; fallback?: React.ReactNode } & ThemedComponentProps & BaseProps<'svg'>;

const IconRenderer = withCSSContext((props: IconProps, context: PropsWithTheme) => {
  if (!context.theme || !context.theme.icons) return null;

  const { icons } = context.theme;
  const { src, fallback, ...rest } = props;

  if (!props.src || !icons[src]) {
    return fallback || null;
  }

  const { icon: SVGICon, ...otherProps } = icons[src];

  return <SVGICon {...otherProps} {...rest} />;
}) as (props: IconProps) => JSX.Element;

export const Icon = themed({
  tag: IconRenderer,

  defaultProps: {
    // https://stackoverflow.com/questions/18646111/disable-onfocus-event-for-svg-element
    focusable: 'false',
    src: '',
    fallback: undefined as React.ReactNode | undefined
  },

  defaultTheme: {
    icon: {
      size: 'lg',
      stroke: 'primary'
    }
  }
});
