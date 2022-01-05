


import React, { Component } from "react";
import CharacterCard from "./Component/Card";
import Wrapper from "./Component/Waber";
import Navbar from "./Component/Nav";
import Jumbo from "./Component/jub";
import characters from "./characters.json";
import "./App.css";

class App extends Component {
  state = {
    characters,
    highScore: 0,
    currentScore: 0,
    Clicked: false
  };

  handleClick = id => {
    this.shuffleArray();
    this.handleScore(id);
    console.log(this.state.Clicked);
  };

  handleScore = id => {
    this.state.characters.superheroes.forEach(element => {
      if (id === element.id && element.clicked === false) {
        element.clicked = true;
        this.setState({ Clicked: false });
        this.handleIncrement();
      } else if (id === element.id && element.clicked === true) {
        if (this.state.currentScore > this.state.highScore) {
          this.setState({ highScore: this.state.currentScore });
        }
        this.setState({ currentScore: 0 });
        this.setState({ Clicked: true });
        this.state.characters.superheroes.forEach(element => (element.clicked = false));
        console.log(this.state.characters.superheroes);
      }
    });
  };
  shuffleArray = () => {
    
    const shuffledArr = this.shuffle(this.state.characters.superheroes);
    this.setState({ shuffledArr });
  };
  handleIncrement = () => {
    
    this.setState({ currentScore: this.state.currentScore + 1 });
  };
  shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  render() {
    return (
      <Wrapper>
        <Navbar
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
        />
        <Jumbo />
        {
         this.state.characters.superheroes.map(character => (
          <CharacterCard
            Clicked={this.state.Clicked}
            handleClick={this.handleClick}
            id={character.id}
            key={character.id}
            name={character.name}
            image={character.image}
            occupation={character.occupation}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;