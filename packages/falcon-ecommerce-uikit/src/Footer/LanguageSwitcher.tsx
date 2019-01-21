import React from 'react';
import { Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem } from '@deity/falcon-ui';
import { LanguageItem } from './FooterQuery';

const addCIModeLanguage = (languages: LanguageItem[]) => {
  if (process.env.NODE_ENV === 'development') {
    if (!languages.find(x => x.code === 'cimode')) {
      languages.unshift({ code: 'cimode', name: 'CI mode', active: false });
    }
  }

  return languages;
};

type LanguageSwitcherProps = {
  languages: LanguageItem[];
  onChange?: (x: LanguageItem) => any;
};

export const LanguageSwitcher: React.SFC<LanguageSwitcherProps> = ({ languages, onChange }) => {
  languages = addCIModeLanguage(languages);
  const activeLanguage = languages.filter(lang => lang.active)[0];

  return (
    <Dropdown onChange={onChange}>
      <DropdownLabel css={{ textAlign: 'left' }}>{activeLanguage.name}</DropdownLabel>

      <DropdownMenu variant="above">
        {languages.map(lang => (
          <DropdownMenuItem key={lang.code} value={lang}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
