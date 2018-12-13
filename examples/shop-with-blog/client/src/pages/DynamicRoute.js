import React from 'react';
import DynamicRoute from '@deity/falcon-client/src/components/DynamicRoute';
import { Loader } from '@deity/falcon-ecommerce-uikit';
import AsyncComponent from 'src/components/Async';

const BlogPost = AsyncComponent(() => import(/* webpackChunkName: "blog/post" */ './blog/Post'));
const Category = AsyncComponent(() => import(/* webpackChunkName: "shop/category" */ './shop/Category'));
const Product = AsyncComponent(() => import(/* webpackChunkName: "shop/product" */ './shop/Product'));

export default props => (
  <DynamicRoute
    {...props}
    loaderComponent={Loader}
    components={{
      'blog-post': BlogPost,
      'shop-category': Category,
      'shop-product': Product
    }}
  />
);
