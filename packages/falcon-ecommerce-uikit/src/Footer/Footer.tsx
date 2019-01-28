import React from 'react';
import { H4, List, Box, themed } from '@deity/falcon-ui';
import { T, I18n } from '@deity/falcon-i18n';
import { LocaleSwitcher, LocaleSwitcherDropdown } from './LocaleSwitcher';
import { Newsletter } from './Newsletter';
import { Copyright } from './Copyright';
import { FooterSectionsLayout, FooterSectionLayout, SitemapLink } from './FooterSections';

export const Sitemap: React.SFC = () => (
  <FooterSectionsLayout>
    <FooterSectionLayout>
      <H4 fontWeight="bold">
        <T id="sitemap.customerService" />
      </H4>
      <List>
        <SitemapLink to="/">
          <T id="sitemap.trackOrderLink" />
        </SitemapLink>
        <SitemapLink to="/">
          <T id="sitemap.returnPolicyLink" />
        </SitemapLink>
        <SitemapLink to="/">
          <T id="sitemap.faqsLink" />
        </SitemapLink>
      </List>
    </FooterSectionLayout>
    <FooterSectionLayout>
      <H4 fontWeight="bold">
        <T id="sitemap.aboutUs" />
      </H4>
      <List>
        <SitemapLink to="/">
          <T id="sitemap.aboutUsLink" />
        </SitemapLink>
        <SitemapLink to="/blog">
          <T id="sitemap.blogLink" />
        </SitemapLink>
        <SitemapLink to="/">
          <T id="sitemap.jobsLink" />
        </SitemapLink>
      </List>
    </FooterSectionLayout>
    <FooterSectionLayout>
      <H4 fontWeight="bold">
        <T id="sitemap.terms" />
      </H4>
      <List>
        <SitemapLink to="/">
          <T id="sitemap.cookiesLink" />
        </SitemapLink>
        <SitemapLink to="/">
          <T id="sitemap.termsLink" />
        </SitemapLink>
      </List>
    </FooterSectionLayout>
  </FooterSectionsLayout>
);

export const FooterLayout = themed({
  tag: Box,
  defaultTheme: {
    footerLayout: {
      mt: 'md'
    }
  }
});

export const Footer: React.SFC = () => (
  <FooterLayout as="footer">
    <Newsletter />
    <Sitemap />
    <LocaleSwitcher />
    <Copyright />
  </FooterLayout>
);
