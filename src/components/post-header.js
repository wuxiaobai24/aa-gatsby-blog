import React from "react"

import { Link } from "gatsby"

import { TagList } from "../components/tags"

export default ({ title, tags, date, slug }) => {
  // const taglist = tags.map(tag => (
  //   <Link to={`/tags/${slugfunc(tag)}`} className="post-header-tagitem">
  //     {tag}
  //   </Link>
  // ))
  return (
    <div className="box is-primary">
      <div className="media"></div>
      <div className="title">
        <Link to={slug}>{title}</Link>
      </div>
      <div className="subtitle">
        <div className="post-header-date">{date}</div>
      </div>
      <TagList tags={tags} />
    </div>
  )
}
