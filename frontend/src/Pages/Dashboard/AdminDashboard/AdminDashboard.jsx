import React, { useState } from 'react'
import "./AdminDashboard.css"

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BookIcon from '@material-ui/icons/Book';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Snackbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import Return from './Components/Return';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Dashboard from './Components/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import Allbooks from '../../Allbooks';
import AllTransations from './Components/AllTransations';
import AllMembers from './Components/AllMembers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddBook from './Components/AddBook';
import Modals from '../../../common/Modal';
import AddTransaction from './Components/AddTransaction';
import AddMember from './Components/AddMember';

/* Semantic UI Dropdown Styles Import */
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function AdminDashboard() {

    const [active, setActive] = useState("dashboard")
    const [sidebar, setSidebar] = useState(false)

    /* Logout Function*/
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    const [toastOpen, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState();
    function handleToast() {
        setToast(false)
    }

    const [openModal, setModal] = useState(false);
    const [openTransactionModal, setTransactionModal] = useState(false)

    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
                    <IconButton>
                        {sidebar ? <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} /> : <DoubleArrowIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />}
                    </IconButton>
                </div>

                {/* Sidebar */}
                <div className={sidebar ? "dashboard-options active" : "dashboard-options"}>
                    <div className='dashboard-logo'>
                        <LibraryBooksIcon style={{ fontSize: 50 }} />
                        <p className="logo-name">LMS</p>
                    </div>
                    <p className={`dashboard-option ${active === "dashboard" ? "clicked" : ""}`} onClick={() => { setActive("dashboard"); setSidebar(false) }}><HomeIcon className='dashboard-option-icon' />Dashboard</p>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ backgroundColor: 'rgb(181, 101, 29)', color: 'white' }}
                        >
                            <BookIcon className='dashboard-option-icon' />
                            <Typography className='dashboard-option-icon' style={{ fontWeight: 'bold' }}>BOOKS</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{
                                backgroundColor: 'rgb(181, 101, 29)', color: 'white', width: 'full', justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ width: '100%' }}>
                                <p className={`dashboard-option ${active === "allbooks" ? "clicked" : ""}`} onClick={() => { setActive("allbooks"); setSidebar(false) }}>
                                    <BookIcon className='dashboard-option-icon' />ALL Books
                                </p>
                                <p className={`dashboard-option ${active === "addbook" ? "clicked" : ""}`} onClick={() => { setActive("addbook"); setModal(true); setSidebar(false) }}>
                                    <BookIcon className='dashboard-option-icon' />Add Book
                                </p>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ backgroundColor: 'rgb(181, 101, 29)', color: 'white' }}
                        >
                            <BookIcon className='dashboard-option-icon' />
                            <Typography className='dashboard-option-icon' style={{ fontWeight: 'bold' }}>TRANSACTIONS</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{
                                backgroundColor: 'rgb(181, 101, 29)', color: 'white', width: 'full', justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ width: '100%' }}>
                                <p className={`dashboard-option ${active === "alltransactions" ? "clicked" : ""}`} onClick={() => { setActive("alltransactions"); setSidebar(false) }}><ReceiptIcon className='dashboard-option-icon' /> ALL Transaction </p>
                                <p className={`dashboard-option ${active === "addtransaction" ? "clicked" : ""}`} onClick={() => { setActive("addtransaction"); setTransactionModal(true); setSidebar(false) }}><ReceiptIcon className='dashboard-option-icon' /> Add Transaction </p>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <p className={`dashboard-option ${active === "allmembers" ? "clicked" : ""}`} onClick={() => { setActive("allmembers"); setSidebar(false) }}><AccountBoxIcon className='dashboard-option-icon' /> ALL Members </p>
                    {/* <p className={`dashboard-option ${active === "getmember" ? "clicked" : ""}`} onClick={() => { setActive("getmember"); setSidebar(false) }}><AccountBoxIcon className='dashboard-option-icon' /> Get Member </p> */}

                    <p className={`dashboard-option ${active === "addmember" ? "clicked" : ""}`} onClick={() => { setActive("addmember"); setSidebar(false) }}><PersonAddIcon className='dashboard-option-icon' /> Add Member </p>
                    <p className={`dashboard-option ${active === "returntransaction" ? "clicked" : ""}`} onClick={() => { setActive("returntransaction"); setSidebar(false) }}><AssignmentReturnIcon className='dashboard-option-icon' /> Return </p>
                    <p className={`dashboard-option`} onClick={logout}><PowerSettingsNewIcon className='dashboard-option-icon' /> Log out </p>
                </div>
                <div className="dashboard-option-content" style={{ marginTop: "60px" }}>
                    <div className="dashboard-addbooks-content" style={active !== "dashboard" ? { display: 'none' } : {}}>
                        <Dashboard />
                    </div>

                    {/* BOOKS */}
                    <div className="dashboard-addbooks-content" style={active !== "addbook" ? { display: 'none' } : {}}>
                        <Modals title={'Add Book'} open={openModal} setOpen={setModal} close={() => setModal(false)}>
                            <AddBook setOpen={setModal} setToastMessage={setToastMessage} setToast={setToast} />
                        </Modals>
                    </div>
                    <div className="" style={active !== "allbooks" ? { display: 'none' } : {}}>
                        <Allbooks setToast={setToast} setToastMessage={setToastMessage} />
                    </div>

                    {/* TRANSACTIONS */}
                    <div className="dashboard-transactions-content" style={active !== "alltransactions" ? { display: 'none' } : {}}>
                        <AllTransations setToastMessage={setToastMessage} setToast={setToast} />
                    </div>
                    <div className="dashboard-transactions-content" style={active !== "addtransaction" ? { display: 'none' } : {}}>
                        <Modals title={'Add Transaction'} open={openTransactionModal} setOpen={setTransactionModal} close={() => setTransactionModal(false)}>
                            <AddTransaction setToastMessage={setToastMessage} setToast={setToast} />
                        </Modals>
                    </div>

                    {/* MEMBERS */}
                    <div className="dashboard-addmember-content" style={active !== "allmembers" ? { display: 'none' } : {}}>
                        <AllMembers setToastMessage={setToastMessage} setToast={setToast} />
                    </div>
                    <div className="dashboard-addmember-content" style={active !== "addmembers" ? { display: 'none' } : {}}>
                        <AddMember />
                    </div>
                    {/* <div className="dashboard-addmember-content" style={active !== "getmember" ? { display: 'none' } : {}}>
                        <GetMember />
                    </div> */}
                    <div className="dashboard-addmember-content" style={active !== "returntransaction" ? { display: 'none' } : {}}>
                        <Return />
                    </div>
                </div>
                <Snackbar
                    open={toastOpen}
                    autoHideDuration={3000}
                    onClose={handleToast}
                    message={toastMessage}
                />
            </div>
        </div >
    )
}

export default AdminDashboard