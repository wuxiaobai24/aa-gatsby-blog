import React from "react"

import { Link } from "gatsby"

import { TagList } from "../components/tags"
import { slugfunc } from "./utils"
const PostHeader = ({ title, tags, date, slug, categories }) => {
  // const taglist = tags.map(tag => (
  //   <Link to={`/tags/${slugfunc(tag)}`} className="post-header-tagitem">
  //     {tag}
  //   </Link>
  // ))
  return (
    <div className="box is-primary">
      <div className="media"></div>
      <div className="level">
        <div className="level-left">
          <div className="level-item title">
            <Link to={slug} style={{ maxWidth: "800px" }}>{title}</Link>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item tags has-addons">
            <span className="tag is-dark">
              <Link to={`/category/${slugfunc(categories[0])}`} className="has-text-white">
                {categories}
              </Link>
            </span>
            <span className="tag is-primary">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="subtitle"></div>
      <TagList tags={tags} />
    </div>
  )
}

export default PostHeader;