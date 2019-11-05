import React, { Fragment } from 'react'

const handleClick = (props) => {
  props.handleClick(props.id)
}

const Sushi = (props) => {
  return (
    <div className="sushi">
      <div className="plate" 
           onClick={()=> handleClick(props)}>
        { 
          props.eaten ? null : <img src={props.img_url} width="100%" />
        }
      </div>
      <h4 className="sushi-details">
        {props.name} - ${props.price}
      </h4>
    </div>
  )
}

export default Sushi