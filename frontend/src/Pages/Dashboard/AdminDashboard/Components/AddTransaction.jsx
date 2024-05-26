import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Dropdown } from 'semantic-ui-react';
import "../AdminDashboard.css";


function AddTransaction({ setToastMessage, setToast }) {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)

    const [borrowerId, setBorrowerId] = useState("")
    const [bookId, setBookId] = useState("")
    const [allMembers, setAllMembers] = useState([])
    const [allBooks, setAllBooks] = useState([])

    const [fromDate, setFromDate] = useState(null)
    const [fromDateString, setFromDateString] = useState(null)

    const [toDate, setToDate] = useState(null)
    const [toDateString, setToDateString] = useState(null)

    const addTransaction = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (bookId !== "" && borrowerId !== "" && fromDate !== null && toDate !== null) {
            const transactionData = {
                bookId: bookId,
                borrowerId: borrowerId,
                fromDate: fromDateString,
                toDate: toDateString,
            }
            try {
                await axios.post(API_URL + "api/transactions/add-transaction", transactionData)
                setToastMessage('Transaction Added Successfully 🎉')
                setToast(true)

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
            catch (err) {
                setToastMessage('Error Adding Transaction')
                setToast(true)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }

    }

    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                const all_members = await response.data.map(member => (
                    { value: `${member?._id}`, text: `${member?.userType === "Student" ? `${member?.userFullName}[${member?.admissionId}]` : `${member?.userFullName}[${member?.employeeId}]`}` }
                ))
                setAllMembers(all_members)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])

    const [bookCounts, setCount] = useState();

    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "api/books/avaliableBooks")
            setCount(response.data)
            const allbooks = await response.data.map(book => (
                { value: `${book._id}`, text: `${book.bookName}` }
            ))
            setAllBooks(allbooks)
        }
        getallBooks()
    }, [API_URL])

    return (
        <div>
            <form className='transaction-form' onSubmit={addTransaction}>
                <label className="transaction-form-label" htmlFor="borrowerId">Borrower<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select Member'
                        fluid
                        search
                        selection
                        value={borrowerId}
                        options={allMembers}
                        onChange={(event, data) => setBorrowerId(data.value)}
                    />
                </div>
                <label className="transaction-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select a Book'
                        fluid
                        search
                        selection
                        options={allBooks}
                        value={bookId}
                        onChange={(event, data) => setBookId(data.value)}
                    />
                </div>
                <table className="admindashboard-table shortinfo-table" style={bookId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Available Coipes</th>
                        <th>Reserved</th>
                    </tr>
                    <tr>
                        {console.log(bookCounts?.find(book => book))}
                        <td>
                            {bookCounts?.find(book => book._id === bookId)?.bookCountAvailable}
                        </td>
                        <td>
                            {bookCounts?.find(book => book._id === bookId)?.totalCopies - bookCounts?.find(book => book._id === bookId)?.bookCountAvailable}
                        </td>
                    </tr>
                </table>

                <br />

                <label className="transaction-form-label" htmlFor="from-date">From Date<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={fromDate}
                    onChange={(date) => { setFromDate(date); setFromDateString(moment(date).format("MM/DD/YYYY")) }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />

                <label className="transaction-form-label" htmlFor="to-date">To Date<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={toDate}
                    onChange={(date) => { setToDate(date); setToDateString(moment(date).format("MM/DD/YYYY")) }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />

                <Button type='submit' className='mt-4' disabled={isLoading}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default AddTransaction