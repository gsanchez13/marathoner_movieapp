import React, { Component } from 'react';

const imgArr = ["https://media.giphy.com/media/2eKtgBTca0l4atcsPI/giphy.gif", "https://media.giphy.com/media/l4pM35VGqeuL4pfvG/giphy.gif", "https://media.giphy.com/media/3oEjHKELgSBF6JEbhC/giphy.gif", "https://media.giphy.com/media/7T8uLiWEsnytWkQKvF/giphy.gif", "https://media.giphy.com/media/l0MYBQSaLvKxe0G6A/giphy.gif", "https://media.giphy.com/media/Sb7WSbjHFNIL6/giphy.gif", "https://media.giphy.com/media/w85OYSOzXQaiVzZswl/giphy.gif"]

const randomImg = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex]
}
class Home extends Component {
    render() {
        return(
            <div>
                <br/>
                <br/>
                <img className="home-ad" src={randomImg(imgArr)} alt="TV GIF"/>
                <h1>Welcome to Marathoner</h1>
            </div>
        )
    }
}
export default Home;