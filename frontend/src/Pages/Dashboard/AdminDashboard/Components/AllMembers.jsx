import React, { useEffect, useState } from 'react'
import AddMember from './AddMember';
import GetMember from './GetMember';
import Modals from '../../../../common/Modal';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function AllMembers({ setToastMessage, setToast }) {
  const API_URL = process.env.REACT_APP_API_URL
  const [open, setOpen] = useState(false);

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
      <Modals title={'Add Member'} open={open} setOpen={setOpen} close={() => setOpen(false)}>
        <AddMember setOpen={setOpen} setToastMessage={setToastMessage} setToast={setToast} />
      </Modals>
      <div className='page-header'>
        <p className="dashboard-option-title">Members List</p>
        <Button className="mt-4" onClick={() => setOpen(true)} >
          + Add Member
        </Button>
      </div>
      <div className="dashboard-title-line"></div>
      <div>
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
      <div>
        <div className="dashboard-title-line"></div>
        <p className='dashboard-option-title'>Get Member Details</p>
        <GetMember />
      </div>
    </div>
  )
}

export default AllMembers