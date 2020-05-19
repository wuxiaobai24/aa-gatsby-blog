import React, { useState, useEffect } from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"

import axios from "axios"

import StarIcon from "../images/star.svg"
import YellowStarIcon from "../images/yellow-star.svg"

const StarRating = ({ rating }) => {
  const arr = Array(rating.max).fill(true).fill(false, parseInt(rating.value))
  return (
    <div className="inline-block">
      {arr.map((flag,index) =>
        flag ? (
          <YellowStarIcon className="inline w-5 h-5" key={index} />
        ) : (
          <StarIcon className="inline w-5 h-5" />
        )
      )}
    </div>
  )
}

export default () => {
  const count = 10
  const user = "132926767"
  const [start, setStart] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [bookStatus, setBookStatus] = useState("all")
  const [books, setBooks] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const fetchBooks = () => {
    const urls = `https://douban-api.uieee.com/v2/book/user/${user}/collections?count=${count}&start=${start}`
    setIsLoading(true)
    axios
      .get(urls)
      .then(({ data }) => {
        
        setStart(start + data.collections.length)
        setBooks(books.concat(data.collections))
        setIsLoading(false)
        if (data.total !== totalCount) {
          setTotalCount(data.total)
        }
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const filteredBook = books.filter(({ status }) => {
    return bookStatus === "all" || bookStatus === status
  })

  return (
    <Layout>
      <SEO
        title="Bookshelf"
        description="wuxiaobai24's bookshelf"
        meta={[{ name: "referrer", content: "never" }]}
      />

      <div className="flex flex-col">
        <div className="px-3 mx-3">
          <h2>Bookshelf</h2>
          <div className="flex flex-row justify-between">
            <p>
              <button
                onClick={() => setBookStatus("all")}
                disabled={bookStatus === "all" ? "disabled" : ""}
              >
                All
              </button>{" "}
              /{" "}
              <button
                onClick={() => setBookStatus("read")}
                disabled={bookStatus === "read" ? "disabled" : ""}
              >
                已读
              </button>{" "}
              /{" "}
              <button
                onClick={() => setBookStatus("wish")}
                disabled={bookStatus === "wish" ? "disabled" : ""}
              >
                想读
              </button>
            </p>
            <p>
              {totalCount} - {books.length} - {filteredBook.length}
            </p>
          </div>
        </div>
        {filteredBook.map(
          ({ comment, rating, book, book_id, status, tags }) => {
            if (!tags) {
              tags = book.tags.map(tag => tag.name)
            }
            const statusMap = {
              wish: "想读",
              read: "已读",
            }
            return (
              <div
                className="flex flex-col border border-red-600 rounded shadow-lg p-3 m-3"
                key={book_id}
              >
                <div className="flex p-2 flex-grow-0">
                  <img
                    className="p-1 mr-2 block h-48"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    src={book.image}
                    alt={book.title + " Image"}
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="flex flex-col p-2">
                      <h3 className="text-center">{book.title}</h3>
                      <div className="text-gray-800">
                        <p>Status: {statusMap[status]}</p>
                        <p>Author: {book.author.join(" | ")}</p>
                        <p>Tags: {tags.join(" / ")}</p>
                        {rating && (
                          <p>
                            Rating: <StarRating rating={rating} maxRating={5} />{" "}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-3">
                  <p>{comment}</p>
                </div>
              </div>
            )
          }
        )}
        {isLoading ? (
          <button className="border border-red-600 rounded shadow-lg p-3 mx-3 hover:line-through bg-yellow-200 cursor-wait">
            Loading
          </button>
        ) : (
          <button
            className="border border-red-600 rounded shadow-lg p-3 mx-3 hover:line-through hover:bg-yellow-200"
            onClick={fetchBooks}
          >
            More
          </button>
        )}
      </div>
    </Layout>
  )
}
