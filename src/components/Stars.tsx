'use client'
import React, { useState } from "react";
import { ImStarFull, ImStarEmpty } from "react-icons/im";
import { FaStar } from "react-icons/fa";

export function Star(props: {rate: number}) {
    return (
        <div className="productRating">
        { [... new Array(5)].map((Star, index) =>{
            return (<div  key={index}> { index < props.rate ? <ImStarFull/> : <ImStarEmpty/>}</div>)
            }
        )}
        </div>
    )
}

export function RateProduct() {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    return (
        <div className="rating">
            { [... new Array(5)].map((rate, index) => {
                const rateValue = index + 1
                return (
                    <label key={index}>
                        <input 
                        type="radio" 
                        name="rating" 
                        value={rateValue}
                        onClick={() =>setRating(index)}
                        />
                        <FaStar 
                        className="rating-star" 
                        color={ index <= ( hover || rating) ? "#D4A017" : "#b4b4b4"} 
                        size={30} 
                        
                        onMouseEnter={()=>setHover(index)}
                        onMouseLeave={() =>setHover(0)}
                        />
                    </label>
                )
            })}
        </div>
    )
}