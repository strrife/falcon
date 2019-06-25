import React from 'react';
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line
import { Location } from 'history';
import { UrlQuery, ResourceMeta } from '@deity/falcon-data';
import { Router } from '../Router';

export type DynamicRouteComponentProps = Pick<ResourceMeta, 'id' | 'path'>;

export type ComponentsMap = { [key: string]: React.ComponentType<DynamicRouteComponentProps> };

export type DynamicRouteProps = {
  location?: Location;
  components: ComponentsMap;
  notFound: React.ComponentType<{ location: Location }>;
};

export const DynamicRoute: React.SFC<DynamicRouteProps> = props => {
  const { components, notFound } = props;

  return (
    <Router>
      {router => {
        const location = props.location || router.location;
        const { pathname } = location;
        const path = pathname.startsWith('/') ? pathname.substring(1) : pathname;

        return (
          <UrlQuery variables={{ path }}>
            {({ url }) => {
              if (!url) {
                const NotFound = notFound;

                return <NotFound location={location} />;
              }

              if (url.redirect) {
                return <Redirect to={`/${url.path}`} />;
              }

              const Component = components[url.type];
              if (!Component) {
                console.warn(`Please register component for '${url.type}' content type!`);

                return null;
              }

              return <Component id={url.id} path={url.path} />;
            }}
          </UrlQuery>
        );
      }}
    </Router>
  );
};
