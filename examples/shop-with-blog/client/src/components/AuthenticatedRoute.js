import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CustomerQuery } from '@deity/falcon-ecommerce-uikit';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <CustomerQuery>
        {({ customer }) =>
          customer ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      </CustomerQuery>
    )}
  />
);
