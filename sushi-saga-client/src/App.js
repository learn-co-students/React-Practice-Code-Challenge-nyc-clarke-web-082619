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
      eatenSushi: []
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
    let currentIndex = this.state.currentIndex + 4;
    this.setState({
      currentIndex: currentIndex
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
        <Table money={this.state.money} eatenSushi={this.state.eatenSushi}/>
      </div>
    );
  }
}

export default App;