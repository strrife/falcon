import React from 'react';
import { H4, List, Box, DefaultThemeProps, themed } from '@deity/falcon-ui';
import { T, I18n } from '@deity/falcon-i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { FooterData } from './FooterQuery';
import { Newsletter } from './Newsletter';
import { Copyright } from './Copyright';
import { FooterSectionsLayout, FooterSectionLayout, SitemapLink } from './FooterSections';
import { BackendConfigQuery, SetLocaleMutation } from '../BackendConfig';

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

const languageSectionTheme: DefaultThemeProps = {
  languageSection: {
    bgFullWidth: 'secondaryLight',
    py: 'md',
    css: {
      maxWidth: 160,
      margin: '0 auto',
      textAlign: 'center',
      zIndex: 2
    }
  }
};

export const FooterLayout = themed({
  tag: Box,
  defaultTheme: {
    footerLayout: {
      mt: 'md'
    }
  }
});

export const Footer: React.SFC<FooterData> = () => (
  <FooterLayout as="footer">
    <Newsletter />
    <Sitemap />
    <Box defaultTheme={languageSectionTheme}>
      <I18n>
        {(t, i18n) => (
          <BackendConfigQuery passLoading>
            {({ backendConfig: { locales, activeLocale } }) => (
              <SetLocaleMutation>
                {setLocale => (
                  <LanguageSwitcher
                    items={locales.map(x => ({ code: x, name: t(`languages.${x}`) }))}
                    value={{ code: activeLocale, name: t(`languages.${activeLocale}`) }}
                    onChange={x => {
                      setLocale({ variables: { locale: x.code } }).then(({ data }: any) => {
                        i18n.changeLanguage(data.setLocale.activeLocale.replace('_', '-'));
                      });
                    }}
                  />
                )}
              </SetLocaleMutation>
            )}
          </BackendConfigQuery>
        )}
      </I18n>
    </Box>
    <Copyright />
  </FooterLayout>
);
