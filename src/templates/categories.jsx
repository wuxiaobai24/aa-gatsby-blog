import React from "react"
import PropTypes from "prop-types"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const categoriyHeader = `${totalCount} post ${
    totalCount === 1 ? "" : "s"
  } categoried with #${category}`
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
      <h1>{categoriyHeader}</h1>
      <ul>{posts}</ul>
      <Link to="/categories/">All Categories</Link>
    </Layout>
  )
}

Categories.propTypes = {
  pageContext: PropTypes.shape({
    categoriy: PropTypes.string.isRequired,
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

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
