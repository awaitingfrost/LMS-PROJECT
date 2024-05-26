import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Chart = () => {
  const [data, setData] = useState([])

  const API_URL = 'https://backend-hhb9.onrender.com/';


  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}api/books/allbooks`);
      const chartData = response.data.slice(0, 15).map(book => {
        return {
          name: book.bookName,
          transaction: book.transactions.length,
          books: book.totalCopies
        }
      })

      setData(chartData)
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }

  useEffect(() => {

    fetchAllBooks()
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={380}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="transaction" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="books" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart