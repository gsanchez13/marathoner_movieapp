import React, { Component } from 'react';
import axios from 'axios';

class ShowsProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            comments: [],
            comment_body: "",
        }
    }
    componentDidMount = () => {
        let userIdByParams = this.props.match.params.userId;
        let showIdByParams = this.props.match.params.showId;
        this.setShowInfo(userIdByParams, showIdByParams);
    };
    getShowInfo = async (showId) => {
        try {
            let showInfo = await axios.get(`http://localhost:3100/shows/showInfo/${showId}`).then((res) => res.data.payload);
            return showInfo;
        }
        catch (err) {
            throw err
        }
    };
    getComments = async (showId) => {
        let showComments = await axios.get(`http://localhost:3100/comments/showInfo/${showId}`).then((res) => res.data.payload);
        return showComments;
    };
    setShowInfo = async (userId, showId) => {
        let showObj = await this.getShowInfo(showId);
        let showComments = await this.getComments(showId);
        this.setState({
            user_id: userId,
            show_id: showId,
            showTitle: showObj.title,
            showAvatar: showObj.img_url,
            genreName: showObj.genre_name,
            comments: showComments,
            numberOfComments: showComments.length,
        })
    };
    handleInputChange = (e) => {
        let newInput = e.target.value;
        this.setState({
            comment_body: newInput,
        })
    };
    handleNewComment = async (e) => {
        e.preventDefault();
        const { comment_body, user_id, show_id, comments } = this.state;
        if (!comment_body) {
            console.log("no comment")
        }
        else {
            let newComment = { comment_body, user_id, show_id };
            try {
                let postedCommentObj = await axios.post('http://localhost:3100/comments', newComment).then((res) => res.data);
                let commentsCopy = [...comments];
                commentsCopy.unshift(postedCommentObj.payload.comment_body);
                let commentUserInfoCopy = postedCommentObj.info;
                this.setState({
                    comments: commentsCopy,
                    commentUserInfo: commentUserInfoCopy,
                    comment_body: " "
                })
                this.setShowInfo(user_id, show_id)
            }
            catch (err) {
                throw err
            }
        }
    };
    handleNewComments = () => {
        const { comments } = this.state;
        let commentsList = comments.map((comment) => {
            return (
                <li className="comments-list-item" key={comment.id + comment.comment_body}>
                    <img src={comment.avatar_url} className="user-avatar" alt={comment.username} />
                    <p><b>{comment.username}:</b></p>
                    <br /><br />
                    {comment.comment_body}
                </li>
            )
        });
        let commentsForm = () => {
            return (
                <div>
                    <form onSubmit={this.handleNewComment} className="comments-form">
                        <input type="text" placeholder="Type new comment here" id="comment-input" onChange={this.handleInputChange} value={this.state.comment_body}/><br />
                        <button type="submit">Add Comment</button>
                    </form>
                    <ul className="comments-ul">
                        {commentsList}
                    </ul>
                </div>
            )
        };
        return commentsForm();
    }
    render() {
        const { showTitle, showAvatar, genreName, numberOfComments } = this.state;
        return (
            <div className='shows-profile'>
                <h1>{showTitle}</h1>
                <div>
                    <img src={showAvatar} alt={showTitle} className="showpage-avatar" />
                    <br />
                    <h3>Genre: {genreName}</h3>
                    <div className="comments-form">
                        <h3>{numberOfComments} Comments</h3>
                    </div>
                    {this.handleNewComments()}
                </div>
            </div>
        )
    }
};

export default ShowsProfile;