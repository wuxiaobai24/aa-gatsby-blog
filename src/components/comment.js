import React from "react"
import { Disqus } from "gatsby-plugin-disqus"

export default ({ url, title, identifier, className }) => {
  const [loadDisqus, setLoadDisqus] = React.useState(false)

  return (
    <div className={className}>
      {loadDisqus ? (
        <Disqus config={{ url, title, identifier }} />
      ) : (
        <button
          className="button is-primary is-fullwidth outlined"
          onClick={() => setLoadDisqus(true)}
        >
          <span className="icon">
            <i className="far fa-comments" />
          </span>
          <span>Load Disqus Comment</span>
        </button>
      )}
    </div>
  )
}
