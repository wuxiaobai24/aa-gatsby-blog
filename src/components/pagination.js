import React from "react"
import { Link } from "gatsby"

const Pagination = ({
  numberOfPages,
  nextPagePath,
  previousPagePath,
  pageNumber,
}) => {
  return (
      <nav
        className="pagination is-centered mt-2"
        role="navigation"
        aria-label="pagination"
      >
        <Link className="pagination-previous" to={previousPagePath}
					disabled={previousPagePath===""}
				>
          <span className="icon">
						<i className="fas fa-arrow-left"></i>
					</span>
        </Link>
        <Link className="pagination-next" to={nextPagePath}
						disabled={nextPagePath===""}
				>
          <span className="icon">
						<i className="fas fa-arrow-right"></i>
					</span>
        </Link>



      </nav>
  )
}

export default Pagination
