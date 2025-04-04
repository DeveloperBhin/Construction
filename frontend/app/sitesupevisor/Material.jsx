import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { use } from 'react';
import { FlatList } from 'react-native';

export default function DynamicInputFields() {
  const [numFields, setNumFields] = useState(0);
  const [values, setValues] = useState([]);
  const[pricePerQuantity,setpricePerQuantity]=useState('');
  const[TotalAmount,setTotalAmount] = useState('');
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
        newValues.push({ name: '', amount: '',price: '',Total:'' });
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
    if (values.some(({ name, amount , price , Total }) => !name.trim() || !amount.trim() || !price.trim() || !Total.trim())) {
      setMessage('Please fill in all fields before submitting.');
      return;
    }

    setMessage('');

    
    const formattedData = values.map(({ name, amount , price , Total }) => ({
      date,
      name: name.trim(),
      amount: amount.trim(),
      price: price.trim(),
      Total:Total.trim(),
    }));
    
    try {
      const response = await fetch('http://192.168.167.150:8000/SupervisorRequest/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData), 
      });
    
      if (response.ok) {
        setMessage('Fields submitted successfully!');
        setNumFields(0);
        setValues([]);
        setpricePerQuantity()
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

      {/* Number of Fields Input */}
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
              value={item.Total} 
              onChangeText={(text) => handleFieldChange(index, 'Total', text)} 
              keyboardType="numeric" 
              style={styles.textInput} 
            />
            
          </View>
          
        )
      }
      />
      

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />

      {/* Message Display */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginBottom: 10 },
  textInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
  inputContainer: { marginBottom: 20 },
  scrollContainer: { marginBottom: 20 },
  message: { color: 'red', textAlign: 'center', marginTop: 10 },
});

