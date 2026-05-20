import React from 'react';
import { useCallback, useRef, useState } from 'react';
import { useDraggable } from '@neodrag/react';
import { useReactFlow, XYPosition } from '@xyflow/react';
import { InlineMath } from 'react-katex';
import './index.css';

//delete/trash button 
export default function DeleteButton() {
    //deleting = true. idk why it needs to start at true, but it does.
    //setDeleting() is the function that changes the value of deleting. setDeleting(true) will make deleting true.
    const [deleting, setDeleting] = useState(true); 
    function handleClick() {
        setDeleting(!deleting); //changes deleting = true to false or vice versa
        const ev = new Event('trashClicked')    
        document.dispatchEvent(ev);     //sends an event to the document to tell app.jsx whether to delete nodes or not
    }
    return <div className="trashbutton" style={{ background: deleting ? '#ffcccc' : '#008000' }} onClick={handleClick}>Trash</div>
}