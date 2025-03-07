import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const home = () => {
  return (
    
    <View style={styles.container}>
      <View style={styles.container1}>
    
    <TextInput 
    style={styles.TextInput}
    placeholder='create_project_name'
    value='project name'
    
    />
   <TextInput 
   style={styles.TextInput}
    placeholder='create_project_code'
    value='project code'
    
    />
  
   <TextInput 
   style={styles.TextInput}
    placeholder='create_project_password'
    value='project password'
    
    />
  
   
    
      <TouchableOpacity style={styles.button}   title='Register'>
      <Link href='Home'   >Login</Link>
      </TouchableOpacity>
      
    </View>
    </View>
    
  )
}

export default home


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
        // Ensures full screen
    
      backgroundColor: '#F7E4DE',
    },
    container1: {
      flex: 1, 
      backgroundColor: '#9A340C',
     
      justifyContent:'center',
      alignItems:'center',
      borderRadius:18,
      paddingHorizontal:55,
      paddingVertical:55,
      marginBottom:55,
      marginTop:30,  // Ensures full screen
    
      
    },
    TextInput: {
      fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    },
    Text1: {
      fontSize: 18,
    fontWeight: 'bold',
    color: '#9A340C',
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
      backgroundColor: 'blue',
      height:30,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:8,
      paddingHorizontal:10,
      paddingVertical:5,
      width:'50%',
      marginLeft:90,
      

    },
    button1:{
      marginTop:5,
      backgroundColor: '#9A340C',
      height:30,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:8,
      paddingHorizontal:10,
      paddingVertical:5,
      width:'50%',
      marginLeft:90,
      

    }

  });
