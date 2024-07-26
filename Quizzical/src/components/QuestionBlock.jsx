import Question from "./Question"
import he from 'he'



export default function QuestionBlock(props){
const { userAnswer, question, allAnswers, formSubmitted } = props.items

const allAnswersElements = allAnswers.map(answer => {
    return <Question
    question={question} 
    item={answer} 
    key={answer.id}
    handleChange={props.handleChange}
    userAnswer={userAnswer}
    formSubmitted={formSubmitted}
     />
})

    return(
        <div className="question-block">
            <h2>{he.decode(question)}</h2>
            <div className="answers-block">
                {allAnswersElements}
            </div>
        </div>
    )
}


