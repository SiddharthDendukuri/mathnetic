import React from 'react';
import { useCallback, useRef, useState } from 'react';
import { useDraggable } from '@neodrag/react';
import { useReactFlow, XYPosition } from '@xyflow/react';
import { InlineMath } from 'react-katex';
import './index.css';

const TrashZone = () => {

    return (
        <div className="trashzone">
            Drop here to delete
        </div>
    );
};

export default TrashZone;