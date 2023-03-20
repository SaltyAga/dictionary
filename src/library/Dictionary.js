import React, { useState } from 'react';
import './Library.css';
import Dictionaries from './Dictionaries';
import TermCard from './TermCard';

const Dictionary = (props) => {
    const d = props.card["d"];
    const name = d["name"];
    const terms = d["terms"];

    const [term, setTerm] = useState(0);
    const [back, setBack] = useState(false);

    function backToDictionaries(event) {
        event.preventDefault();
        setBack(true);
    }

    if (back) {
        return (
            <Dictionaries></Dictionaries>
        )
    } else if (terms.length === 0) {
        return (
            <div>
                <div>Dictionary "{name}" is empty</div>
                <button onClick={backToDictionaries}>Back to dictionaries</button>
            </div>
        )
    } else if (terms.length - 1 === term) {
        return (
            <div>
                <div>Well done!</div>
                <button onClick={backToDictionaries}>Back to dictionaries</button>
            </div>
            
        )
    } else {
        const currentTerm = terms[term];
        return (
            <div className='Dictionary'>
                {name}
                <TermCard data={currentTerm} setTerm={setTerm} term={term}></TermCard>
                <button onClick={backToDictionaries}>Back to dictionaries</button>
            </div>
        );
    }
}

export default Dictionary;
