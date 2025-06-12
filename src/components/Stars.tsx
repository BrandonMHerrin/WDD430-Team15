import React from "react";
import { ImStarFull, ImStarEmpty } from "react-icons/im";

interface Props {
   rate: number;
}

export default function Star(props: Props) {
    return (
        <div>
        { [... new Array(5)].map((Star, index) =>{
            return ( index < props.rate ? <ImStarFull/> : <ImStarEmpty/>)
            }
        )}
        </div>
    )
}