import React from "react"
import "../Dashboard.css"
import Charts from "./Chart.jsx"


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

function Dasboard({ data, type = 'admin' }) {

    return (
        <div className="container">
            <div className="header__title">
                Dashboard
            </div>
            <div className="dashboard-title-line"></div>
            <div className="card__list">
                {type === 'admin' && <CardItem title={"Total Members"} count={data?.user ?? 0} />}
                <CardItem title={"Total Books"} count={data?.book ?? 0} />
                <CardItem title={"Total Transaction"} count={data?.transaction ?? 0} />
                {type === 'admin' && <CardItem title={"Total Authors"} count={data?.auther ?? 0} />}
                {type === 'admin' && <CardItem title={"Total Categories"} count={data?.categories ?? 0} />}
                <CardItem title={"Total Fine"} count={`Rs ${data?.fine ?? 0}`} />
                <CardItem title={"Total Issued Books"} count={data?.issued ?? 0} />
                <CardItem title={"Total Reserved Books"} count={data?.reserved ?? 0} />

            </div>
            <div className="chart__container">
                <Charts />
            </div>
        </div>
    )
}


export default Dasboard
