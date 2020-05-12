import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

export default ({ data }) => {
  const list = data.allMarkdownRemark.edges.map(({ node }) => {
    return (
      <div className="text-center pb-2">
        <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
      </div>
    )
  })
  return (
    <Layout>
      <SEO title="Archive" />
      <div className="container mx-auto p-4">
        <div className="flex flex-col p-4">{list}</div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
