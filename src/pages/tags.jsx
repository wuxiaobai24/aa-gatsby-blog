import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { TagList } from "../components/tags"

const Tags =  ({ data }) => {
  // const slugFunc = tag => limax(tag, { tone: false })
  // const tags = data.allMdx.tags.map(({ fieldValue, totalCount }) => {
  //   const slug = slugFunc(fieldValue)
  //   return (
  //     <Link to={`/tags/${slug}`} className="post-header-tagitem" key={slug}>
  //       {fieldValue}
  //     </Link>
  //   )
  // })
  const tags = data.allMdx.tags.map(({ fieldValue }) => fieldValue)
  return (
    <Layout>
      <Seo title="Tags" />
      {/* <div className="post-header-tags">{tags}</div> */}

      <div className="box">
        <TagList tags={tags} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx(filter: { fields: { source: { eq: "post" } } }) {
      tags: group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
export default Tags;