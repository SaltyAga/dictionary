import React, { useState } from 'react';
import './Library.css';

const TermCard = (props) => {
    const data = props.data;
    const term = props.term;
    const nextTerm = term + 1;
    const [translation, setTranslation] = useState('');
    const [checked, setChecked] = useState(false);
    const [correct, setCorrect] = useState(false);

    function onInput(event) {
        event.preventDefault();
        setChecked(false);
        setCorrect(false);
        setTranslation(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();
        setChecked(true);
        if (translation.toLowerCase().trim() === data["translation"].toLowerCase().trim()) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    }

    function next(event) {
        event.preventDefault();
        setChecked(false);
        setCorrect(false);
        setTranslation('');
        props.setTerm(nextTerm);
    }
    let correctWrong = correct ? "Correct!" : "Wrong answer";
    return (
        <div className='Card'>
            <div style={{visibility: checked ? 'visible' : 'hidden', color: correct ? 'green' : 'red'}}>{correctWrong}</div>
            <div>{data["term"]}</div>
            <form className="translation" onSubmit = {submitHandler}>
                <input type="text" value={translation} onChange={onInput} /> <br/>
                <button type="submit" onClick={submitHandler}>Answer</button>
                <button type="button" disabled={!correct} onClick={next}>Next</button>
            </form>
        </div>
    )
}

export default TermCard;