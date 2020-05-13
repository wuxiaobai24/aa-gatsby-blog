import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import limax from "limax"

export default ({ data }) => {
	console.log(data)
  const slugFunc = category => limax(category, { tone: false })
  const categories = data.allMarkdownRemark.categories.map(({ fieldValue, totalCount }) => {
    const slug = slugFunc(fieldValue)
    return (
      <div className="block-inline m-4 bg-blue-300" key={slug}>
        <Link to={`/categories/${slug}`} className="p-2">
          {totalCount} - {fieldValue}
        </Link>
      </div>
    )
  })
  return (
    <Layout>
      <SEO title="Categories" />
			<div className="p-8 bg-blue-100">{categories}</div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      categories: group(field: frontmatter___categories) {
				fieldValue
				totalCount
			}
    }
  }
`