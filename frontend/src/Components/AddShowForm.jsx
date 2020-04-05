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
            let allGenres = await axios.get(`http://localhost:8080/genres/all`).then((res) => res.data.payload);

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
        let newSelectValue = parseInt(e.target.value);
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
                let newShow = await axios.post('http://localhost:3100/shows/new_show:', showObj).then((res) => res.data.payload);
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
                    <h1> Add Show Form</h1>
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