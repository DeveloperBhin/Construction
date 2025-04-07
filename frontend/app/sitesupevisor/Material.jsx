import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { use } from 'react';
import { FlatList } from 'react-native';


export default function DynamicInputFields() {
  const [numFields, setNumFields] = useState(0);
  const [values, setValues] = useState([]);
  const[price,setpricePerQuantity]=useState('');
  const[total,setTotalAmount] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle number input change
  const handleNumberChange = (text) => {
    const count = parseInt(text, 10) || 0;
    setNumFields(count);
   
    setValues((prevValues) => {
      const newValues = [...prevValues.slice(0, count)];
      while (newValues.length < count) {
        newValues.push({ name: '', amount: '',price: '',total:'' });
      }
      return newValues;
    });
  };

  // Handle text input changes
  const handleFieldChange = (index, field, value) => {
    const updatedValues = [...values];
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    setValues(updatedValues);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!date) {
      setMessage('Please select a date.');
      return;
    }
    if (values.some(({ name, amount , price , total }) => !name.trim() || !amount.trim() || !price.trim() || !total.trim())) {
      setMessage('Please fill in all fields before submitting.');
      return;
    }

    setMessage('');

    
    const formattedData = values.map(({ name, amount , price , total }) => ({
      date,
      name: name.trim(),
      amount: amount.trim(), 
      price: price.trim(),
      total:total.trim(),
    }));
  
    
    try {
      const response = await fetch('http://192.168.167.150:8000/SupervisorRequest/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482", 'Content-Type': 'application/json',
        },
        body: JSON.stringify({ supervisorform: formattedData }),

      });
    
      if (response.ok) {
        setMessage('Fields submitted successfully!');
        setNumFields(0);
        setValues([]);
        setpricePerQuantity('');
        setTotalAmount('');
        setDate('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error submitting:', error);
      setMessage('An error occurred while submitting.');
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dynamic Input Fields</Text>

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput style={styles.input} placeholder="Select Date" value={date} editable={false} />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate.toISOString().split('T')[0]);
          }}
        />
      )}

      
   <TextInput 
        keyboardType="numeric" 
        placeholder="Enter number of fields" 
        onChangeText={handleNumberChange} 
        style={styles.textInput} 
      />

<FlatList
      data = {values}
      keyExtractor={(item,index) => index.toString()}
      renderItem = {({item,index}) =>(
        <View style={styles.inputContainer}>
        <TextInput 
              placeholder={`Name ${index + 1}`} 
              value={item.name} 
              onChangeText={(text) => handleFieldChange(index, 'name', text)} 
              style={styles.textInput} 
            />
            <TextInput 
              placeholder={`Amount ${index + 1}`} 
              value={item.amount} 
              onChangeText={(text) => handleFieldChange(index, 'amount', text)} 
              keyboardType="numeric" 
              style={styles.textInput} 
            />
              <TextInput 
              placeholder={`price Per Amount ${index + 1}`} 
              value={item.price} 
              onChangeText={(text) => handleFieldChange(index, 'price', text)} 
              keyboardType="numeric" 
              style={styles.textInput} 
            />
               <TextInput 
              placeholder={`Total Amount ${index + 1}`} 
              value={item.total} 
              onChangeText={(text) => handleFieldChange(index, 'total', text)} 
              keyboardType="numeric" 
              style={styles.textInput} 
            />
             
          </View>
          
        )
      }
      />
      

      <Button title="Submit" onPress={handleSubmit} />

     
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  inputContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  picker: { width: '100%', backgroundColor: '#fff', marginVertical: 8 },
  fileButton: { backgroundColor: '#eee1f1', padding: 1, borderRadius: 8, marginVertical: 8,borderColor:'black', },
  message: { marginTop: 10, color: 'white', fontWeight: 'bold' },
});

