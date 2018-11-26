import React from 'react';
import { NamespacesConsumer } from 'react-i18next-with-context';
import { themed, H3, Text, Group, Input, Button, Checkbox, Label, Box, DefaultThemeProps } from '@deity/falcon-ui';

export const NewsletterLayout = themed({
  tag: 'div',
  defaultProps: {
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
});

export const Newsletter: React.SFC<{}> = () => (
  <NamespacesConsumer ns="common">
    {t => (
      <NewsletterLayout>
        <H3>{t('newsletter.title')}</H3>
        <Text>{t('newsletter.message')}</Text>

        <form>
          <Group>
            <Input
              aria-label={t('newsletter.emailPlaceholder')}
              type="email"
              required
              height="lg"
              placeholder={t('newsletter.emailPlaceholder')}
            />
            <Button as="input" type="submit" value={t('newsletter.subscribe')} flex="none" />
          </Group>
          <Label htmlFor="subscribe" my="sm" display="flex" justifyContent="center" alignItems="center">
            <Checkbox id="subscribe" required mr="xs" /> {t('newsletter.consent')}
          </Label>
        </form>
      </NewsletterLayout>
    )}
  </NamespacesConsumer>
);
