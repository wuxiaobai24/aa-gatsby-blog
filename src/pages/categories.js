import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import limax from "limax"

export default ({ data }) => {
  const slugFunc = category => limax(category, { tone: false })
  const categories = data.allMdx.categories.map(
    ({ fieldValue, totalCount }) => {
      const slug = slugFunc(fieldValue)
      return (
        <Link to={`/categories/${slug}`} className="card-item" key={slug}>
          {totalCount} - {fieldValue}
        </Link>
      )
    }
  )
  return (
    <Layout>
      <SEO title="Categories" />
      <div className="card-container">{categories}</div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx {
      categories: group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
