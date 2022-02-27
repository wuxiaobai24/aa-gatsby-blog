import React from "react"
import Avatar from "../avatar"
import Icon from "../icon"

const author =  () => {
  const socials = [
    { icon: "fab fa-lg fa-github", url: "https://github.com/wuxiaobai24" },
    { icon: "fas fa-lg fa-envelope-open", url: "wuxiaobai24:wuxiaobai24@foxmail.com" },
    { icon: "fas fa-lg fa-rss", url: "https://codeand.fun/rss.xml" },
  ]
  return (
    <div>
      <Avatar />
      <div className="level mt-3">
        {socials.map(({icon, url}) => (
          <div className="level-item">
            <a href={url}>
              <Icon icon={icon} iconClassName={"has-text-black"} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
export default author;