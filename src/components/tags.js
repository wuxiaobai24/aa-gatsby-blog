import React from "react"
import { Link } from "gatsby"

import { slugfunc, colorfunc } from "./utils"

const Tag = ({ color, name, url }) => (
  <Link className={`tag is-rounded is-${color} is`} to={url}>
    {name}
  </Link>
)

const TagList = ({ tags }) => {
  return (
    <div className="tags">
      {tags.map(tag => (
        <Tag
          key={tag}
          color={colorfunc(tag)}
          name={tag}
          url={`/tag/${slugfunc(tag)}`}
        />
      ))}
    </div>
  )
}

export { Tag, TagList }
