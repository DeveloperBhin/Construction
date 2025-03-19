import { StyleSheet, Text, View ,TextInput,Button,ActivityIndicator,Alert} from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'

import { useNavigation } from 'expo-router'

const Login = () => {
  
  const[username,setUsername] =useState('');
  const[password,setPassword] = useState('');
  const[message,setMessage] =useState ('') ;
  const navigation = useNavigation('');
  const[loading,setLoading] =useState('');

  const handleLogin =async()=>{
    setMessage('')
    setLoading(true)

    try{
      const Response = await fetch ('http://192.168.92.150:8000/Login/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username,password}),
      });
      if(Response.ok){
        navigation.navigate('(tabs)', { screen: 'Home' });

      }else {
        // If the response is not OK, try to parse the error message
        const data = await Response.json();
        setMessage(data.message || 'An error occurred.'); // Fallback message
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setMessage('An error occurred while trying to register.'); // User-friendly message
    } 
    finally{
      setLoading(false);

}

  };
  return (
    
    <View style={styles.container}>
      <View style={styles.container1}>
    
      <TextInput
          style={styles.TextInput}
          placeholder="Project Name"
          value={username}
          onChangeText={setUsername}
        />
      
        <TextInput
          style={styles.TextInput}
          placeholder="Project Code"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
   
   {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={handleLogin} />
        )}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      
    </View>
    </View>
    
  )
}

export default Login


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
