import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Sunday',
    transaction: 4000,
    books: 10,
    amt: 2400,
  },
  {
    name: 'Monday',
    transaction: 3000,
    books: 13,
    amt: 2210,
  },
  {
    name: 'Tuesday',
    transaction: 2000,
    books: 14,
    amt: 2290,
  },
  {
    name: 'Wednesday',
    transaction: 8,
    books: 30,
    amt: 2000,
  },
  {
    name: 'Thrusday',
    transaction: 1890,
    books: 20,
    amt: 2181,
  },
  {
    name: 'Friday',
    transaction: 2390,
    books: 18,
    amt: 2500,
  },
  {
    name: 'Saturday',
    transaction: 3490,
    books: 13,
    amt: 2100,
  },
];

export default class Example extends PureComponent {

  render() {
    return (
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
    );
  }
}
