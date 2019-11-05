import React, { Fragment } from 'react'

const Table = (props) => {

  const renderPlates = (array) => {
    return array.map((x, index) => {
      return <div className="empty-plate" style={{ top: -7 * index }}/>
    })
  }

  return (
    <Fragment>
      <h1 className="remaining">
        You have: ${ props.money} remaining!
      </h1>
      
      <div className="table">
      <div>
        <form onSubmit={(event)=>props.addMoney(event)}>
          <input type="number" name="money" value={props.valueToAdd} onChange={(event)=>props.getValue(event)}/>
            <input type="submit"/>
          </form>
        </div>
        <div className="stack">
          {
            /* 
               renderPlates takes an array 
               and renders an empty plate
               for every element in the array
            */
            renderPlates(props.eatenSushi)
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Table