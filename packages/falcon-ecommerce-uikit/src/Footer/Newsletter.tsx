import React from 'react';
import { themed, H3, Text, Group, Input, Button, Checkbox, Label } from '@deity/falcon-ui';
import { T, I18n } from '@deity/falcon-i18n';

export const NewsletterLayout = themed({
  tag: 'div',
  defaultProps: {
    bgFullWidth: 'secondaryLight',
    py: 'xl',
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
  <NewsletterLayout>
    <H3 fontWeight="demiBold">
      <T id="newsletter.title" />
    </H3>
    <Text fontSize="xs">
      <T id="newsletter.message" />
    </Text>
    <I18n>
      {t => (
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
          <Label htmlFor="subscribe" my="sm" display="flex" justifyContent="center" alignItems="center" fontSize="xxs">
            <Checkbox id="subscribe" required mr="xs" width="sm" height="sm" /> {t('newsletter.consent')}
          </Label>
        </form>
      )}
    </I18n>
  </NewsletterLayout>
);
