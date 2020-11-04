import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Voice from '@react-native-community/voice';
import Header from './Header';
import ListItem from './ListItem';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-community/async-storage';


class App extends Component {

constructor(props) {
  super(props)
  this.getItem();
  this.getListItem();
  Voice.onSpeechRecognized = this.onSpeechRecognized;
  Voice.onSpeechError = this.onSpeechError;
  Voice.onSpeechResults = this.onSpeechResults;
  Voice.onSpeechEnd = this.onSpeechEnd;
}

state = {
  recognized: '',
  error: '',
  results: [],
  wildcardData: "Basic list",
  active: true
};


onSpeechRecognized = (e) => {
  console.log('onSpeechRecognized: ', e);
  this.setState({
    recognized: '√',
  });
};

onSpeechEnd = () => {
  setTimeout(() => {
    Voice.start('en-US')
    }, 2000);
}



onSpeechError = (e) => {
  console.log('onSpeechError: ', e);
  this.setState({
    error: JSON.stringify(e.error),
  });
};


onSpeechResults = (e) => {
  var list = [...this.state.results]
  var word = e.value[0]
  var firstWord = word.split(" ");

  if(word === "add" && firstWord[0] === "add"){
    Tts.speak("Please say something after add")
  }

  
  if(word === "remove" && firstWord[0] === "remove"){
    Tts.speak("Please say something after remove")
  }

  
  if(word === "create" && firstWord[0] === "create"){
    Tts.speak("Please say something after create")
  }
 
  else if(firstWord[0] === "add" && word !== "add"){
    var add = word.slice(3)
    var UpCase = add[1].toUpperCase() + add.slice(2).toLowerCase()
    if(list.includes(UpCase) === true){
      Tts.speak("Word already in list")
    }
    else if(list.includes(UpCase) === false){
      this.setState({results:[...this.state.results, UpCase]});
      Tts.speak( "Added " + UpCase)
      this.storeListItem(this.state.results);
    }
  }    

  //Issue going on with create, clear, tell me my list on real phone. Voice repeating 2 times.
               
  if(firstWord[0] === "create" && word !== "create"){
    var create = word.slice(6)
    var CreateUp = create[1].toUpperCase() + create.slice(2).toLowerCase()
    this.setState({wildcardData: CreateUp});
    this.storeData(this.state.wildcardData);
    Tts.speak("Name is" +  create )
  }
  else if(word === "clear" && list.length !== 0){
    Tts.speak("Removed all items")
    this.setState({results:[]});
    this.storeListItem(this.state.results);
  }
  if (word === "clear" && list.length === 0 ){
    Tts.speak("Nothing to remove")
  }

  else if(word === "tell me my list" && list.length !== 0){
    list.map((item) => {
      setTimeout(() => {Tts.speak(item)}, 1000)
    })
  }
  if (word === "tell me my list" && list.length === 0){
    Tts.speak("No items in list")
  }


  else if(firstWord[0] === "remove" && word !== "remove"){
    var remove = word.slice(6)
    var removeUp = remove[1].toUpperCase() + remove.slice(2).toLowerCase()
    var item = list.indexOf(removeUp)
    if(list.includes(removeUp) === false){
      Tts.speak("Word not in list")
    }
    else if(word.includes("remove") && firstWord[0] === "remove" && list.includes(removeUp) === true){
      Tts.speak("Removed" + removeUp)
      list.splice(item,1);
      this.setState({results:list})
      this.storeListItem(this.state.results);
    }
  }
};

activateDeactivateHandler = () => {
  this.setState({active: !this.state.active});
  if(this.state.active){
    Voice.start('en-US').then(console.log("Started"));
  }else{
    Voice.cancel()
    Voice.destroy()
    Voice.removeAllListeners()
    Voice.stop().then(console.log("Stopped"))
    
  }
};

sayDelete = (index) => {
  var list = [...this.state.results]
  Tts.speak("Removed" + list[index])
}

deleteListItem = (index) => {
  this.sayDelete(index)
  var list = [...this.state.results]
  list.splice(index,1);
  this.setState({results:list})
  this.storeListItem(list);
}


storeData = async (value) => {
  try {
    await AsyncStorage.setItem('wildcard', value)
  } catch (e) {
    console.log(e)
  }
}

getItem = async () => {
  try {
    const value = await AsyncStorage.getItem('wildcard')
    if(value !== null) {
      this.setState({ wildcardData: value })
    }
  } catch(e) {
    console.log(e)
  }
}

storeListItem = async (value) => {
  try {
    await AsyncStorage.setItem('listItem', JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}

getListItem = async () => {
  try {
    const value = await AsyncStorage.getItem('listItem')
    let parsedValue = JSON.parse(value)
    if(value !== null) {
      this.setState({ results: parsedValue })
    }
  } catch(e) {
    console.log(e)
  }
}

render() {
  return (
  <ScrollView style = {styles.blackscreen}>
    <Header heading={this.state.wildcardData} clicked={this.activateDeactivateHandler} active={this.state.active}/>
    <ListItem list={this.state.results} clicked = {this.deleteListItem}/>
  </ScrollView>
);
}}

const styles = StyleSheet.create({
  blackscreen : {
    backgroundColor: "black",
  }
})

export default App;

