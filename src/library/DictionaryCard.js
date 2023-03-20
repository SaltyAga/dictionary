import React, { useState } from 'react';
import './Library.css';

const DictionaryCard = (props) => {
    const [hover, setHover] = useState(false);

    const d = props.data;
    let id = d["dictionayrId"];
    let name = d["name"];
    let author = d["author"];
    let number = d["numberOfTerms"];

    return (
        <div className= {`Item ${hover ? "hover" : ""}`} key={id}
            onMouseEnter={()=> setHover(true)}
            onMouseLeave={()=> setHover(false)}
            onClick={() => props.setCardClicked({d})}>
            <div className="name">{name}</div>
            <div className="terms">{number} terms</div>
            <div className="created">Created by {author}</div>
        </div>
    );
}

export default DictionaryCard;