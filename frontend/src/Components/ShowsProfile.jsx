import React, { Component } from 'react';
import axios from 'axios';

class ShowsProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            comments: [],
            numberOfComments: 0,
            comment_body: "",
        }
    }
    componentDidMount = () => {
        let userIdByParams = this.props.match.params.userId;
        let showIdByParams = this.props.match.params.showId;
        this.setShowInfo(userIdByParams, showIdByParams)
    }
    getShowInfo = async (showId) => {
        try {
            let showObj = await axios.get(`http://localhost:3100/shows/showInfo/${showId}`).then((res) => res.data.payload);
            return showObj;
        }
        catch (err) {
            throw err
        }
    }
    getComments = async (showId) => {
        let showComments = await axios.get(`http://localhost:3100/comments/show/${showId}`)
        return showComments;
    }
    setShowInfo = async (userId, showId) => {
        let showObj = await this.getShowInfo(showId);
        let showComments = await this.getComments(showId)
        this.setState({
            user_id: userId,
            show_id: showId,
            userName: showObj.username,
            userAvatar: showObj.avatar_url,
            showTitle: showObj.title,
            showAvatar: showObj.img_url,
            genreName: showObj.genre_name,
            comments: showComments
        })
    }
    handleInputChange = (e) => {
        let newInput = e.target.value;
        this.setState({
            comment_body: newInput,
        })
    }
    handleNewComment = async (e) => {
        e.preventDefault();
        const { comment_body, user_id , show_id} = this.state;
        let newComment = { comment_body, user_id, show_id };
        try {
            let postedComment = await axios.post('http://localhost:3100/comments', newComment);
            return postedComment;
        }
        catch (err) {
            throw err
        }
    }
    render() {
        const { userName, showTitle, showAvatar, genreName, numberOfComments } = this.state;
        let commentsForm = () => {
            return (
                <form onSubmit={this.handleNewComment} className="comments-form">
                    <input type="text" placeholder="Type new comment here" id="comment-input" onChange={this.handleInputChange} /><br />
                    <button type="submit">Add Comment</button>
                </form>
            )
        }
        return (
            <div>
                <h1> {userName}'s show: {showTitle}</h1>
                <div>
                    <img src={showAvatar} alt={showTitle} className="showpage-avatar" />
                    <br />
                    <h3>Genre: {genreName}</h3>
                    <div className="comments-form">
                        <h3>{numberOfComments} Comments</h3>
                    </div>
                    {commentsForm()}
                </div>
            </div>
        )
    }
}
export default ShowsProfile;


//A specific show's profile page for a specific user. Shows the title, image, genre, number of comments and list of comments. Allows you to add new comments. The comment should be reflected immediately on the list without needing to refresh the page.