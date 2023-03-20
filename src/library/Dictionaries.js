import React, { useState } from 'react';
import './Library.css';
import Dictionary from './Dictionary';
import DictionaryCard from './DictionaryCard';


const Dictionaries = () => {
    const [cardClicked, setCardClicked] = useState("");
    const data = require('../library/dictionaries.json');
	const dictionaries = data["dictionaries"];

    const dictList = dictionaries.length ? (
        dictionaries.map(d => {
            return (
                <DictionaryCard setCardClicked={setCardClicked} data={d} key={d['dictionayrId']}/>
            )
        }))
    : <p>No dictionaries found</p>;

    if (cardClicked) {
        return (
            <Dictionary card={cardClicked}></Dictionary>
        )
    } else {
        return (
            <div className="Container">
                { dictList }
            </div>
        )
    }
    

}
export default Dictionaries;