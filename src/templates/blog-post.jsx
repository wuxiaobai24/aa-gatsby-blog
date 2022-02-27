import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import MdXLayout from "../components/mdx-layout"
import PostHeader from "../components/post-header"
import Comment from "../components/comment"

import "katex/dist/katex.min.css"

export default function BlogPost({ data }) {
  const post = data.mdx
  const { title, tags, date, excerpt, categories } = post.frontmatter
  const slug = post.fields.slug
  const url = data.site.siteMetadata.siteUrl + slug

  return (
    <Layout>
      <Seo title={title} description={excerpt} />
      <div className="container">
        <PostHeader
          className="box"
          date={date}
          title={title}
          tags={tags}
          slug={slug}
          categories={categories}
        />
        <div className="box">
          <div className="content">
            <MdXLayout>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MdXLayout>
            <blockquote cite={url}>
              <p>
                作者：<a href="https://github.com/wuxiaobai24">wuxiaobai24</a>
              </p>
              <p>发表日期：{new Date(date).toLocaleDateString()}</p>
              <p>
                本文首发地址：<a href={url}>{title}</a>
              </p>
              <p>
                版权声明：
                <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                  CC BY NC SA 4.0
                </a>
              </p>
            </blockquote>
          </div>
        </div>
        <Comment
          className="container"
          url={url}
          title={title}
          identifier={slug}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 100)
      frontmatter {
        title
        tags
        date
        categories
      }
      fields {
        slug
      }
    }
  }
`
