import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const home = () => {
  return (
    
    <View style={styles.container}>
      <Image style={styles.logo}source={require('../assets/images/workers.png')}
    />
    <Text style={styles.Text1}>UJENZI APP</Text>
    <Image style={styles.image}source={require('../assets/images/const.jpg')}/>
    <View style={styles.Overlay}>
      <Text style={styles.Text}> 
         Welcome to ConstructSmart!{'\n'}
          Your trusted partner in managing construction expenditures and material usage efficiently.{'\n'}
          We're here to help you stay on budget, track resources effectively, and make informed decisions for every project.{'\n'}
          Let's build smarter, together!</Text>
      </View>
      <View style={styles.link}>
      <TouchableOpacity style={styles.button} >
      <Link href='CreateprojectScreen'  >Create Project</Link>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button1}   >
      <Link href='LoginScreen'   >Login</Link>
      </TouchableOpacity>
      </View>
      <View style={styles.link}>
      <TouchableOpacity style={styles.button} >
      <Link href='RegisterIntoExistingProject'  >Register Into Existing Project</Link>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button1}   >
      <Link href='LoginIntoExistingProject'   >Login Into Existing Project</Link>
      </TouchableOpacity>
      </View>
      
    </View>
    
  )
}

export default home


  const styles = StyleSheet.create({
    container: {
      flex: 1,   // Ensures full screen
    
      backgroundColor: '#F7E4DE',
    },
    Text: {
      fontSize: 18,
    fontWeight: 'bold',
    color: '#9A340C',
    textAlign: 'center',
    },
    Text1: {
      fontSize: 18,
    fontWeight: 'bold',
    color: 'brown',
    textAlign: 'center',
    },
    

    logo:{
      
      marginTop:20,
      width:40,
      height:40,
      marginLeft:150,

    },
  image:{
      width:'100%',
      resizeMode:'cover',
    height:300,

      marginTop:50,
      
     
    },
    Overlay:{
      position:'absolute',
      marginTop:380,
      padding:10,
      width:'100%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      
    },

    button:{
      marginTop:150,
      backgroundColor: '#9A340C',
      height:70,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:8,
      paddingHorizontal:10,
      paddingVertical:5,
      width:'40%',
      marginLeft:20
    
      

    },
    button1:{
      marginTop:150,
      backgroundColor: '#9A340C',
      height:70,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:8,
      paddingHorizontal:10,
      paddingVertical:5,
      width:'40%',
      marginRight:20,
      

    },

    link:{
      flexDirection:'row',
      justifyContent:'space-between',
      height:100

    },

  });
