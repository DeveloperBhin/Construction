import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';


const Project = () => {

  const [Startingdate, setStartingdate] = useState('');
  const [Budget, setBudget] = useState('');
  const [End_date, setEnd_date] = useState('');
  const [loading, setLoading] = useState(false);
  const[message,setMessage] = useState('')
  const navigation = useNavigation();
  const [showstartDatePicker, setShowstartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);




  const handleProject = async () => {
    setLoading(true); // Start loading
    setMessage(''); // Clear previous messages

    try {
      const requestData = {
      
      Startingdate,
      Budget,
     End_date
      }
    

      const response = await fetch('http://192.168.1.150:8000/SupervisorProject/', {
        method: 'POST',
        headers: { 
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482",  'Content-Type':  "application/json",

        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        setMessage('Report generated succesfully');
        setStartingdate('');
        setBudget('');
        setEnd_date('');
        


        
        navigation.navigate('sitesupevisor/(tabs)', { screen: 'Home' });
      
      } else {
        // If the response is not OK, try to parse the error message
        const data = await response.json();
        setMessage(data.message || 'An error occurred.'); // Fallback message
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setMessage('An error occurred while trying to generate'); // User-friendly message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {/* Input Form */}
      <View style={styles.inputContainer}>

       <TouchableOpacity onPress={() => setShowstartDatePicker(true)}>
  <TextInput style={styles.input} placeholder="Start Date" value={Startingdate} editable={false} />
</TouchableOpacity>
{showstartDatePicker && (
  <DateTimePicker
    value={new Date()}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setShowstartDatePicker(false);
      if (selectedDate) setStartingdate(selectedDate.toISOString().split('T')[0]);
    }}
  />
)}
        <TextInput style={styles.input} placeholder="Total Budget" keyboardType='numeric' value={Budget} onChangeText={setBudget} />
     
        
<TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
  <TextInput style={styles.input} placeholder="End Date" value={End_date} editable={false} />
</TouchableOpacity>
{showEndDatePicker && (
  <DateTimePicker
    value={new Date()}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setShowEndDatePicker(false);
      if (selectedDate) setEnd_date(selectedDate.toISOString().split('T')[0]);
    }}
  />
)}



      
       {loading ? (
                <ActivityIndicator size="large" color="#D84315" />
              ) : (
                <Button title="Submit" onPress={handleProject} />
              )}
      
              {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
  
    </View>
  );
};

export default Project;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  inputContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  picker: { width: '100%', backgroundColor: '#fff', marginVertical: 8 },
  fileButton: { backgroundColor: '#eee1f1', padding: 1, borderRadius: 8, marginVertical: 8,borderColor:'black', },
  message: { marginTop: 10, color: 'white', fontWeight: 'bold' },
});


