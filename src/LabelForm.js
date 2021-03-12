import React from 'react';

function LabelForm (props) {
    return (
        <form class='ui form' onSubmit={props.addLabel}>
            <input type='text' name='labelMaker'></input>
            <button class='ui button' type='submit' name='submitLabel'>Add label</button>
        </form>
    )


}

export default LabelForm;