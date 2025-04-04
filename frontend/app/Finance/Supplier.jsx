import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';


const ClientReport = () => {

  const [Task, setTask] = useState('');
  const [Status, setStatus] = useState('Not Started ');
  const [Assignees, setAssignees] = useState('');
  const[DueDate,setDueDate] = useState('');
  const[Tags,setTags] = useState('Medium priority');
  const[File,setFile] =useState('')
  const [loading, setLoading] = useState(false);
  const[message,setMessage] = useState('')
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);


  const handlePickFile= async() =>{
    try{
      const result = await DocumentPicker.getDocumentAsync({type:'*/*'} );

      console.log('File Picked :',result);
    
     if (result.type==='success'){
      setFile(result);
    }
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFile(result.assets[0]); 
    }
  }
  catch(error){
    console.error('File selection error',error);

  }
};

  const handleClientReport = async () => {
    setLoading(true); // Start loading
    setMessage(''); // Clear previous messages

    try {
      const formData = new FormData();
      
      formData.append('Task',Task);
      formData.append('Status',Status);
      formData.append('Assignees',Assignees);
      formData.append('DueDate',DueDate);
      formData.append('Tags',Tags);
      if (File){
        formData.append('File',{
          uri:File.uri,
          name:File.name,
          type:File.mimeType||'application/octet-stream',
        });

      }

      const response = await fetch('http://192.168.167.150:8000/Clients/', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data'

        },
        body: formData
      });

      if (response.ok) {
        setMessage('Report generated succesfully');
        setTask('');
        setStatus('Not started');
        setAssignees('');
        setDueDate('Medium priority');
        setTags('');
        setFile();


        
        navigation.navigate('ClientsManage');
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
        <TextInput style={styles.input} placeholder="Task" value={Task} onChangeText={setTask} />
        <Picker selectedValue={Status} placeholder="Status" style={styles.picker} onValueChange={(itemValue)=>setStatus(itemValue)}>
          <Picker.Item label='Not Started' value='Not Started'/>
          <Picker.Item label='In Process' value='In Process'/>
          <Picker.Item label='Completed' value='Completed'/>
          <Picker.Item label='Closed' value='Closed'/>
        </Picker>
        
        <TextInput style={styles.input} placeholder="Assignees" value={Assignees} onChangeText={setAssignees} />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
  <TextInput style={styles.input} placeholder="Due Date" value={DueDate} editable={false} />
</TouchableOpacity>
{showDatePicker && (
  <DateTimePicker
    value={new Date()}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) setDueDate(selectedDate.toISOString().split('T')[0]);
    }}
  />
)}

<Picker selectedValue={Tags} placeholder="Tags" style={styles.picker} onValueChange={(itemValue)=>setTags(itemValue)}>
          <Picker.Item label='High priority' value='High priority'/>
          <Picker.Item label='Medium priority' value='Medium priority'/>
          <Picker.Item label='Low priority' value='Low priority'/>
        
        </Picker>
        <TouchableOpacity style={styles.fileButton} onPress={handlePickFile}>
          <Text style={styles.fileButton}>Pick a File</Text>
        </TouchableOpacity>
        {File && File.name ? <Text style={styles.filename}>selected:{File.name}</Text> :null}
      
    

      
      {loading ? (
        <ActivityIndicator size="large" color="#9A340C" />
      ):
      (
     <Button title={'Add Report'} onPress={handleClientReport}/> ) }
     
        { message ? <Text style={styles.message}>{message}</Text>:null}
        </View>
  
    </View>
  );
};

export default ClientReport;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  inputContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  picker: { width: '100%', backgroundColor: '#fff', marginVertical: 8 },
  fileButton: { backgroundColor: '#eee1f1', padding: 1, borderRadius: 8, marginVertical: 8,borderColor:'black', },
  message: { marginTop: 10, color: 'white', fontWeight: 'bold' },
});


