import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton';
import Sushi from '../components/Sushi';

const makeSushis = (props) => {
  return props.sushis.map(sushi=>{
    return <Sushi {...sushi} key={sushi.id} handleClick={props.handleClick}/>
  })
}

const SushiContainer = (props) => {

  return (
    <Fragment>
      <div className="belt">
        {
         makeSushis(props)
        }
        <MoreButton handleMore={props.handleMore}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer