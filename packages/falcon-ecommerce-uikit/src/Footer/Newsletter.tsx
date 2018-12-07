import React from 'react';
import { H3, Text, Group, Input, Button, Checkbox, Label, Box, DefaultThemeProps } from '@deity/falcon-ui';
import { FooterTranslations } from './FooterQuery';

const newsletterLayoutTheme: DefaultThemeProps = {
  newsletterLayout: {
    bgFullWidth: 'secondaryLight',
    py: 'md',
    gridGap: 'sm',
    display: 'grid',
    gridTemplateColumns: '1fr',
    css: {
      maxWidth: 560,
      margin: '0 auto',
      textAlign: 'center'
    }
  }
};

export const Newsletter: React.SFC<{ translations: FooterTranslations }> = ({ translations: { newsletter } }) => (
  <Box defaultTheme={newsletterLayoutTheme}>
    <H3>{newsletter.title}</H3>
    <Text>{newsletter.message}</Text>

    <form>
      <Group>
        <Input
          aria-label={newsletter.emailPlaceholder}
          type="email"
          required
          height="lg"
          placeholder={newsletter.emailPlaceholder}
        />
        <Button height="lg" as="input" type="submit" value={newsletter.subscribe} flex="none" />
      </Group>
      <Label htmlFor="subscribe" my="sm" display="flex" justifyContent="center" alignItems="center">
        <Checkbox id="subscribe" required mr="xs" />
        {newsletter.consent}
      </Label>
    </form>
  </Box>
);
