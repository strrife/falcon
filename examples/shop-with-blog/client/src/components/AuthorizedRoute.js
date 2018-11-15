import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsAuthenticatedQuery } from '@deity/falcon-ecommerce-uikit';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <IsAuthenticatedQuery>
        {({ customer, config }) =>
          customer ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: config.signInUrl,
                state: { origin: props.location }
              }}
            />
          )
        }
      </IsAuthenticatedQuery>
    )}
  />
);
