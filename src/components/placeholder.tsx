"use client"
import { Placeholder } from "react-bootstrap"

interface PlaceProps{
    size: number
}

export function Placehold(props:PlaceProps){
    return(
        <Placeholder animation="glow"><Placeholder xs={props.size} /></Placeholder>
    )
}