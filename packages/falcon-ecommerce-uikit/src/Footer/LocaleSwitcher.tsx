import React from 'react';
import { Box, DefaultThemeProps, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';
import { T, I18n } from '@deity/falcon-i18n';
import { BackendConfigQuery, SetLocaleMutation } from '../BackendConfig';

const languageSectionTheme: DefaultThemeProps = {
  languageSection: {
    bgFullWidth: 'secondaryLight',
    py: 'md',
    css: {
      maxWidth: 160,
      margin: '0 auto',
      zIndex: 2
    }
  }
};

export type LocaleItem = {
  code: string;
  name: string;
};

type LocaleSwitcherDropdownProps = {
  items: LocaleItem[];
  value: LocaleItem;
  onChange?: (x: LocaleItem) => any;
};

export const LocaleSwitcherDropdown: React.SFC<LocaleSwitcherDropdownProps> = ({ items, value, onChange }) => (
  <Dropdown onChange={onChange}>
    <DropdownLabel>{value.name}</DropdownLabel>
    <DropdownMenu variant="above">
      {items.map(x => (
        <DropdownMenuItem key={x.code} value={x}>
          {x.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

export const addCIModeLocale = (locales: LocaleItem[]) => {
  if (process.env.NODE_ENV === 'development') {
    if (!locales.find(x => x.code === 'cimode')) {
      locales.unshift({ code: 'cimode', name: 'CI mode' });
    }
  }

  return locales;
};

export const LocaleSwitcher: React.SFC = () => (
  <I18n>
    {(t, i18n) => (
      <SetLocaleMutation>
        {setLocale => (
          <BackendConfigQuery passLoading>
            {({ backendConfig: { locales, activeLocale } }) => (
              <Box defaultTheme={languageSectionTheme}>
                <LocaleSwitcherDropdown
                  items={addCIModeLocale(locales.map(x => ({ code: x, name: t(`languages.${x}`) })))}
                  value={{ code: activeLocale, name: t(`languages.${activeLocale}`) }}
                  onChange={x => {
                    setLocale({ variables: { locale: x.code } }).then(({ data }: any) => {
                      i18n.changeLanguage(data.setLocale.activeLocale);
                    });
                  }}
                />
              </Box>
            )}
          </BackendConfigQuery>
        )}
      </SetLocaleMutation>
    )}
  </I18n>
);
