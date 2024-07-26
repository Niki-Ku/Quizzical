import { useState, useEffect } from 'react'
import StartQuizz from './components/StartQuizz'
import QuestionBlock from './components/QuestionBlock'
import SummaryQuestions from './components/SummaryQuestions'
import { nanoid } from 'nanoid'


function App() {
  const [data, setData] = useState([])
  const [startGame, setStartGame] = useState(false)
  const [rightAnswersCount, setRightAnswersCount] = useState(0)
  const [isSubmittedForm, setIsSubmittedForm] = useState(false)
  const questionCount = data.length

  function getApiData(){
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(res => res.json())
        .then(data => {
          const modifiedData = data.results.map((e) => ({
              ...e,
              allAnswers: shuffle(allAnswersArr(e.correct_answer, e.incorrect_answers)),
              userAnswer: '',
              formSubmitted: false
          }))
          setData(modifiedData)
        })
    }

  useEffect(() => getApiData(), [])


  function toggleStartGame(){
    setStartGame(startGame => !startGame)
  }

  function allAnswersArr(correctAnswer, incorrectAnswers){
    const answerArr = incorrectAnswers.map(answer => {
      return {
        answer: answer,
        isCorrect: false,
        id: nanoid(),
        submittedAnswer: false
      }
    })
    answerArr.push({answer: correctAnswer, isCorrect: true, id:nanoid(), submittedAnswer: false})
    return answerArr
  }

  function shuffle (array) {
    return array.sort(() => Math.random() - 0.5)
  }

  function handleChange(event, answer){
    setData(prevData => prevData.map(d => d.question === event.target.name ? {...d, userAnswer: answer } : d))
  }

  
  function handleSubmit(event){
    event.preventDefault()
    setIsSubmittedForm(true)
    setData(prevData => {
      const updatedData = prevData.map(question => {
        const userAnswer = question.userAnswer
        const updatedAllAnswers = question.allAnswers.map(ans => 
          ans.answer === userAnswer 
          ? {...ans, submittedAnswer: true }
          : {...ans, submittedAnswer: false }
        )
        return {...question, allAnswers: updatedAllAnswers, formSubmitted: true }
      })
      return updatedData
    })
  }
  
  useEffect(() => setRightAnswersCount(() => {
    const rightAnswers = data.map(quest => {
      const searchCorrectAnswer = quest.allAnswers.filter(e => {
        if (e.isCorrect && e.submittedAnswer) {
          return e
        }
      })
      return searchCorrectAnswer.length
    })
    return rightAnswers.reduce((ans1, ans2) => ans1 + ans2, 0)
  }), [data])

  const allQuestionsArr = data.map(block => {
    return <QuestionBlock 
    items={block} 
    key={nanoid()} 
    shuffle={shuffle}
    handleChange={handleChange}
    />
  })

  function handlePlayAgain(event){
    event.preventDefault()
    getApiData()
    setIsSubmittedForm(false)
  }


  return (
    <main>
      {!startGame && <StartQuizz toggleStartGame={toggleStartGame} />}
      <form className='form' onSubmit={handleSubmit}>
        {allQuestionsArr}
        <SummaryQuestions 
        handlePlayAgain={handlePlayAgain} 
        rightAnswersCount={rightAnswersCount} 
        questionCount={questionCount}
        isSubmittedForm={isSubmittedForm}
        />
      </form>
    </main>
  )
}

export default App

