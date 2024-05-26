import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import SelectLabels from '../../../../common/Select';
import Modal from '../../../../common/Modal'
import { Box } from '@mui/material';
import MyDocument from '../../../../helpers/getReport'
import { PDFDownloadLink } from '@react-pdf/renderer';

const AllTransations = ({ setToastMessage, setToast }) => {

  const API_URL = process.env.REACT_APP_API_URL

  const [allUserList, setAllUsers] = useState();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}api/users/allusers`);
        const data = response.data.filter(d => !d.isAdmin)
        setAllUsers([...data, { _id: 'none', userFullName: 'All' }])
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    }
    fetchAllUsers()
  }, [API_URL])

  const [recentTransactions, setRecentTransactions] = useState([])

  const [userId, setUserId] = React.useState('');

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(API_URL + "api/transactions/all-transactions")
        const value = response.data.splice(0, 15).map(e => ({
          _id: e._id,
          bookName: e.bookId.bookName,
          borrowerName: e.borrowerId.userFullName,
          transactionDate: e.createdAt,
          returnedDate: e.returnDate,
          borrowerId: e.borrowerId._id,
          transactionType: e.transactionType
        })
        )
        setRecentTransactions(value)
      }
      catch (err) {
        console.log("Error in fetching transactions")
      }
    }
    getTransactions()
  }, [API_URL])


  const removeTransaction = async (transactionId) => {
    try {
      await axios.delete(API_URL + "api/transactions/remove-transaction/" + transactionId)
      setToastMessage('Transactions Removed Successfully 🎉')
      setToast(true)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    catch (err) {
      setToastMessage('Error Removing Transaction')
      setToast(true)
    }
  }


  useEffect(() => {
    const fetchTransactionsByUserId = async () => {
      if (userId) {
        try {
          const response = await axios.get(API_URL + "api/transactions/userid/all-transactions", {
            params: {
              userId
            }
          })
          const value = response.data.splice(0, 15).map(e => ({
            _id: e._id,
            bookName: e.bookId.bookName,
            borrowerName: e.borrowerId.userFullName,
            transactionDate: e.createdAt,
            returnedDate: e.returnDate,
            borrowerId: e.borrowerId._id,
            transactionType: e.transactionType
          })
          )
          setRecentTransactions(value)
        } catch (err) {
          console.error("Failed to fetch books:", err);
        }
      }
    }
    fetchTransactionsByUserId()
  }, [userId, API_URL])

  const handleReturnBook = async (transaction) => {
    await axios.post(API_URL + `api/transactions/update-transaction/${transaction._id}`, {
      bookId: transaction._id,
      borrowerId: transaction.borrowerId
    })

    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }


  return (
    <div>
      <div className='page-header'>
        <p className="dashboard-option-title">Transactions List</p>
        <div className='filter-form'>
          <Button className="mt-4">
            <SelectLabels userList={allUserList} userId={userId} setUserId={setUserId} />
          </Button>
          <PDFDownloadLink
            document={
              <MyDocument
                username={"System Admin"}
                reportData={recentTransactions}
                reportTitle="All Transaction Report"
                type="transaction"
                tableHeader={['S.No', 'Book Name', 'Borrower Name', 'Transaction Date', 'Returned Date']}
              />
            }
          >
            <Button className='mt-4'>Generate Report</Button>
          </PDFDownloadLink>
        </div>
      </div>
      <div className="dashboard-title-line"></div>
      <div className='transaction-body'>
        <div className='transaction-list'>

        </div>
        <div className='transactions-table'>
          <table className="admindashboard-table mt-4">
            <tr>
              <th>S.No</th>
              <th>Book Name</th>
              <th>Borrower Name</th>
              <th>Transaction Date</th>
              <th>Returned Date</th>
              <th>Actions</th>
            </tr>
            {
              recentTransactions?.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction?.bookName}</td>
                    <td>{transaction?.borrowerName}</td>
                    <td>{transaction?.transactionDate?.slice(0, 10)}</td>
                    <td>
                      {transaction?.returnedDate ? new Date(transaction.returnedDate).toISOString().split('T')[0] : 'Not returned yet'}
                    </td>
                    <td>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => removeTransaction(transaction._id)} style={{ color: "red" }}>Delete</button>
                        {transaction.transactionType !== 'Issued' && <Modal handleSubmit={() => handleReturnBook(transaction)} transaction={transaction} />}
                      </Box>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
    </div >
  )
}

export default AllTransations