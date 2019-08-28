import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as UiLink, ThemedComponentProps } from '@deity/falcon-ui';

export type LinkProps = RouterLinkProps & ThemedComponentProps;
export const Link: React.SFC<LinkProps> = props => <UiLink as={RouterLink} {...props} />;
