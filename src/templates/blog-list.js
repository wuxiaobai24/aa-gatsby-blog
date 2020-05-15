import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, pageContext }) => {
  const posts = data.allMdx.edges.map(({ node }) => {
    const slug = node.fields.slug
    const title = node.frontmatter.title
    return (
      <Link
        className="card-item"
        key={slug}
        to={slug}
      >
        {title}
      </Link>
    )
  })
  const { currentPage } = pageContext

  return (
    <Layout>
      <SEO title={`archive #${currentPage} page`} />
      <div className="card-container">{posts}</div>
      {/* pagniation */}
      <div className="flex flex-center justify-between mx-auto">
        <Link
          className={
            "text-center border border-red-600 hover:bg-yellow-200 w-20 h-10 p-2 rounded handing-font" +
            (pageContext.previousPagePath ? "" : " hidden")
          }
          to={pageContext.previousPagePath}
        >
          Prev
        </Link>
        <div className="w-20 h-10 p-2"></div>
        <Link
          className={
            "text-center border border-red-600 hover:bg-yellow-200 w-20 h-10 p-2 rounded handing-font" +
            (pageContext.nextPagePath ? "" : " hidden")
          }
          to={pageContext.nextPagePath}
        >
          Next
        </Link>
      </div>
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
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
