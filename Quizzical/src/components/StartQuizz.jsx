export default function StartQuizz(props){
    return(
        <div className="startgame-div">
            <h1>Quizzical</h1>
            <button onClick={() => props.toggleStartGame()}>Start quizz</button>
        </div>
    )
}