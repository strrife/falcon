import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { H4, Link, List, ListItem, Box, DefaultThemeProps } from '@deity/falcon-ui';
import { T, I18n } from '@deity/falcon-i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { FooterData } from './FooterQuery';
import { Newsletter } from './Newsletter';
import { MenuItem } from '../Header';

const footerLayoutTheme: DefaultThemeProps = {
  footerLayout: {
    mt: 'md'
  }
};

const copyrightLayoutTheme: DefaultThemeProps = {
  copyrightLayout: {
    p: 'sm',
    color: 'secondaryText',
    bgFullWidth: 'secondary',
    css: {
      textAlign: 'center'
    }
  }
};

const footerSectionsTheme: DefaultThemeProps = {
  footerSectionLayout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
    gridGap: 'sm',
    bgFullWidth: 'secondaryLight',
    py: 'sm',
    px: {
      xs: 'md',
      md: 'xl'
    },
    css: {
      margin: 'auto',
      maxWidth: 1280,
      justifyItems: {
        xs: 'flex-start'
      }
    }
  }
};

export const FooterSections: React.SFC<{ sections: MenuItem[] }> = ({ sections }) => (
  <Box defaultTheme={footerSectionsTheme}>
    {sections.map(section => (
      <Box key={section.name} css={{ minWidth: 200 }}>
        <H4 fontWeight="demiBold">{section.name}</H4>
        <List>
          {section.children.map(item => (
            <ListItem fontSize="xs" py="xs" key={item.name}>
              <Link as={RouterLink} to={item.url}>
                {item.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    ))}
  </Box>
);

const languageSectionTheme: DefaultThemeProps = {
  languageSection: {
    bgFullWidth: 'secondaryLight',
    py: 'md',
    fontSize: 'xs',
    css: {
      maxWidth: 160,
      margin: '0 auto',
      textAlign: 'center',
      zIndex: 2
    }
  }
};

export const Footer: React.SFC<FooterData> = ({
  config: {
    menus: { footer },
    languages
  }
}) => (
  <Box as="footer" defaultTheme={footerLayoutTheme}>
    <Newsletter />
    <FooterSections sections={footer} />
    <Box defaultTheme={languageSectionTheme}>
      <I18n>
        {(_t, i18n) => <LanguageSwitcher languages={languages} onChange={x => i18n.changeLanguage(x.code)} />}
      </I18n>
    </Box>
    <Box defaultTheme={copyrightLayoutTheme}>
      <T id="copyright" year={new Date().getFullYear()} />
    </Box>
  </Box>
);
