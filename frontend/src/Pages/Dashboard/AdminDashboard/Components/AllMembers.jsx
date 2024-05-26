import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../../../../helpers/getReport';
import { Button } from 'semantic-ui-react';

function AllMembers() {
  const API_URL = process.env.REACT_APP_API_URL

  const [recentAddedMembers, setRecentAddedMembers] = useState([])


  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await axios.get(API_URL + "api/users/allmembers")
        const recentMembers = await response.data.slice(0, 5)
        setRecentAddedMembers(recentMembers)
      }
      catch (err) {
        console.log(err)
      }
    }
    getMembers()
  }, [API_URL])

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(API_URL + "api/users/deleteuser/" + id)
      if (response.status === 200) {
        const updatedMembers = recentAddedMembers.filter((member) => member._id !== id)
        setRecentAddedMembers(updatedMembers)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className='page-header'>
        <p className="dashboard-option-title">Members List</p>
        <PDFDownloadLink
          document={
            <MyDocument
              username={"System Admin"}
              reportData={recentAddedMembers}
              reportTitle="All Members Report"
              type="member"
              tableHeader={['S.No', 'Member Name', 'Member Type', 'Member Id',]}
            />
          }
        >
          <Button className='mt-4'>Generate Report</Button>
        </PDFDownloadLink>
      </div>
      <div className="dashboard-title-line"></div>
      <div className='mt-4'>
        <table className='admindashboard-table'>
          <tr>
            <th>S.No</th>
            <th>Member Type</th>
            <th>Member ID</th>
            <th>Member Name</th>
            <th>Actions</th>
          </tr>
          {
            recentAddedMembers.map((member, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.userType}</td>
                  <td>{member.userType === "Student" ? member.admissionId : member.employeeId}</td>
                  <td>{member.userFullName}</td>
                  <td><button onClick={() => removeUser(member._id)} style={{ color: "red" }}>Delete</button></td>
                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  )
}

export default AllMembers