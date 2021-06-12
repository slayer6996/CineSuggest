import { Button} from '@material-ui/core'

import React from 'react'

function Tile(props){
    return(

            <div className="tileContainer">
                <Button onClick={() => {
                    props.onclick(props.description)
                }} style={{backgroundColor:"black", color:" rgb(255, 241, 163)", width:"max-content"}} >{props.description}</Button>
            </div>

    )
}

export default Tile