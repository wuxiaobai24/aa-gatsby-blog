import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { PostList } from "../components/post-list"
import Pagination from "../components/pagination"


export default ({ data, pageContext }) => {
  const posts = data.allMdx.edges.map(({ node }) => {
    return {
      slug: node.fields.slug,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      excerpt: node.excerpt,
      tags: node.frontmatter.tags,
    }
  })
  // const posts = data.allMdx.edges.map(({ node }) => {
  //   const slug = node.fields.slug
  //   const title = node.frontmatter.title
  //   return (
  //     <Link className="card-item" key={slug} to={slug}>
  //       {title}
  //     </Link>
  //   )
  // })
  console.log(pageContext)
  const currentPage = pageContext.humanPageNumber
  const seoTitle = `${
    pageContext.tag ? "Tag " + pageContext.tag : "Archive"
  } #${currentPage} page`
  return (
    <Layout>
      <SEO title={seoTitle} description={seoTitle} />
      <div className="container">
        <PostList posts={posts} />
      </div>
      {/* pagniation */}
      <Pagination
        numberOfPages={pageContext.numberOfPages}
        nextPagePath={pageContext.nextPagePath}
        previousPagePath={pageContext.previousPagePath}
        pageNumber={currentPage}
      />
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
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
