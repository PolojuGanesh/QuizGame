import {Component} from 'react'
import {Link} from 'react-router-dom'

import Navbar from '../Navbar'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="home-main-container">
          <div className="home-sub-container">
            <img
              className="home-image"
              alt="start quiz game"
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            />
            <h1 className="home-main-heading">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="home-main-para">
              Test yourself with these easy quiz questions and answers
            </p>
            <Link to="/quiz-game">
              <button type="button" className="home-start-quiz-button">
                Start Quiz
              </button>
            </Link>
            <div className="warning-icon-and-msg">
              <img
                className="warning-icon"
                alt="warning icon"
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
              />
              <p className="warning-para">
                All the progress will be lost, if you reload during the quiz
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
