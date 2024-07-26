
export default function SummaryQuestions(props){
    return(
        <div className="summary-count">
            {props.isSubmittedForm 
            ? <><p>You scored {props.rightAnswersCount}/{props.questionCount} correct answers</p> <button onClick={(event) => props.handlePlayAgain(event)}>Play again</button></>
            : <button>Check answers</button>
            }
        </div>  
    )
}