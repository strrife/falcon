import React from 'react';
import { T } from '@deity/falcon-i18n';
import { BlogPostListQuery } from '@deity/falcon-blog-data';
import { Breadcrumbs, ListItem } from '@deity/falcon-ui';
import { BreadcrumbLink, BlogPostListLayout, BlogPostExcerpt, PageLayout } from '@deity/falcon-ui-kit';
import { BlogPostsPaginator } from '@deity/falcon-ecommerce-uikit';

const Blog = ({ match }) => {
  const { params } = match;

  return (
    <PageLayout as="section">
      <Breadcrumbs alignSelf="flex-start">
        <BreadcrumbLink to="/">
          <T id="name" />
        </BreadcrumbLink>
        <BreadcrumbLink to="/blog">
          <T id="blog.title" />
        </BreadcrumbLink>
      </Breadcrumbs>

      <BlogPostListQuery variables={{ pagination: { page: +params.page || 1 } }}>
        {({ blogPostList: { items, pagination } }) => (
          <React.Fragment>
            <BlogPostListLayout>
              {items.map((x, index) => (
                <ListItem key={x.slug} gridColumn={index < 2 ? 'span 3' : 'span 2'}>
                  <BlogPostExcerpt title={x.title} slug={x.slug} date={x.date} image={x.image} excerpt={x.excerpt} />
                </ListItem>
              ))}
            </BlogPostListLayout>
            <BlogPostsPaginator pagination={pagination} />
          </React.Fragment>
        )}
      </BlogPostListQuery>
    </PageLayout>
  );
};

export default Blog;
