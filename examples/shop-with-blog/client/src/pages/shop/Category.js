import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CategoryProductsQuery, Category, Query } from '@deity/falcon-ecommerce-uikit';

const sortOrdersQuery = gql`
  query {
    sortOrders @client
  }
`;

class SortOrdersProvider extends React.Component {
  state = {
    active: null
  };

  setSortOrder = active => this.setState({ active });

  render() {
    return (
      <Query query={sortOrdersQuery}>
        {({ sortOrders }) =>
          this.props.children({
            availableSortOrders: sortOrders,
            activeSortOrder: this.state.active || sortOrders[0],
            setSortOrder: this.setSortOrder
          })
        }
      </Query>
    );
  }
}

const CategoryPage = ({ id }) => (
  <SortOrdersProvider>
    {({ availableSortOrders, activeSortOrder, setSortOrder }) => (
      <CategoryProductsQuery
        variables={{
          categoryId: id,
          sort: {
            field: activeSortOrder.field,
            direction: activeSortOrder.direction
          }
        }}
      >
        {categoryProps => (
          <Category
            {...categoryProps}
            availableSortOrders={availableSortOrders}
            activeSortOrder={activeSortOrder}
            setSortOrder={setSortOrder}
          />
        )}
      </CategoryProductsQuery>
    )}
  </SortOrdersProvider>
);

CategoryPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default CategoryPage;
