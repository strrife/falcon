import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IsAuthenticatedQuery } from './../Customer/IsAuthenticatedQuery';

type OnlyUnauthorizedRouteProps = RouteProps & {
  redirectTo: string;
};

export const OnlyUnauthorizedRoute: React.SFC<OnlyUnauthorizedRouteProps> = ({ component, redirectTo, ...rest }) => {
  const Component = component as React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

  return (
    <Route
      {...rest}
      render={props => (
        <IsAuthenticatedQuery>
          {({ customer }) =>
            customer ? (
              <Redirect
                to={{
                  pathname: redirectTo,
                  state: { origin: props.location }
                }}
              />
            ) : (
              <Component {...props} />
            )
          }
        </IsAuthenticatedQuery>
      )}
    />
  );
};
OnlyUnauthorizedRoute.defaultProps = {
  redirectTo: '/'
};
OnlyUnauthorizedRoute.propTypes = {
  ...(Route as any).propTypes,
  redirectTo: PropTypes.string
};
