import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'
import '../../MemberDashboard/MemberDashboard.css'

function GetMember() {

    const API_URL = process.env.REACT_APP_API_URL

    const [allMembersOptions, setAllMembersOptions] = useState(null)
    const [memberId, setMemberId] = useState(null)
    const [memberDetails, setMemberDetails] = useState(null)

    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                setAllMembersOptions(response.data.map((member) => (
                    { value: `${member?._id}`, text: `${member?.userType === "Student" ? `${member?.userFullName}[${member?.admissionId}]` : `${member?.userFullName}[${member?.employeeId}]`}` }
                )))
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])


    useEffect(() => {
        const getMemberDetails = async () => {
            if (memberId !== null) {
                try {
                    const response = await axios.get(API_URL + "api/users/getuser/" + memberId)
                    setMemberDetails(response.data)
                }
                catch (err) {
                    console.log("Error in fetching the member details")
                }
            }
        }
        getMemberDetails()
    }, [API_URL, memberId])


    return (
        <div>
            <p className='dashboard-option-title'>Get Member Details</p>
            <div className="dashboard-title-line"></div>
            <div className='semanticdropdown getmember-dropdown'>
                <Dropdown
                    placeholder='Select Member'
                    fluid
                    search
                    selection
                    value={memberId}
                    options={allMembersOptions}
                    onChange={(event, data) => setMemberId(data.value)}
                />
            </div>
            <div style={memberId === null ? { display: "none" } : {}}>
                <div className="member-profile-content" id="profile@member" style={memberId === null ? { display: "none" } : {}}>
                    <div className="user-details-topbar">
                        <img className="user-profileimage" src="../../../../assets/images/Profile.png" alt=""></img>
                        <div className="user-info">
                            <p className="user-name">{memberDetails?.userFullName}</p>
                            <p className="user-id">{memberDetails?.userType === "Student" ? memberDetails?.admissionId : memberDetails?.employeeId}</p>
                            <p className="user-email">{memberDetails?.email}</p>
                            <p className="user-phone">{memberDetails?.mobileNumber}</p>
                        </div>
                    </div>
                    <div className="user-details-specific">
                        <div className="specific-left">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p style={{ display: "flex", flex: "0.5", flexDirection: "column" }}>
                                    <span style={{ fontSize: "18px" }}>
                                        <b>Age</b>
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                        {memberDetails?.age}
                                    </span>
                                </p>
                                <p style={{ display: "flex", flex: "0.5", flexDirection: "column" }}>
                                    <span style={{ fontSize: "18px" }}>
                                        <b>Gender</b>
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                        {memberDetails?.gender}
                                    </span>
                                </p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                                <p style={{ display: "flex", flex: "0.5", flexDirection: "column" }}>
                                    <span style={{ fontSize: "18px" }}>
                                        <b>DOB</b>
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                        {memberDetails?.dob}
                                    </span>
                                </p>
                                <p style={{ display: "flex", flex: "0.5", flexDirection: "column" }}>
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

                <div className="member-activebooks-content" id="activebooks@member">
                    <p style={{ fontWeight: "bold", fontSize: "22px", marginTop: "22px", marginBottom: "22px" }}>Issued</p>
                    <table className="activebooks-table">
                        <tr>
                            <th>S.No</th>
                            <th>Book-Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Returned Date</th>
                            <th>Fine</th>
                        </tr>
                        {
                            memberDetails?.transactions?.filter((data) => {
                                return data.transactionType === "Issued"
                            }).map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.bookId.bookName}</td>
                                        <td>{new Date(data.fromDate).toISOString().split('T')[0]}</td>
                                        <td>{new Date(data.toDate).toISOString().split('T')[0]}</td>
                                        <td>{new Date(data.returnDate).toISOString().split('T')[0]}</td>
                                        <td>{data.fine}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>

                <div className="member-reservedbooks-content" id="reservedbooks@member">
                    <p style={{ fontWeight: "bold", fontSize: "22px", marginTop: "22px", marginBottom: "22px" }}>Reserved</p>
                    <table className="activebooks-table">
                        <tr>
                            <th>S.No</th>
                            <th>Book-Name</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        {
                            memberDetails?.transactions?.filter((data) => {
                                return data.transactionType === "Reserved"
                            }).map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.bookId.bookName}</td>
                                        <td>{data.fromDate}</td>
                                        <td>{data.toDate}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <div className="member-history-content" id="history@member">
                    <p style={{ fontWeight: "bold", fontSize: "22px", marginTop: "22px", marginBottom: "22px" }}>History</p>
                    <table className="activebooks-table">
                        <tr>
                            <th>S.No</th>
                            <th>Book-Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Return Date</th>
                        </tr>
                        {
                            memberDetails?.transactions?.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.bookId.bookName}</td>
                                        <td>{new Date(data.fromDate).toISOString().split('T')[0]}</td>
                                        <td>{new Date(data.toDate).toISOString().split('T')[0]}</td>
                                        <td>{data?.returnDate ? new Date(data?.returnDate).toISOString().split('T')[0] : 'Not returned yet'}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GetMember
