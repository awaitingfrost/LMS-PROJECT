import Bookimage from "../assets/images/Books.jpg"
import React, { useEffect, useState } from "react";
import "./Allbooks.css";
import axios from "axios";
import { Button, Input } from "semantic-ui-react";
import SelectLabels from "../common/Select";

const BookCard = ({ bookName, author, alternateTitle, book_image }) => {
  return (
    <div className="book-card">
      <img
        src={book_image ?? Bookimage}
        alt="Books"
      ></img>
      <p className="bookcard-title">{bookName}</p>
      <p className="bookcard-author">By {author}</p>
      <div className="bookcard-category">
        <p>{alternateTitle}</p>
      </div>
      <div className="bookcard-emptybox"></div>
    </div>
  )
}

function Allbooks({ setToastMessage, setToast }) {
  const [allBooks, setAllBooks] = useState([]);
  const API_URL = 'http://localhost:5000/';

  const [allUserList, setAllUsers] = useState();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}api/users/allusers`);
        setAllUsers([...response.data, { _id: 'none', userFullName: 'None' }])
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    }
    fetchAllUsers()
  }, [])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}api/books/allbooks`);
        setAllBooks(response.data);
        setRecentAddedBooks(response.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    }
    fetchAllBooks()
  }, []);

  const fetchFilteredBooks = async (filters = {}) => {
    const { startDate, endDate } = filters;
    try {
      const response = await axios.get(`${API_URL}api/books/allbooks`, {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      setAllBooks(response.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }

  const [recentAddedBooks, setRecentAddedBooks] = useState([])

  const handleDateFilter = (e) => {
    e.preventDefault();
    setUserId('')
    fetchFilteredBooks({ startDate: dateFilter.startDate, endDate: dateFilter.endDate });
  }

  const removeBook = async (bookId) => {
    try {
      await axios.delete(API_URL + "api/books/removebook/" + bookId)
      setToastMessage('Book Removed Successfully 🎉')
      setToast(true)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    catch (err) {
      console.log(err)
    }
  }

  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  })

  const [userId, setUserId] = React.useState('');
  useEffect(() => {
    const fetchBookByUserId = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${API_URL}api/books/userid`, {
            params: {
              userId,
            }
          });
          setAllBooks(response.data);
        } catch (err) {
          console.error("Failed to fetch books:", err);
        }
      }
    }
    fetchBookByUserId()
  }, [userId])

  return (
    <div className="books-page">
      <div className="page-header">
        <p className="dashboard-option-title">Books List</p>
        <div className="form-header-filter">
          <form onSubmit={handleDateFilter} className="filter-form">
            <div className="">
              <p className="mb-2">Start Date</p>
              <Input type="date" id="startDate" onChange={e => setDateFilter({ ...dateFilter, startDate: e.target.value })} />
            </div>
            <div>
              <p className="mb-2">End Date</p>
              <Input type="date" id="endDate" onChange={e => setDateFilter({ ...dateFilter, endDate: e.target.value })} />
            </div>
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
          <Button className="mt-4">
            <SelectLabels userList={allUserList} userId={userId} setUserId={setUserId} />
          </Button>
        </div>
      </div>
      <div className="dashboard-title-line"></div>
      <div className="books">
        {
          allBooks?.map((book, idx) => {
            return (<BookCard key={idx} {...book} />)
          })
        }
      </div>
      <div>
        <p className="dashboard-option-title">Recently Added Books</p>
        <table className='admindashboard-table'>
          <tr>
            <th>S.No</th>
            <th>Book Name</th>
            <th>Added Date</th>
            <th>Actions</th>
          </tr>
          {
            recentAddedBooks.map((book, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{book.bookName}</td>
                  <td>{book.createdAt.substring(0, 10)}</td>
                  <td><button onClick={() => removeBook(book._id)} style={{ color: "red" }}>delete</button></td>
                </tr>
              )
            })
          }
        </table>
      </div>
    </div >
  );
}



export default Allbooks;
