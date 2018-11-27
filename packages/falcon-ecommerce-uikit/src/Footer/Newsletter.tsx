import React from 'react';
import { themed, H3, Text, Group, Input, Button, Checkbox, Label } from '@deity/falcon-ui';
import { T } from '../I18n';

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
  <T>
    {t => (
      <NewsletterLayout>
        <H3>{t('newsletter.title')}</H3>
        <Text>{t('newsletter.message')}</Text>

        <form>
          <Group>
            <Input
              type="email"
              required
              height="lg"
              aria-label={t('newsletter.emailPlaceholder')}
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
  </T>
);
