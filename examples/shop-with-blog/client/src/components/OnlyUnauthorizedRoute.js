import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsAuthenticatedQuery } from '@deity/falcon-ecommerce-uikit';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <IsAuthenticatedQuery>
        {({ customer }) =>
          customer ? (
            <Redirect
              to={{
                pathname: '/',
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
