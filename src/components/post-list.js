import React from "react"
import { TagList } from "./tags"
import { Link } from "gatsby"
import { slugfunc } from "./utils"

const PostItem = ({ slug, title, date, excerpt, tags, categories }) => {
  console.log(categories)
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <div className="level">
              <div className="level-left">
                <div className="level-item title">{title}</div>
              </div>
              <div className="level-right">
                <div className="level-right">
                  <div className="level-item tags has-addons">
                    <span className="tag is-light">
                      <Link to={`/category/${slugfunc(categories[0])}`}>
                        {categories}
                      </Link>
                    </span>
                    <span className="tag is-primary">
                      {new Date(date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

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
  return posts.map(({ slug, title, date, excerpt, tags, categories }) => (
    <PostItem
      key={slug}
      slug={slug}
      title={title}
      date={date}
      excerpt={excerpt}
      tags={tags}
      categories={categories}
    />
  ))
}

export { PostItem, PostList }
