import React from "react"
import { Link } from "gatsby"
import "../style/style.scss"

// import MenuIcon from "../images/menu.svg"
// import { PresignedPost } from "aws-sdk/clients/s3"

const NavbarItem = ({ url, children }) => (
  <Link to={url} className="navbar-item is-capitalize">
    {children}
  </Link>
)

const NavbarBurger = ({ isActive, toggleMenu }) => (
  <button
    onClick={toggleMenu}
    className={`button navbar-burger mt-2 mr-2 ${isActive ? "is-active" : ""}`}
  >
    <span />
    <span />
    <span />
  </button>
)

const NavBar = ({ links }) => {
  const [isActive, setIsActive] = React.useState(false)
  const linklist = links.map(({ url, name }) => (
    <NavbarItem url={url} key={url}>
      {name}
    </NavbarItem>
  ))
  return (
    <nav className="navbar is-space">
      <div className="navbar-brand">
        <NavbarItem url="/">
          <span
            className="is-size-1"
            style={{ fontFamily: "Annie Use Your Telescope" }}
          >
            CODE & FUN
          </span>
        </NavbarItem>
        <NavbarBurger
          isActive={isActive}
          toggleMenu={() => setIsActive(!isActive)}
        />
      </div>
      <div className={`navbar-menu  ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">{linklist}</div>
      </div>
    </nav>
  )
}

export default NavBar
