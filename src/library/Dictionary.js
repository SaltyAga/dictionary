import React, { useState } from 'react';
import '../library/Library.css';

const Dictionary = (props) => {
    const d = props.card["d"];
    const name = d["name"];
    const id = d["dictionayrId"];
    const author = d["author"];
    const number = d["numberOfTerms"];
    const terms = d["terms"];


    return (
        <div className='Dictionary'>
            {name}
        </div>
    );
}

export default Dictionary;
