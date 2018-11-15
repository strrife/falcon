import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IsAuthenticatedQuery } from './../Customer/IsAuthenticatedQuery';

type AuthorizedRouteProps = RouteProps & {
  redirectTo: string;
};

export const AuthorizedRoute: React.SFC<AuthorizedRouteProps> = ({ component, redirectTo, ...rest }) => {
  const Component = component as React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

  return (
    <Route
      {...rest}
      render={props => (
        <IsAuthenticatedQuery>
          {({ customer }) =>
            customer ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: redirectTo,
                  state: { origin: props.location }
                }}
              />
            )
          }
        </IsAuthenticatedQuery>
      )}
    />
  );
};
AuthorizedRoute.defaultProps = {
  redirectTo: '/sign-in'
};
AuthorizedRoute.propTypes = {
  ...(Route as any).propTypes,
  redirectTo: PropTypes.string
};
