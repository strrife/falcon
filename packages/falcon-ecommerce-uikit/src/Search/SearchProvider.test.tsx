import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { SearchProvider, SORT_ORDERS_QUERY } from './SearchProvider';
import { SearchContext } from './SearchContext';
import { SearchState } from './index.d';
import { wait } from '../../../../test/helpers';

// custom serializing and deserializing go avoid problems when default implementation of those changes
const stateToUrl = (state: SearchState) => JSON.stringify(state);
const stateFromUrl = (url: string) => (url ? JSON.parse(url.replace('?', '')) : {});

const dataMocks = [
  {
    request: {
      query: SORT_ORDERS_QUERY
    },
    result: {
      data: {
        sortOrders: [
          {
            name: 'Price ascending',
            field: 'price',
            direction: 'asc'
          },
          {
            name: 'Price descending',
            field: 'price',
            direction: 'desc'
          }
        ]
      }
    }
  }
];

const renderSearchProvider = (content: any) =>
  mount(
    <MemoryRouter initialEntries={['/']}>
      <MockedProvider mocks={dataMocks} addTypename={false}>
        <Route>
          <SearchProvider searchStateFromURL={stateFromUrl} searchStateToURL={stateToUrl}>
            {content}
          </SearchProvider>
        </Route>
      </MockedProvider>
    </MemoryRouter>
  );

describe('SearchProvider', () => {
  let wrapper: ReactWrapper<any, any> | null;

  const getLocation = () => wrapper!.find(SearchProvider.WrappedComponent).props().location;
  const getSearchInfo = () => wrapper!.find(SearchProvider.WrappedComponent).state();

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it('should provide info about search via context', async () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    await wait(0);

    expect(searchInfo.state.filters).toBeArray; // eslint-disable-line no-unused-expressions
  });

  it('setFilter() should update url and pass new filter value in props', async () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    // wait for Query to return the result
    await wait(0);

    searchInfo.setFilter('price', ['10']);
    wrapper.update();
    expect(searchInfo.state.filters).toHaveLength(1);
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('removeFiler() should update url and remove filter value from passed props', async () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    // wait for Query to return the result
    await wait(0);

    searchInfo.setFilter('price', ['10']);
    searchInfo.removeFilter('price');
    wrapper.update();
    expect(searchInfo.state.filters).toHaveLength(0);
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('setQuery() should update url and pass query in props', async () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    // wait for Query to return the result
    await wait(0);

    searchInfo.setQuery('searchQuery');
    searchInfo.removeFilter('price');
    wrapper.update();
    expect(searchInfo.state.query).toEqual('searchQuery');
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('setSortOrder() should update url and pass order in props', async () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    // wait for Query to return the result
    await wait(0);

    searchInfo.setSortOrder({ field: 'price', direction: 'asc' });
    wrapper.update();
    // name: 'Price ascending' should be added as value passed to setSortOrder is matched with value from
    // sortOrders property passed to SearchProvider (from Query or via prop directly)
    expect(searchInfo.state.sort).toEqual({ field: 'price', direction: 'asc', name: 'Price ascending' });
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('setPagination() should update url and pass pagination in props', async () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    // wait for Query to return the result
    await wait(0);

    searchInfo.setPagination({ page: 1, perPage: 10 });
    wrapper.update();
    expect(searchInfo.state.pagination).toEqual({ page: 1, perPage: 10 });
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('history change should trigger update of search state', async () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    // wait for Query to return the result
    await wait(0);

    const { history } = wrapper.find(SearchProvider.WrappedComponent).props();
    history.push('/?{"query":"foo"}');
    wrapper.update();
    expect(searchInfo.state.query).toEqual('foo');
  });
});
