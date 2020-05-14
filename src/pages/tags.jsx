import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import limax from "limax"

export default ({ data }) => {
  const slugFunc = tag => limax(tag, { tone: false })
  const tags = data.allMdx.tags.map(({ fieldValue, totalCount }) => {
    const slug = slugFunc(fieldValue)
    return (
      <Link to={`/tags/${slug}`} className="card-item" key={slug}>
        {fieldValue}
      </Link>
    )
  })
  return (
    <Layout>
      <SEO title="Tags" />
      <div className="card-container">{tags}</div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx {
      tags: group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
