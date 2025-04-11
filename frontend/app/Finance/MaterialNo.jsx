import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const ExpenditureNoScreen = () => {
  const [name,setName]= useState('')
 

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleName = async () => {
    setLoading(true); // Start loading
    setMessage(''); // Clear previous messages

    try {
     
      const response = await fetch('http://192.168.1.150:8000/FinanceMaterialname/', {
        method: 'POST',
        headers: { 
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482",  'Content-Type': 'application/json' },
        body:JSON.stringify({name}),
      });

      if (response.ok) {
     
        // If the response is OK, navigate to the LoginScreen
        navigation.navigate('Finance/(tabs)', { screen: 'Home' });
      } else {
        // If the response is not OK, try to parse the error message
        const data = await response.json();
        setMessage(data.message || 'An error occurred.'); // Fallback message
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setMessage('An error occurred while trying to register.'); // User-friendly message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (

    <View style={styles.container}>
     
      <View style={styles.container1}>
        <TextInput
          style={styles.TextInput}
          placeholder="Add Material name"
          value={name}
          onChangeText={setName}
        />
      
      

       
        

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Add" onPress={handleName} />
        )}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
};

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
    

  },
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  inputContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  picker: { width: '100%', backgroundColor: '#fff', marginVertical: 8 },
  fileButton: { backgroundColor: '#eee1f1', padding: 1, borderRadius: 8, marginVertical: 8,borderColor:'black', },
  message: { marginTop: 10, color: 'white', fontWeight: 'bold' },

});

export default ExpenditureNoScreen;