import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Awesome stub</Text>
            <Text style={styles.subtitle}>My stub got<Text style={styles.awesome}>style</Text></Text> 
        </View>
        <View style={styles.styleContainer}>
            <Text style={styles.awesome}>style</Text>
            <View style={styles.box}/>
            <Text style={styles.awesome}>style</Text>
            <View style={styles.box}/>
            <Text style={styles.awesome}>style</Text>
            <Text style={[styles.awesome,{fontSize: 50}]}> KILL ME </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        alignItems: 'center',
        margin: 20,
        justifyContent: 'space-between',
        flex: 1
    },
    titleContainer: {
        backgroundColor: "blue"
    },
    title: {
        fontSize: 40,
        fontFamily: 'David',
        fontWeight: 'bold',
        color: 'red',
        //flex: 1
    },
    subtitle: {
        alignSelf: 'center', 
        fontSize: 25,
        fontFamily: 'David',
        fontWeight: 'bold',
        color: 'yellow',
        //flex: 2
    },
    awesome: {
        fontStyle: 'italic',
        backgroundColor: 'red',
        color: 'blue'
    },
    styleContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    box: {
        width: 60, 
        height: 40, 
        backgroundColor: 'powderblue'
    },
    
});
