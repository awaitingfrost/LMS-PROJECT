import React, { useState } from 'react'
import "./AdminDashboard.css"
import Dashboard from './Components/Dashboard';
import axios from 'axios';
import { useEffect } from 'react';


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function AdminDashboard() {
    const API_URL = process.env.REACT_APP_API_URL

    const [data, setData] = useState(null);

    const fetchData = async () => {
        await axios.get(API_URL + "api/dashboard/dashboard-counts")
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <Dashboard data={data} />
            </div>
        </div >
    )
}

export default AdminDashboard