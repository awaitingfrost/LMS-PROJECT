import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext';

const Profile = () => {
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
    <div className="member-profile-content" id="profile@member">
      <div className="user-details-topbar">
        <img
          className="user-profileimage"
          src=""
          alt=""
        ></img>
        <div className="user-info">
          <p className="user-name">{memberDetails?.userFullName}</p>
          <p className="user-id">
            {memberDetails?.userType === "Student"
              ? memberDetails?.admissionId
              : memberDetails?.employeeId}
          </p>
          <p className="user-email">{memberDetails?.email}</p>
          <p className="user-phone">{memberDetails?.mobileNumber}</p>
        </div>
      </div>
      <div className="user-details-specific">
        <div className="specific-left">
          <div className="specific-left-top">
            <p className="specific-left-topic">
              <span style={{ fontSize: "18px" }}>
                <b>Age</b>
              </span>
              <span style={{ fontSize: "16px" }}>
                {memberDetails?.age}
              </span>
            </p>
            <p className="specific-left-topic">
              <span style={{ fontSize: "18px" }}>
                <b>Gender</b>
              </span>
              <span style={{ fontSize: "16px" }}>
                {memberDetails?.gender}
              </span>
            </p>
          </div>
          <div className="specific-left-bottom">
            <p className="specific-left-topic">
              <span style={{ fontSize: "18px" }}>
                <b>DOB</b>
              </span>
              <span style={{ fontSize: "16px" }}>
                {memberDetails?.dob}
              </span>
            </p>
            <p className="specific-left-topic">
              <span style={{ fontSize: "18px" }}>
                <b>Address</b>
              </span>
              <span style={{ fontSize: "16px" }}>
                {memberDetails?.address}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile