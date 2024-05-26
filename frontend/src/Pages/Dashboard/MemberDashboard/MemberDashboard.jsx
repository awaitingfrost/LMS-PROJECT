import React, { useContext, useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookIcon from "@material-ui/icons/Book";
import HistoryIcon from "@material-ui/icons/History";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { IconButton } from "@material-ui/core";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import moment from "moment";
import Profile from "./Profile";
import Dashboard from "../AdminDashboard/Components/Dashboard";

function MemberDashboard() {
  const [active, setActive] = useState("profile");
  const [sidebar, setSidebar] = useState(false);

  const { user } = useContext(AuthContext);


  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const API_URL = process.env.REACT_APP_API_URL

  const [data, setData] = useState(null);

  const fetchData = async () => {
    await axios.get(API_URL + "api/dashboard/dashboard-counts/" + user._id)
      .then(res => {
        setData(res.data)
        console.log(res.data)
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
      <Dashboard data={data} type="member" />
    </div >
  );
}

export default MemberDashboard;
