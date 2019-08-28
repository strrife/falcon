import React from 'react';
import { T } from '@deity/falcon-i18n';
import { H4, List } from '@deity/falcon-ui';
import { Footer, LocalePicker } from '@deity/falcon-ui-kit';
import { LocaleSwitcher } from '@deity/falcon-front-kit';
import {
  FooterSectionsLayout,
  FooterSectionLayout,
  FooterLink,
  LanguageSection,
  Newsletter,
  Copyright
} from '@deity/falcon-ecommerce-uikit';

export const Sitemap = () => (
  <FooterSectionsLayout>
    <FooterSectionLayout>
      <H4 fontWeight="bold">
        <T id="sitemap.customerService" />
      </H4>
      <List>
        <FooterLink to="/">
          <T id="sitemap.trackOrderLink" />
        </FooterLink>
        <FooterLink to="/">
          <T id="sitemap.returnPolicyLink" />
        </FooterLink>
        <FooterLink to="/">
          <T id="sitemap.faqsLink" />
        </FooterLink>
      </List>
    </FooterSectionLayout>
    <FooterSectionLayout>
      <H4 fontWeight="bold">
        <T id="sitemap.aboutUs" />
      </H4>
      <List>
        <FooterLink to="/">
          <T id="sitemap.aboutUsLink" />
        </FooterLink>
        <FooterLink to="/blog">
          <T id="sitemap.blogLink" />
        </FooterLink>
        <FooterLink to="/">
          <T id="sitemap.jobsLink" />
        </FooterLink>
      </List>
    </FooterSectionLayout>
    <FooterSectionLayout>
      <H4 fontWeight="bold">
        <T id="sitemap.terms" />
      </H4>
      <List>
        <FooterLink to="/">
          <T id="sitemap.cookiesLink" />
        </FooterLink>
        <FooterLink to="/">
          <T id="sitemap.termsLink" />
        </FooterLink>
      </List>
    </FooterSectionLayout>
  </FooterSectionsLayout>
);

export const PageFooter = () => (
  <Footer>
    <Newsletter />
    <Sitemap />
    <LanguageSection>
      <LocaleSwitcher>{({ ...props }) => <LocalePicker {...props} />}</LocaleSwitcher>
    </LanguageSection>
    <Copyright />
  </Footer>
);
