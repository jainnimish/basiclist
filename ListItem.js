import React from 'react';
import { StyleSheet , ScrollView, View } from 'react-native';

import Delete from './Delete';

const listItem = (props) => {
    const list = props.list;
    const listItems = list.map((item,index) =>{
    return <View key = {index}>
                <Delete content = {item} Datakey = {index} onDelete = {props.clicked}></Delete>
            </View>

    });
        

   

return( 
        <ScrollView style = {styles.container}>
            {listItems}
        </ScrollView>

    )};

const styles = StyleSheet.create({
 container: {
    backgroundColor: 'black',
    
   },
});

export default listItem;