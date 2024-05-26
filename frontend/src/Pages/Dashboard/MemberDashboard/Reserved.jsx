import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';

const Reserved = () => {
  const { user } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL;


  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    const getMemberDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/getuser/" + user._id
        );
        setMemberDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getMemberDetails();
  }, [API_URL, user]);
  return (
    <div
      className="member-reservedbooks-content"
      id="reservedbooks@member"
    >
      <p className="member-dashboard-heading">Reserved</p>
      <table className="activebooks-table">
        <tr>
          <th>S.No</th>
          <th>Book-Name</th>
          <th>From</th>
          <th>To</th>
        </tr>
        {memberDetails?.transactions
          ?.filter((data) => {
            return data.transactionType === "Reserved";
          })
          .map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.bookId.bookName}</td>
                <td>{data.fromDate}</td>
                <td>{data.toDate}</td>
              </tr>
            );
          })}
      </table>
    </div>
  )
}

export default Reserved