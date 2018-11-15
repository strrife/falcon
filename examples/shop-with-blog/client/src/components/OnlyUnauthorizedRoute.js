import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IsAuthenticatedQuery } from '@deity/falcon-ecommerce-uikit';

const OnlyUnauthorizedRoute = ({ component: Component, redirectTo, ...rest }) => (
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

OnlyUnauthorizedRoute.defaultProps = {
  redirectTo: '/'
};
OnlyUnauthorizedRoute.propTypes = {
  ...Route.propTypes,
  redirectTo: PropTypes.string
};

export default OnlyUnauthorizedRoute;
