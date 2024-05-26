import Bookimage from "../assets/images/Books.jpg"
import React, { useEffect, useState } from "react";
import "./Allbooks.css";
import axios from "axios";
import { Button, Input } from "semantic-ui-react";
import SelectLabels from "../common/Select";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../helpers/getReport";
import { useNavigate } from "react-router-dom";

let books;

const BookCard = ({ _id, bookName, author, alternateTitle, book_image }) => {
  const navigate = useNavigate();

  const onClick = (id) => {
    navigate(`${id}`);
  };
  return (
    <div className="book-card" onClick={() => onClick(_id)}>
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
  const API_URL = 'https://backend-hhb9.onrender.com/';

  const [allUserList, setAllUsers] = useState();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}api/users/allusers`);
        const data = response.data.filter(d => d.isAdmin);
        setAllUsers([...data, { _id: 'none', userFullName: 'All' }])
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    }
    fetchAllUsers()
  }, [])

  const [recentAddedBooks, setRecentAddedBooks] = useState([])

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}api/books/allbooks`);
      setAllBooks(response.data);
      books = response.data
      setRecentAddedBooks(response.data.slice(0, 15));
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }
  useEffect(() => {

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
  const [keyword, setKeyword] = React.useState('');

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
  useEffect(() => {
    if (keyword === '') { fetchAllBooks() } else {
      const searchBooks = allBooks.filter(book => book.bookName.toLowerCase().includes(keyword.toLowerCase()))
      setAllBooks(searchBooks)
    }

  }, [keyword])




  return (
    <div className="books-page">
      <div className="page-header">
        <p className="dashboard-option-title">Books List</p>
        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <input name="searchWord" type='search' placeholder="search" height={'50px'} onChange={(e) => setKeyword(e.target.value)} className="p-3 border-black"></input>
        </form>
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
        <div className="form-header-filter">
          <p className="dashboard-option-title">Recently Added Books</p>
          <PDFDownloadLink
            document={
              <MyDocument
                username={"System Admin"}
                reportData={recentAddedBooks}
                reportTitle="All Book Report"
                type="book"
                tableHeader={['S.No', 'Book Name', 'Author Name', 'Added Date']}
              />
            }
          >
            <Button className='mt-4'>Generate Report</Button>
          </PDFDownloadLink>
        </div>
        <table className='admindashboard-table'>
          <tr>
            <th>S.No</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Added Date</th>
            <th>Actions</th>
          </tr>
          {
            recentAddedBooks.map((book, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>{book.createdAt.slice(0, 10)}</td>
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
