import {useLocation} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const GameReportsRoute = () => {
  const location = useLocation()
  const {questions = [], ttlQns = 0} = location.state || {}

  const getUnattemptedQuestions = () =>
    questions.filter(question => question.slctOptId === null)

  const getCorrectAnswersCount = () =>
    questions.filter(question => question.slctOptId === question.crctOptId)
      .length

  const getIncorrectQuestionsCount = () =>
    questions.filter(
      question =>
        question.slctOptId !== null &&
        question.slctOptId !== question.crctOptId,
    ).length

  const renderUnattemptedQuestions = () => {
    const unattemptedQuestions = getUnattemptedQuestions()
    if (unattemptedQuestions.length === 0) {
      return (
        <div>
          <h1 className="all-questions-attempted-text">
            Attempted all the questions
          </h1>
        </div>
      )
    }
    return (
      <div>
        <p className="unattempted-question-heading">
          {unattemptedQuestions.length} Unattempted Questions
        </p>
        {unattemptedQuestions.map(question => (
          <div key={question.id} className="question-container">
            <h3 className="question-not-answered">{question.question}</h3>
            <div className="options-wrapper">
              <div className="options-container">
                {question.options.map(option => (
                  <button
                    key={option.id}
                    className={`option ${
                      option.id === question.crctOptId ? 'correct' : ''
                    }`}
                    type="button"
                  >
                    {question.optionType === 'IMAGE' ? (
                      <img
                        src={option.url}
                        alt={option.text}
                        className="option-image"
                      />
                    ) : (
                      option.text
                    )}
                    {option.id === question.crctOptId && (
                      <img
                        className="option-icon"
                        alt="correct checked circle"
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const CorrectAnswers = getCorrectAnswersCount()
  const IncorrectAnswers = getIncorrectQuestionsCount()
  const Unattempted = getUnattemptedQuestions().length
  const trueOrFalse =
    Unattempted > 0 ? 'report-container-with-unattempt' : 'report-container'

  return (
    <div className="page-container">
      <Navbar />
      <div className={trueOrFalse}>
        <div className="score-board">
          <div className="score-container">
            <div className="score-circle">
              <p className="final-score-and-actual-score">
                <span className="final-score">{CorrectAnswers}</span>/{ttlQns}
              </p>
            </div>
            <div className="score-details">
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="score-icon"
                />
                <p className="report-each-score">
                  {CorrectAnswers} Correct answers
                </p>
              </div>
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect answer icon"
                  className="score-icon"
                />
                <p className="report-each-score">
                  {IncorrectAnswers} Incorrect answers
                </p>
              </div>
              <div className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="score-icon"
                />
                <p className="report-each-score">
                  {Unattempted} Unattempted answers
                </p>
              </div>
            </div>
          </div>
          {renderUnattemptedQuestions()}
        </div>
      </div>
    </div>
  )
}

export default GameReportsRoute
