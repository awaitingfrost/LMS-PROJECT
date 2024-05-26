import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Bookimage from "../../../../assets/images/Books.jpg"


const BookDetails = () => {
  const { id } = useParams()
  const [bookDetails, setBookDetails] = useState()
  const API_URL = process.env.REACT_APP_API_URL


  useEffect(() => {
    const fetchTransactionsByUserId = async () => {
      if (id) {
        try {
          const response = await axios.get(API_URL + "api/books/getBook/" + id)
          setBookDetails(response.data)
        } catch (err) {
          console.error("Failed to fetch books:", err);
        }
      }
    }
    fetchTransactionsByUserId()
  }, [id, API_URL])


  return (
    <div>
      <img
        src={bookDetails?.book_image ?? Bookimage}
        alt="Books"
        width={'20%'}
        height={'100%'}
      ></img>
      <div>
        <p className='font-extrabold text-4xl'>{bookDetails?.bookName}</p>
        <p>{bookDetails?.author} </p>
      </div>
      <h1>Description</h1>
      <p>{bookDetails?.bookSummary}</p>
    </div>
  )
}

export default BookDetails