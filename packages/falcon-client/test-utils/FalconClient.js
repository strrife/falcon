import React from 'react';
import PropTypes from 'prop-types';
import { MockedProvider } from 'react-apollo/test-utils';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import MemoryRouter from 'react-router-dom/MemoryRouter';
import { I18nextProvider } from 'react-i18next';
import i18nFactory from './../src/i18n/__mocks__/i18nFactory';

/**
 * @typedef {Object} FalconClientProps
 * @property {Object} apollo react-apollo MockProvider props
 * @property {Object} router react-router-dom MemoryRouter props

 * @property {Object} i18next react-i18next I18nextProvider props
 */

/**
 * FalconClientMock wrapper component
 * @property {FalconClientProps} props props
 * @returns {{}} FalconClientMock component
 */
const FalconClient = ({ apollo, router, i18next, children }) => {
  const extractor = new ChunkExtractor({ stats: { namedChunkGroups: {} } });

  return (
    <MockedProvider mocks={[]} addTypename={false} {...apollo}>
      <ChunkExtractorManager extractor={extractor}>
        <MemoryRouter {...router}>
          <I18nextProvider i18n={i18nFactory()} {...i18next}>
            {children}
          </I18nextProvider>
        </MemoryRouter>
      </ChunkExtractorManager>
    </MockedProvider>
  );
};

FalconClient.propTypes = {
  children: PropTypes.node.isRequired,
  apollo: PropTypes.shape({
    mocks: PropTypes.array,
    addTypename: PropTypes.bool
  }),

  router: PropTypes.shape({
    initialEntries: PropTypes.array,
    initialIndex: PropTypes.number
  }),

  i18next: PropTypes.shape({
    i18n: PropTypes.shape({}),
    defaultNS: PropTypes.string,
    initialI18nStore: PropTypes.shape({}),
    initialLanguage: PropTypes.string
  })
};

FalconClient.defaultProps = {
  apollo: {},
  router: {},
  i18next: {}
};

export default FalconClient;
