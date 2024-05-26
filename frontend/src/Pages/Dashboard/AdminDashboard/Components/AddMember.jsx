import React, { useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Button, Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


function AddMember({ setToastMessage, setToast, setOpen }) {
    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)

    const [userFullName, setUserFullName] = useState(null)
    const [admissionId, setAdmissionId] = useState(null)
    const [employeeId, setEmployeeId] = useState(null)
    const [address, setAddress] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [mobileNumber, setMobileNumber] = useState(null)
    const [userType, setUserType] = useState(null)
    const [gender, setGender] = useState(null)
    const [age, setAge] = useState(null)
    const [dob, setDob] = useState(null)
    const [dobString, setDobString] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)


    const genderTypes = [
        { value: "Male", text: "Male" },
        { value: "Female", text: "Female" }
    ]

    const userTypes = [
        { value: 'Staff', text: 'Staff' },
        { value: 'Student', text: 'Student' }
    ]

    const adminOption = [
        { value: true, text: 'Yes' },
        { value: false, text: 'No' }
    ]

    //Add a Member
    const addMember = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (userFullName && userType && age && dobString && gender && address && mobileNumber && email && password) {
            const userData = {
                userType: userType,
                userFullName: userFullName,
                admissionId: admissionId,
                employeeId: employeeId,
                age: age,
                dob: dobString,
                gender: gender,
                address: address,
                mobileNumber: mobileNumber,
                email: email,
                password: password,
                isAdmin: isAdmin
            }
            try {
                await axios.post(API_URL + "api/auth/register", userData)
                setToastMessage('Member Added Successfully 🎉')
                setToast(true)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            }
            catch (err) {
                setToastMessage('Failed Creating Member')
                setToast(true)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }
        else {
            alert("All the fields must be filled")
        }
        setIsLoading(false)
    }

    return (
        <div>
            <p className="dashboard-option-title">Add a Member</p>
            <div className="dashboard-title-line"></div>
            <form className="addmember-form" onSubmit={addMember}>
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='User Type'
                        fluid
                        selection
                        options={userTypes}
                        onChange={(event, data) => setUserType(data.value)}
                    />
                </div>
                <label className="addmember-form-label" htmlFor="userFullName">Full Name<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" name="userFullName" value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor={userType === "Student" ? "admissionId" : "employeeId"}>{userType === "Student" ? "Admission Id" : "Employee Id"}<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={userType === "Student" ? admissionId : employeeId} required onChange={(e) => { userType === "Student" ? setAdmissionId(e.target.value) : setEmployeeId(e.target.value) }}></input><br />


                {userType === "Staff" && <div className='semanticdropdown'>
                    <label className="addmember-form-label" htmlFor="userFullName">Is Admin<span className="required-field">*</span></label><br />

                    <Dropdown
                        placeholder='Is Admin'
                        fluid
                        selection
                        options={adminOption}
                        onChange={(event, data) => setIsAdmin(data.value)}
                    />
                </div>}

                <label className="addmember-form-label" htmlFor="mobileNumber">Mobile Number<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={mobileNumber} required onChange={(e) => setMobileNumber(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="gender">Gender<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='User Type'
                        fluid
                        selection
                        value={gender}
                        options={genderTypes}
                        onChange={(event, data) => setGender(data.value)}
                    />
                </div>

                <label className="addmember-form-label" htmlFor="age">Age<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={age} required onChange={(e) => setAge(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="dob">Date of Birth<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={dob}
                    onChange={(date) => { setDob(date); setDobString(moment(date).format("MM/DD/YYYY")) }}
                    dateFormat="MM/dd/yyyy"
                />

                <label className="addmember-form-label" htmlFor="address">Address<span className="required-field">*</span></label><br />
                <input className="addmember-form-input address-field" value={address} type="text" required onChange={(e) => setAddress(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="email">Email<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="password">Password<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br />

                <Button type="submit" disabled={isLoading} className="mt-3">
                    Add Member
                </Button>

            </form>
        </div >
    )
}

export default AddMember
