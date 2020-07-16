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

            <p className="subtitle">{date}</p>

            <div>
              <p>{excerpt}</p>
            </div>
            <div className="level">
              <div className="level-left">
                <TagList tags={tags} />
              </div>
              <div className="level-right">
                <Link to={slug} className="button is-primary is-small is-outlined rounded">
                  {/* <Link to={slug}>Read More</Link> */}
									Read More
                </Link>
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
