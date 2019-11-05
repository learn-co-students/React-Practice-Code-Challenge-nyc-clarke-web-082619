import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(){
    super()
    this.state={
      sushis: [],
      currentIndex: 0,
      money: 100,
      eatenSushi: [],
      valueToAdd: 0
    }
  }

  getSushis = () => {
    fetch(API)
    .then(resp=>resp.json())
    .then(data => {
      console.log(data)
      this.setState({
        sushis: data
      })
    })
  }

  setEatenFalse = () => {
    let sushis = [...this.state.sushis]
    sushis.forEach(sushi=> {
      sushi["eaten"] = false;
    })
    this.setState({
      sushis: sushis
    })
  }

  handleClick = (id) => {
    let sushis = [...this.state.sushis]
    let sushi = sushis.find(sushi=> {
      return sushi.id === id
    })
    if(sushi.price>this.state.money || sushi.eaten){
      return false
    }
    sushi.eaten = true;
    let eatenSushi = [...this.state.eatenSushi];
    eatenSushi.push(id);
    this.setState(previousState=> {
      return{
      sushis: sushis,
        money: previousState.money - sushi.price,
        eatenSushi: eatenSushi
    }})
  }

  handleMore = () => {
    let num = this.state.sushis.length - this.state.currentIndex;
    if(num<=4){    
      let sushis = [...this.state.sushis];
      for(let i=0; i<num; i++){
        let sushi = sushis.pop()
        sushis.unshift(sushi)
      }
      this.setState({
        sushis: sushis,
        currentIndex: 0
      })
      return false
    }
    let currentIndex = this.state.currentIndex + 4;
    this.setState({
      currentIndex: currentIndex
    })
  }

  addMoney = (event) => {
    event.preventDefault();
    this.setState(previousState=>{
      return{
      money: previousState.money + this.state.valueToAdd
    }})
  }

  getValue = (event) => {
    this.setState({
      valueToAdd: parseInt(event.target.value)
    })
  }

  componentDidMount(){
    this.getSushis();
    this.setEatenFalse();
  }

  render() {
    return (
      <div className="app">
        <SushiContainer  sushis={this.state.sushis.slice(this.state.currentIndex, this.state.currentIndex+4)} 
        handleClick={this.handleClick}
        handleMore={this.handleMore}/>
        <Table money={this.state.money} eatenSushi={this.state.eatenSushi} 
        getValue={this.getValue} addMoney={this.addMoney}/>
      </div>
    );
  }
}

export default App;