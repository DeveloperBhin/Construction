import React, { useState, useEffect,userToken } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateProjectScreen = () => {
  const [username,setUsername]= useState('')
  const [password,setPassword] =useState('')
 
  const[TypeOfWork,setTypeOfWork] = useState('Clients');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://192.168.1.150:8000/register-into-existing-project/');
        const data = await response.json();
        setWorkOptions(data); // Assuming API returns a list of project names
      } catch (error) {
        console.error('Error fetching projects:', error);
        setMessage('Failed to fetch work types.');
      }
    };

    fetchWorks();
  }, []);

  const handleCreateProject = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://192.168.104.150:8000/LoginIntoExistingProject/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': `Token ${userToken}`
        },
        body: JSON.stringify({ username,password, TypeOfWork }),
      });

      if (response.ok) {
        setMessage('User registered successfully');

        let tabScreen = '';
        switch (TypeOfWork) {
          case 'Clients':
            tabScreen = 'Client/(tabs)';
            break;
          case 'Finance':
            tabScreen = 'Finance/(tabs)';
            break;
          case 'Worker':
            tabScreen = 'worker/(tabs)';
            break;
          case 'Q.Assurance':
            tabScreen = 'QA/(tabs)';
            break;
          case 'Supplier':
            tabScreen = 'supplier/(tabs)';
            break;
          case 'Site Supervisor':
            tabScreen = 'SiteSupervisor';
            break;
          default:
            console.warn('Invalid TypeOfWork:', TypeOfWork);
            tabScreen = 'Client';
        }
        
        navigation.navigate(tabScreen);
      } else {
        const data = await response.json();
        setMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while trying to register.');
    } finally {
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
        />

<Picker selectedValue={TypeOfWork} placeholder='Type Of Work' style={styles.picker} onValueChange={(itemValue)=>setTypeOfWork(itemValue)}>
            <Picker.Item label='Clients' value='Clients'/>
            <Picker.Item label='Finance' value='Finance'/>
            <Picker.Item label='Worker' value='Worker'/>
            <Picker.Item label='Q.Assurance' value='Q.Assurance'/>
            <Picker.Item label='Supplier' value='Supplier'/>
            <Picker.Item label='Site Supervisor' value='Site Supervisor'/>
          </Picker>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={handleCreateProject} />
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

export default CreateProjectScreen;