import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Bookimage from "../../../../assets/images/Books.jpg"
import '../AdminDashboard.css'

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
    <>
      <p className="dashboard-option-title">Books List</p>
      <div className="dashboard-title-line"></div>
      <div className='bookDetails'>
        <img
          src={bookDetails?.book_image ?? Bookimage}
          alt="Books"
          width={'20%'}
          height={'100%'}
        ></img>
        <div className='ml-4'>
          <p >
            <span className='bookTitle'>  Book Name :</span> <span className='book-name'>{bookDetails?.bookName}</span></p>
          <p className='my-3'> <span className='bookTitle'>Author :</span> <span className='book-name'>{bookDetails?.author}</span> </p>
          <p >
            <span className='bookTitle'>  Copies Avaliable :</span> <span className='book-name'>{bookDetails?.bookCountAvailable}</span></p>
          <p className='my-3' >
            <span className='bookTitle'>  Publisher :</span> <span className='book-name'>{bookDetails?.publisher}</span></p>
        </div>
        <div className='desc'>
          <p className='bookTitle'>Summary:</p>
          <p>{bookDetails?.bookSummary ?? 'No Book Summary'}</p>
        </div>
      </div >
    </>
  )
}

export default BookDetails