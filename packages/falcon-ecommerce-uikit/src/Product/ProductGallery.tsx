import React from 'react';
import { NamespacesConsumer } from 'react-i18next-with-context';
import { Text, Image, themed, Swipeable, SwipeableItem, Box } from '@deity/falcon-ui';
import { ProductTranslations } from './ProductQuery';

type Item = {
  thumbnail: string;
  full: string;
};

const ProductGalleryLayout = themed({
  tag: 'div',

  defaultTheme: {
    productGalleryLayout: {
      display: 'grid',

      gridTemplateColumns: {
        xs: '1fr',
        md: '100px 1fr'
      },

      gridTemplateAreas: {
        xs: '"full" "thumbs"',
        md: '"thumbs full"'
      }
    }
  }
});

export class ProductGallery extends React.Component<{ items: Item[]; translations: ProductTranslations }> {
  state = {
    activeIndex: 0
  };

  scrollToItem = (index: number) => () => {
    this.setState({
      activeIndex: index
    });

    if (this.scrollableEl.current) {
      this.scrollableEl.current.scrollLeft = index * this.scrollableEl.current.clientWidth;
    }
  };

  scrollableEl = React.createRef<HTMLDivElement>();

  render() {
    const { items } = this.props;

    if (!items.length) {
      return <NoProductImage />;
    }

    if (items.length === 1) {
      return (
        <NamespacesConsumer ns="shop">
          {t => <Image src={items[0].full} alt={t('productGallery.imageAlt')} />}
        </NamespacesConsumer>
      );
    }

    const { activeIndex } = this.state;

    return (
      <NamespacesConsumer ns="shop">
        {t => (
          <ProductGalleryLayout>
            <Box gridArea="thumbs">
              {items.map((item, index) => (
                <Box
                  onClick={this.scrollToItem(index)}
                  key={item.full}
                  border="regular"
                  borderRadius="medium"
                  borderColor={index === activeIndex ? 'primary' : 'secondary'}
                  display={{
                    xs: 'inline-flex',
                    md: 'block'
                  }}
                  mt="md"
                  mr={{
                    xs: 'sm',
                    md: 'none'
                  }}
                  p="xs"
                  css={{
                    cursor: 'pointer',
                    height: {
                      xs: 70,
                      md: 'auto'
                    },
                    width: {
                      xs: 70,
                      md: 'auto'
                    }
                  }}
                >
                  <Image key={item.thumbnail} src={item.thumbnail} alt={t('productGallery.imageAlt')} />
                </Box>
              ))}
            </Box>

            <Swipeable gridArea="full" ref={this.scrollableEl} alignItems="center">
              {items.map(item => (
                <SwipeableItem key={item.full} as={Image} src={item.full} alt={t('productGallery.imageAlt')} />
              ))}
            </Swipeable>
          </ProductGalleryLayout>
        )}
      </NamespacesConsumer>
    );
  }
}

export const NoProductImage = () => (
  <Text>
    <NamespacesConsumer ns="shop">{t => t('productGallery.noImage')}</NamespacesConsumer>
  </Text>
);
