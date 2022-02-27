import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { PostList } from "../components/post-list"
import Pagination from "../components/pagination"

const BlogList = ({ data, pageContext }) => {
  const posts = data.allMdx.edges.map(({ node }) => {
    return {
      slug: node.fields.slug,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      excerpt: node.excerpt,
      tags: node.frontmatter.tags,
      categories: node.frontmatter.categories
    }
  })

  const currentPage = pageContext.humanPageNumber
  const seoTitle = `${
    pageContext.tag ? "Tag " + pageContext.tag : "Archive"
  } #${currentPage} page`
  return (
    <Layout>
      <Seo title={seoTitle} description={seoTitle} />
      <div className="container">
        <PostList posts={posts} />
        <Pagination
          numberOfPages={pageContext.numberOfPages}
          nextPagePath={pageContext.nextPagePath}
          previousPagePath={pageContext.previousPagePath}
          pageNumber={currentPage}
        />
      </div>
      {/* pagniation */}
    </Layout>
  )
}

export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fields: { source: { eq: "post" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
            categories
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
export default BlogList;