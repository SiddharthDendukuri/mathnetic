import { useCallback, useState, useEffect, useRef} from 'react';
import { Position, useStoreApi, useNodeConnections, useReactFlow, useNodesData } from '@xyflow/react';
import CustomHandle from '../../CustomHandle';
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex';
import { useInternalNode, useNodesState } from '@xyflow/react';

function getFractionLength(props) {
    const { getNode } = useReactFlow();
    const { getInternalNode } = useReactFlow();
    
    const upperNode = getNode(props.data.connectors.upper);
    let currentNode = upperNode;
    while (getNode(currentNode.data.rightNode) !== undefined) {
        currentNode = getNode(currentNode.data.rightNode);
    }

    let cnx = getInternalNode(currentNode.id).internals.positionAbsolute.x;
    let unx = getInternalNode(upperNode.id).internals.positionAbsolute.x
    const distance = cnx - unx;
    if (distance > 5) {
        return distance;
    }
    return 5;

}



//let len = 0;

function refresh() {
    console.log("more bees");
}
document.addEventListener("updateFraction", refresh)         // Declaring states and state changers for nodes and edges. 

const moveNode = (nodeId, newX, newY) => {                            // Helper function to move a node. This form of state setting is common throughout the program
    const [nodes, setNodes, onNodesChange] = useNodesState([]);           // Declaring states and state changers for nodes and edges. 
    setNodes((nds) =>                                                   // Nodes should never be modified directly, you should instead use setNodes. 
        nds.map((node) => {                                             // the map function goes through the array and fills in a new array by running the function for each node
            if (node.id === nodeId) {                                   // In this function, the node is returned (added back the same) if it is not the node being moved, and the node that is being moved
                return { ...node, position: { x: newX, y: newY } };     // is replaced by an identical node with a different position
            }
            return node;
        })
    );
};

function FractionNode(props) {

    const [len, setLen] = useState(getFractionLength(props) + 20);
    const updateLen = () => { setLen(getFractionLength(props) + 20); console.log("Length updated");};

    const elementRef = useRef(null); 


    useEffect(() => {
        const node = elementRef.current;
        console.log("bees");
        if (node) {
            node.style.background = "green";
            
            // Add the listener
            const printBanana = () => {console.log('banana')};
            document.addEventListener("updateFraction", updateLen);
            console.log("added listener");

            // Cleanup: Remove when component unmounts
            return () => { document.removeEventListener("updateFraction",  updateLen); console.log("cleanup");};
        }
    }, []);
    
  return (
      <div className="fraction-node" style={{ width: len }} ref={elementRef}>
          <CustomHandle id={props.id + "_target1"} type="target" position={Position.Left} connectionCount={1}/>
          <InlineMath>{props.data.value}</InlineMath>
          <CustomHandle id={props.id + "_source1"} type="source" position={Position.Right} connectionCount={1} />
    </div>
  );
}
 
export default FractionNode;