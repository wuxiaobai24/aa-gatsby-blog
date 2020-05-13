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
      <div className="block-inline m-4 bg-blue-300" key={slug}>
        <Link to={`/tags/${slug}`} className="p-2">
          {totalCount} - {fieldValue}
        </Link>
      </div>
    )
  })
  return (
    <Layout>
      <SEO title="Tags" />
			<div className="p-8 bg-blue-100">{tags}</div>
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
