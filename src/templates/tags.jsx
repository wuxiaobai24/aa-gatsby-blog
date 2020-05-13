import React from "react"
import PropTypes from "prop-types"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post ${
    totalCount === 1 ? "" : "s"
  } tagged with #${tag}`
  const posts = edges.map(({ node }) => {
    const { slug } = node.fields
    const { title } = node.frontmatter
    return (
      <li key={slug}>
        <Link to={slug}>{title}</Link>
      </li>
    )
  })
  return (
    <Layout>
      <h1>{tagHeader}</h1>
      <ul>{posts}</ul>
      <Link to="/tags/">All Tags</Link>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          html
          timeToRead
          wordCount {
            words
            sentences
            paragraphs
          }
          id
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
