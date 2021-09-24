import React, { Component } from 'react'
import './App.css'
import butcherPig from './assets/butcherPig.jpeg'

class App extends Component{
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button (test: alpha through yummy squeal queen fry)
      phraseTranslated: "This is where your translated sentence will appear."
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    
    // no need to change this variable
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // i,e: ['alpha', 'through', 'yummy', 'squeal', 'queen', 'fry']
    let userInput = this.state.phrase.split(" ") 
    console.log("userInput:", userInput)

    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(word => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      console.log("currentWord:", word)

      let vowelsArray = word.split("").filter(vowel => {
        return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"//try refactoring with set and set.has
      })
      console.log("vowelsArray:", vowelsArray)

      // your code here!
      
      // Other special characters to consider @#$%^* " " ( ) &
      //!?,.:; => returned at the end of the word
      //'- => leave as is


      //first case - no vowels
      if(vowelsArray.length === 0){ 
      //checks to see if vowelsArray is empty
        console.log("no vowels"); //check
        return word.slice(word.indexOf("y")) + word.slice(0, word.indexOf("y")) + "ay";
        //reassign word: (slice of word from y to end of word + beginning of word to letter before y + ay)
      }

      //second case - starts with vowels
        //uses regular expressions where / represents the start and end of regexÅ
        //match() w/ g flag: will return the word if it matches (see line 64)
      //added before qu case because under would break the qu case logic
      else if(word[0].match(/[aeiou]/g)){ //changed
      //if first char is a vowel, return the vowel in an array => equals true 
        console.log("starts with vowel"); //check
        return word + "way";
        //reassign word with way at end
      }

      //third case - words that begin with qu or qu as first syllable
      else if(vowelsArray[0]=== "u" && word[word.indexOf("u")-1] === "q"){
      //tests to see if word has qu
        console.log("qu case"); //check
        return word.slice(word.indexOf(vowelsArray[1])) + word.slice(0, word.indexOf(vowelsArray[1])) + "ay";
        //reassign word: (slice of word from second vowel to end of word + beg of word to u + ay)
      }
      
      //third case - starts with consonants
      else if (!word[0].match(/[aeiou]/g)){ //changed
      //tests if first char is consonant )(!vowel)
        console.log("starts with consonant"); //check
        return word.slice(word.indexOf(vowelsArray[0])) + word.slice(0, word.indexOf(vowelsArray[0])) + "ay";
        //reassign word: (slice of word from first vowel to end of word + beg of word to first vowel + ay)
      }
      
      //catch all for errors
      else{
        return "ERROR"
      }

    })

    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({phraseTranslated: translatedWords})
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "",
      phraseTranslated: "This is where your translated sentence will appear."
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({phrase: e.target.value})
  }

  render() {
    return (
      <>
      <div className = "background">
        <h1>Pig Latin Translator</h1>
        {/* change src (ln 122) and (ln3) to import different photos with different names*/}
        <img
          src={butcherPig} 
          alt="pig with butcher cut names in pig latin"
          className="butcherPig"
        />
        <div className="inputArea">
          <h4>Enter phrase to be translated:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={this.setUpPreventDefault}>Submit</button>
          <button onClick={this.restartGame}>Clear</button>
        </div>
        <p>{this.state.phraseTranslated}</p>
        <footer>Coded by Ashley and Rebecca</footer>
        </div>
        </>
    )
  }
}

export default App
