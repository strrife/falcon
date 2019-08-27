import React from 'react';
import { BlogPostQuery } from '@deity/falcon-blog-data';
import { BlogPost } from '@deity/falcon-ecommerce-uikit';

const Post = ({ path }) => (
  <BlogPostQuery variables={{ path }}>{postProps => <BlogPost {...postProps} />}</BlogPostQuery>
);

export default Post;
