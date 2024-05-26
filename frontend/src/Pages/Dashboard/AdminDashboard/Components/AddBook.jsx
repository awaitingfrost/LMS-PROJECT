import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Button, Dropdown } from 'semantic-ui-react'

const AddBook = ({ setToast, setToastMessage }) => {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const [bookName, setBookName] = useState("")
    const [alternateTitle, setAlternateTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [bookCountAvailable, setBookCountAvailable] = useState(null)
    const [language, setLanguage] = useState("")
    const [publisher, setPublisher] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [bookImage, setBookImage] = useState("")
    const [bookSummary, setBookSummary] = useState("")

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await axios.get(API_URL + "api/categories/allcategories")
                const all_categories = await response.data.map(category => (
                    { value: `${category._id}`, text: `${category.categoryName}` }
                ))
                setAllCategories(all_categories)
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllCategories()
    }, [API_URL])

    const userDetails = JSON.parse(localStorage.getItem("user"))
    const user_ID = userDetails?.user?.user_id

    const addBook = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData();
        formData.append("bookName", bookName);
        formData.append("alternateTitle", alternateTitle);
        formData.append("author", author);
        formData.append("bookCountAvailable", bookCountAvailable);
        formData.append("bookSummary", bookSummary);
        formData.append("language", language);
        formData.append("publisher", publisher);
        formData.append("isAdmin", user.isAdmin);
        formData.append("userId", user_ID);
        if (selectedCategories && selectedCategories.length) {
            selectedCategories.forEach((category, index) => {
                formData.append(`categories[${index}]`, category);
            });
        }
        if (bookImage) {
            formData.append("bookImage", bookImage);
        }
        try {
            const response = await axios.post(API_URL + "api/books/addbook", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.status === 200) {
                setToastMessage('Book Added Successfully 🎉')
                setToast(true)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setToastMessage('Failed to add book. Please try again later.');
            }
        }
        catch (err) {
            setToastMessage('Error Adding Book')
            setToast(true)
        }
        setIsLoading(false)
    }



    return (
        <div>
            <p className="dashboard-option-title">Add Books</p>
            <div className="dashboard-title-line"></div>

            <form className='addbook-form' onSubmit={addBook}>
                <label className="addbook-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="bookName" value={bookName} onChange={(e) => { setBookName(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="alternateTitle">AlternateTitle</label><br />
                <input className="addbook-form-input" type="text" name="alternateTitle" value={alternateTitle} onChange={(e) => { setAlternateTitle(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="bookImage">Book Image</label><br />
                <input type="file" onChange={(e) => { setBookImage(e.target.files[0]) }} /><br />

                <label className="addbook-form-label" htmlFor="author">Author Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="author" value={author} onChange={(e) => { setAuthor(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="language">Language</label><br />
                <input className="addbook-form-input" type="text" name="language" value={language} onChange={(e) => { setLanguage(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="bookSummary">Book Summary</label><br />
                <textarea className="addbook-form-input" type="text" name="bookSummary" value={bookSummary} onChange={(e) => { setBookSummary(e.target.value) }}></textarea><br />


                <label className="addbook-form-label" htmlFor="publisher">Publisher</label><br />
                <input className="addbook-form-input" type="text" name="publisher" value={publisher} onChange={(e) => { setPublisher(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="copies">No.of Copies Available<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="copies" value={bookCountAvailable} onChange={(e) => { setBookCountAvailable(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="categories">Categories<span className="required-field">*</span></label><br />
                <div className="semanticdropdown">
                    <Dropdown
                        placeholder='Category'
                        fluid
                        multiple
                        search
                        selection
                        options={allCategories}
                        value={selectedCategories}
                        onChange={(event, value) => setSelectedCategories(value.value)}
                        Comic
                    />
                </div>

                <Button className="mt-4" type="submit" disabled={isLoading}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default AddBook