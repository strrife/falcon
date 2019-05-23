import React from 'react';
import { T } from '@deity/falcon-i18n';
import { Link as RouterLink } from 'react-router-dom';
import { Link, List, ListItem, themed } from '@deity/falcon-ui';
import { SignOutLogic } from '@deity/falcon-ecommerce-uikit';

export const BannerLayout = themed({
  tag: List,
  defaultTheme: {
    bannerLayout: {
      display: 'flex',
      justifyContent: 'flex-end',
      bgFullWidth: 'secondaryLight',
      m: 'none',
      p: 'none',
      css: {
        listStyle: 'none'
      }
    }
  }
});

export const Banner = () => (
  <BannerLayout>
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    <SignOutLogic>
      {(isSignedIn, signOut) =>
        isSignedIn && (
          <ListItem p="xs">
            <Link onClick={() => signOut()}>
              <T id="signOut.link" />
            </Link>
          </ListItem>
        )
      }
    </SignOutLogic>
    <ListItem p="xs">
      <Link as={RouterLink} to="#">
        <T id="banner.contactLink" />
      </Link>
    </ListItem>
    <ListItem p="xs">
      <Link as={RouterLink} to="/blog">
        <T id="banner.blogLink" />
      </Link>
    </ListItem>
  </BannerLayout>
);
