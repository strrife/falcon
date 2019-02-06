import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchProvider } from './SearchProvider';
import { SearchContext } from './SearchContext';

// custom serializing and deserializing go avoid problems when default implementation of those changes
const stateToUrl = state => JSON.stringify(state);
const stateFromUrl = url => (url ? JSON.parse(url.replace('?', '')) : {});

const renderSearchProvider = (content: any, mocks: any = {}) =>
  mount(
    <MemoryRouter initialEntries={['/']}>
      <Route>
        <SearchProvider searchStateFromURL={stateFromUrl} searchStateToURL={stateToUrl}>
          {content}
        </SearchProvider>
      </Route>
    </MemoryRouter>
  );

describe('SearchProvider', () => {
  let wrapper: ReactWrapper<any, any> | null;

  const getLocation = () => wrapper.find(SearchProvider.WrappedComponent).props().location;
  const getSearchInfo = () => wrapper.find(SearchProvider.WrappedComponent).state();

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it('should provide info about search via context', () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    expect(searchInfo.state.filters).toBeArray; // eslint-disable-line no-unused-expressions
  });

  it('setFilter() should update url and pass new filter value in props', () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    searchInfo.setFilter('price', ['10']);
    wrapper.update();
    expect(searchInfo.state.filters).toHaveLength(1);
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('removeFiler() should update url and remove filter value from passed props', () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    searchInfo.setFilter('price', ['10']);
    searchInfo.removeFilter('price');
    wrapper.update();
    expect(searchInfo.state.filters).toHaveLength(0);
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('setQuery() should update url and pass query in props', () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    searchInfo.setQuery('searchQuery');
    searchInfo.removeFilter('price');
    wrapper.update();
    expect(searchInfo.state.query).toEqual('searchQuery');
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('setSortOrder() should update url and pass order in props', () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    searchInfo.setSortOrder({ field: 'price', direction: 'asc' });
    wrapper.update();
    expect(searchInfo.state.sort).toEqual({ field: 'price', direction: 'asc' });
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('setPagination() should update url and pass pagination in props', () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    searchInfo.setPagination({ page: 1, perPage: 10 });
    wrapper.update();
    expect(searchInfo.state.pagination).toEqual({ page: 1, perPage: 10 });
    expect(getLocation().search).toEqual(`?${JSON.stringify(getSearchInfo())}`);
  });

  it('history change should trigger update of search state', () => {
    let searchInfo;

    wrapper = renderSearchProvider(
      <SearchContext.Consumer>
        {search => {
          searchInfo = search;
          return <div />;
        }}
      </SearchContext.Consumer>
    );

    const { history } = wrapper.find(SearchProvider.WrappedComponent).props();
    history.push('/?{"query":"foo"}');
    wrapper.update();
    expect(searchInfo.state.query).toEqual('foo');
  });
});
