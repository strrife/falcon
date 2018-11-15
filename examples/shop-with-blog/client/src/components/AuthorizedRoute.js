import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IsAuthenticatedQuery } from '@deity/falcon-ecommerce-uikit';

const AuthorizedRoute = ({ component: Component, redirectTo, ...rest }) => (
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
AuthorizedRoute.defaultProps = {
  redirectTo: '/sign-in'
};
AuthorizedRoute.propTypes = {
  ...Route.propTypes,
  redirectTo: PropTypes.string
};

export default AuthorizedRoute;
