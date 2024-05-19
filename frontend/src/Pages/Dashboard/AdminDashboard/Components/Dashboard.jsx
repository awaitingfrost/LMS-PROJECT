import React, { useEffect, useState } from "react"
import "../Dashboard.css"
import Charts from "./Chart.jsx"
import axios from "axios"


const CardItem = ({ title, count }) => {
    return (
        <div className="card__container">
            <div className="card__header">
                {title}
            </div>
            <div className="card__body">
                {count}
            </div>
        </div>
    )
}

function Dasboard() {
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
        <div className="container">
            <div className="header__title">
                Dashboard
            </div>
            <div className="card__list">
                <CardItem title={"Total Members"} count={data?.user} />
                <CardItem title={"Total Books"} count={data?.book} />
                <CardItem title={"Total Transaction"} count={data?.transaction} />
            </div>
            <div className="chart__container">
                <Charts />
            </div>
        </div>
    )
}


export default Dasboard
