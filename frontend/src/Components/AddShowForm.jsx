import React, { Component } from 'react';
import axios from 'axios';

class AddShowForm extends Component {
    constructor() {
        super();
        this.state = {
            loggedInUser: 1,
            options: [],
            urlInput: "",
            showInput: "",
            selectedGenre: ""
        }
    }
    componentDidMount = () => {
        this.getAllGenres();
    }
    getAllGenres = async () => {
        try {
            let allGenres = await axios.get(`http://localhost:3100/genres/`).then((res) => res.data.payload);

            this.setState({
                options: allGenres
            })
            return allGenres;
        }
        catch (err) {
            throw err
        }
    }
    handleUrlInput = (e) => {
        let newUrlInput = e.target.value;
        this.setState({
            urlInput: newUrlInput,
        })
    }
    handleShowInput = (e) => {
        let newShowInput = e.target.value;
        this.setState({
            showInput: newShowInput,
        })
    }
    handleSelectChange = (e) => {
        let newSelectValue = e.target.value;
        console.log("Select value changed! Value now:", newSelectValue)
        this.setState({
            selectedGenre: newSelectValue
        })
    }
    handleNewShow = async (e) => {
        e.preventDefault();
        const { urlInput, showInput, loggedInUser, selectedGenre } = this.state;
        if(urlInput && showInput && selectedGenre) {
            let showObj = {
                title: showInput,
                img_url: urlInput,
                user_id: loggedInUser,
                genre_id: selectedGenre
            }
            try{
                let newShow = await axios.post('http://localhost:3001/shows/', showObj);
                return newShow;
            }
            catch(err){
                console.log("Show didn't post!")
            }
        }
        else {
            console.log("all fields must be completed!")
        }
    }
    render() {
        const { options } = this.state;
        let allOptions = options.map((op) => {
            return (
                <option key={op.id} value={op.id}>{op.genre_name}</option>
            )
        })
        return (
            <div>
                <form onSubmit={this.handleNewShow} className="new-show-form">
                    <h2> Add Show Form</h2>
                    <p><b>Show Image URL:</b></p>
                    <input type="text" placeholder="Image URL" onChange={this.handleUrlInput}></input><br />
                    <p><b>Show Name:</b></p>
                    <input type="text" placeholder="Show Name" onChange={this.handleShowInput}></input>
                    <br /><br />
                    <select className="select-genres" onChange={this.handleSelectChange}>
                        <option value={null}>Select Genre</option>
                        {allOptions}
                    </select>
                    <br /><br />
                    <button type="submit" onSubmit={this.handleNewShow}>Submit</button>
                </form>
            </div>
        )
    }
}
export default AddShowForm;




// Shows a form where the logged in user can add a new show. Should be able to submit to the Database. These changes are reflected app wide. Selecting the genre is a drop down. This data should be reflecting the genres in the database.