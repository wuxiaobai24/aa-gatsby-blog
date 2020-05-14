import React from "react"

import limax from "limax"
import { Link } from "gatsby"

export default ({ title, tags, date, slug }) => {
  const slugfunc = slug => limax(slug, { tone: false })
  const taglist = tags.map(tag => (
    <Link to={`/tags/${slugfunc(tag)}`} className="post-header-tagitem">{tag}</Link>
  ))
  console.log(tags)
  console.log(taglist)
  return (
    <div className="post-header">
      <div className="post-header-title">
        <Link to={slug}>{title}</Link>
      </div>
			<div className="post-header-info">
				<div className="post-header-date">{date}</div>
			<div className="post-header-tags">{taglist}</div>
			</div>
      
    </div>
  )
}
