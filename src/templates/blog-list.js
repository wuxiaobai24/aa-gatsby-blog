import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, pageContext }) => {
  const posts = data.allMdx.edges.map(({ node }) => {
    const slug = node.fields.slug
    const title = node.frontmatter.title
    return (
      <div className="block-inline m-4 bg-blue-300" key={slug}>
        <Link to={slug} className="p-2">
          {title}
        </Link>
      </div>
    )
  })
  const { currentPage } = pageContext

  return (
    <Layout>
      <SEO title={`archive #${currentPage} page`} />
      <div className="flex flex-col p-4">{posts}</div>
      {/* {data.allMdx.edges.map(edge => <PostItem item={edge.node} />)} */}
      <div className="grid grid-col-3 grid-row-1">
        {pageContext.previousPagePath && (
          <div className="col-start-1 col-end-2 text-center">
            <Link to={pageContext.previousPagePath}>Prev</Link>
          </div>
        )}
        {pageContext.nextPagePath && (
          <div className="col-start-3 col-end-4 text-center">
            <Link to={pageContext.nextPagePath}>Next</Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
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
          }
        }
      }
    }
  }
`
