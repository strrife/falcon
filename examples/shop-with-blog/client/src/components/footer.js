import React from 'react';
import { H4, List } from '@deity/falcon-ui';
import { T } from '@deity/falcon-i18n';
import {
  FooterSectionsLayout,
  FooterSectionLayout,
  SitemapLink,
  FooterLayout,
  LanguageSection,
  LocaleSwitcher,
  LocaleSwitcherDropdown,
  Newsletter,
  ComponentToReplace,
  Text as UIkitText
} from '@deity/falcon-ecommerce-uikit';
// import { Copyright } from '@deity/falcon-ecommerce-uikit/dist/Footer/Copyright';
import { Copyright } from '@deity/falcon-ecommerce-uikit';
import { ComponentToReplace as ReplacedComponent } from 'src/components/ComponentToReplace';
// import { ComponentToReplace } from '@deity/falcon-ecommerce-uikit/dist/Footer/ComponentToReplace';

export const Sitemap = () => (
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

export const Footer = () => (
  <FooterLayout as="footer">
    <ComponentToReplace />
    <UIkitText>some text rendered inside UIkitText</UIkitText>
    <Newsletter />
    <Sitemap />
    <LanguageSection>
      <LocaleSwitcher>{({ ...props }) => <LocaleSwitcherDropdown {...props} />}</LocaleSwitcher>
    </LanguageSection>
    <ReplacedComponent />
    <Copyright />
  </FooterLayout>
);
