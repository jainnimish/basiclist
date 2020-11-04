import React from 'react';
import { View, StyleSheet , Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const header = (props) => (
   <View style = {styles.content}>
        <Text style={styles.li}>{props.content}</Text>
        <Icon style = {styles.remove} name = "remove" onPress={() => {props.onDelete(props.Datakey)}} size = {30} color = "white"></Icon>
   </View>
);

const styles = StyleSheet.create({
    li: {
        color: 'white',
        textAlign: 'left',
        fontSize: 30,
        fontWeight: "300",
        letterSpacing: 0.15,
        marginTop: 7,
        marginLeft: 15,
        maxWidth: 320,
    },

    remove:{
        marginRight: 10,
        marginTop: 10,
        color: 'white',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingBottom: 7,
        },
  });

export default header;