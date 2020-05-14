import React, { Fragment } from "react"
import { Link } from "gatsby"
import "../style/style.css"

import MenuIcon from "../images/menu.svg"

const NavBar = ({ links }) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const linklist = links.map(({ url, name }) => {
    return (
      <li className="mr-3 pt-3 lg:pt-0" key={name}>
        <Link to={url}>{name}</Link>
      </li>
    )
  })
  return (
    <Fragment>
      <nav id="nav" className="relative max-w-4xl flex flex-wrap flex-col lg:flex-row item-center p-6 mx-auto max-w-3xl z-10 top-0 handing-font">
        <div className="flex justify-between items-center flex-shrink-0 mr-6 text-red-600">
          <Link to="/">Code & Fun</Link>
          {/* nav button */}
          <div className="block lg:hidden">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              type="button"
              className="flex items-center px-3 py-2 border rounded text-red-600 border-red-700"
            >
              {/* <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg> */}
              <MenuIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <ul className="mx-auto lg:mx-0 flex flex-col lg:flex-row list-none lg:ml-auto pl-0 text-center">
            {linklist}
          </ul>
        </div>
      </nav>
    </Fragment>
  )
}

export default NavBar
