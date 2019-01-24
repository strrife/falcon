import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { H4, Link, List, ListItem, Box, DefaultThemeProps, themed } from '@deity/falcon-ui';
import { T, I18n } from '@deity/falcon-i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { FooterData } from './FooterQuery';
import { Newsletter } from './Newsletter';

export const CopyrightLayout = themed({
  tag: Box,
  defaultTheme: {
    copyrightLayout: {
      p: 'sm',
      color: 'secondaryText',
      bgFullWidth: 'secondary',
      css: {
        textAlign: 'center'
      }
    }
  }
});

export const FooterSectionsLayout = themed({
  tag: Box,
  defaultTheme: {
    footerSectionsLayout: {
      display: 'flex',
      bgFullWidth: 'secondaryLight',
      css: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        justifyItems: 'center',
        flexWrap: 'wrap'
      }
    }
  }
});

export const FooterSectionLayout = themed({
  tag: Box,
  defaultTheme: {
    footerSection: {
      p: 'md',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: {
        md: 'flex-start',
        xs: 'flex-start'
      },
      css: {
        minWidth: 250,
        textAlign: {
          md: 'unset',
          xs: 'center'
        },
        alignItems: {
          md: 'unset',
          xs: 'center'
        }
      }
    }
  }
});

export const SitemapLink: React.SFC<{ to: string }> = ({ to, children }) => (
  <ListItem p="xs">
    <Link as={RouterLink} to={to}>
      {children}
    </Link>
  </ListItem>
);

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

export const Footer: React.SFC<FooterData> = ({ config: { languages } }) => (
  <FooterLayout as="footer">
    <Newsletter />
    <Sitemap />
    <Box defaultTheme={languageSectionTheme}>
      <I18n>
        {(_t, i18n) => <LanguageSwitcher languages={languages} onChange={x => i18n.changeLanguage(x.code)} />}
      </I18n>
    </Box>
    <CopyrightLayout>
      <T id="copyright" year={new Date().getFullYear()} />
    </CopyrightLayout>
  </FooterLayout>
);
