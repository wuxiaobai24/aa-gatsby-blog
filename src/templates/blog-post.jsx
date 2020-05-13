import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import "katex/dist/katex.min.css"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
