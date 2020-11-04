import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { View, StyleSheet , Text } from 'react-native';




const header = (props) => (
    <View style = {styles.container}>
        <Text style = {styles.text}>{props.heading}</Text>
        { props.active ? <Icon name="microphone-slash" style = {styles.icon} size={36}  onPress={props.clicked}/> : <Icon name="microphone" size={36} onPress = {props.clicked} style = {styles.icon1} /> }
    </View>
    
);




const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      height: 100,
      borderBottomColor: 'white',
      borderBottomWidth: 2,
    },
    
    text: {
      color: 'white',
      fontSize: 40,
      textAlign: 'left',
      paddingLeft: 15,
      paddingTop: 20,

    },
    icon: {
      borderRadius: 50,
      width: 76,
      height: 76,
      paddingTop: 19,
      paddingLeft: 25,
      backgroundColor: 'red',
      color: 'black',
      marginTop: 10,
      position: 'absolute',
      top: 0,
      right: 0,
      marginRight: 15,
    
  },
  icon1: {
      borderRadius: 50,
      width: 76,
      height: 76,
      paddingTop: 19,
      paddingLeft: 27,
      backgroundColor: 'green',
      color: 'black',
      marginTop: 10,
      position: 'absolute',
      top: 0,
      right: 0,
      marginRight: 15,

  },
  
  });

export default header;