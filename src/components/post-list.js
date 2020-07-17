import React from "react"
import { TagList } from "./tags"
import { Link } from "gatsby"

const PostItem = ({ slug, title, date, excerpt, tags }) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p className="title">{title}</p>

            <p className="subtitle">{new Date(date).toLocaleDateString()}</p>

            <div>
              <p>{excerpt}</p>
            </div>
            <div className="level mt-2">
              <div className="level-left">
                <div className="level-item">
                  <TagList tags={tags} />
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <Link
                    to={slug}
                    className="button is-primary is-small is-outlined rounded"
                  >
                    {/* <Link to={slug}>Read More</Link> */}
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

const PostList = ({ posts }) => {
  return posts.map(({ slug, title, date, excerpt, tags }) => (
    <PostItem
      key={slug}
      slug={slug}
      title={title}
      date={date}
      excerpt={excerpt}
      tags={tags}
    />
  ))
}

export { PostItem, PostList }
