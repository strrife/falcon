import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const RenderRouterProps: React.SFC<RouteComponentProps> = props => {
  const { match, location, history, children } = props;

  return (children as Function)({ match, location, history });
};

export const Router = withRouter(RenderRouterProps);
