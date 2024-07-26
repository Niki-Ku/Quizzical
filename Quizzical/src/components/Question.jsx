import he from 'he'

export default function Question(props){
    function returnStyle(){
        if (props.userAnswer === props.item.answer && !props.formSubmitted){
            return {background : '#D6DBF5'}
        }else if (props.formSubmitted && props.item.isCorrect){
            return {background: '#94D7A2'}
        }else if (props.userAnswer === props.item.answer && props.item.submittedAnswer && props.formSubmitted && !props.item.isCorrect){
            return {background: "#F8BCBC"}
        }else if (props.formSubmitted && !props.item.isCorrect && !props.item.submittedAnswer){
            return {
                color: '#4D5B9E80',
                border: '1px solid #4D5B9E80'
            }
        }
    }

    const styles = returnStyle()
    
return(
    <div style={styles} className='radio-div' /* tabIndex='0' role='button' */>
        <input 
        type="radio"
        id={props.item.id} 
        name={props.question} 
        value={props.item.answer} 
        checked={props.userAnswer === props.item.answer}
        onChange={(event)=>props.handleChange(event, props.item.answer)}
        disabled={props.formSubmitted}
        className='radio-input'
        />
        <label 
        className='radio-label' 
        htmlFor={props.item.id}
        onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                props.handleChange(event, props.item.answer);
            }
        }}  
        >{he.decode(props.item.answer)}</label>
    </div>
)
}