import React from "react"
import { Link } from "gatsby"

import limax from "limax"

const colorlist = ["primary", "link", "info", "success", "warning", "danger"]
const slugfunc = name => limax(name, { tone: false })
const hashfunc = s => {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}
const colorfunc = name => colorlist[hashfunc(name) % colorlist.length]

const Tag = ({ color, name, url }) => (
  <Link className={`tag is-rounded is-${color}`} to={url}>
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
          url={`/tags/${slugfunc(tag)}`}
        />
      ))}
    </div>
  )
}

export { Tag, TagList }
