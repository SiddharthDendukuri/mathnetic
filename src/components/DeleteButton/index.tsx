import React from 'react';
import { useCallback, useRef, useState } from 'react';
import { useDraggable } from '@neodrag/react';
import { useReactFlow, XYPosition } from '@xyflow/react';
import { InlineMath } from 'react-katex';
import './index.css';


export default function DeleteButton() {
    const [deleting, setDeleting] = useState(true);
    function handleClick() {
        setDeleting(!deleting);
        console.log(deleting);
        const ev = new Event('trashClicked')
        document.dispatchEvent(ev);
    }
    return <div className="trashbutton" style={{ background: deleting ? '#ffcccc' : '#008000' }} onClick={handleClick}>Trash</div>
}