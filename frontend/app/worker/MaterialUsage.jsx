import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MaterialUsage = () => {
  const [materialname, setMaterialname] = useState('');
  const [Quantity_taken, setQuantity_taken] = useState('');
  const [Quantity_usage, setQuantity_usage] = useState('');
  const [Remaining, setRemaining] = useState('');
  const [Usage_date, setUsage_date] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleMaterialUsage = async () => {
    setLoading(true);
    setMessage('');

    // Validate inputs
    if (!materialname || !Quantity_taken || !Quantity_usage || !Remaining || !Usage_date) {
      setMessage('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('materialname', materialname);
      formData.append('Quantity_taken', parseFloat(Quantity_taken) || 0); // Ensure numeric value, fallback to 0
      formData.append('Quantity_usage', parseFloat(Quantity_usage) || 0); // Ensure numeric value, fallback to 0
      formData.append('Remaining', parseFloat(Remaining) || 0); // Ensure numeric value, fallback to 0
      formData.append('Usage_date', Usage_date);

      const response = await fetch('http://192.168.219.150:8000/WorkerMaterialUsage/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      });

      if (response.ok) {
        setMessage('Report generated successfully');
        setMaterialname('');
        setQuantity_taken('');
        setQuantity_usage('');
        setRemaining('');
        setUsage_date('');
        navigation.navigate('worker/(tabs)', { screen: 'Home' });
      } else {
        const data = await response.json();
        setMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setMessage('An error occurred while trying to generate report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input Form */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Material Name"
          value={materialname}
          onChangeText={setMaterialname}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity Taken"
          keyboardType="numeric"
          value={Quantity_taken}
          onChangeText={setQuantity_taken}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity Used"
          keyboardType="numeric"
          value={Quantity_usage}
          onChangeText={setQuantity_usage}
        />
        <TextInput
          style={styles.input}
          placeholder="Remaining Quantity"
          keyboardType="numeric"
          value={Remaining}
          onChangeText={setRemaining}
        />
        
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Due Date"
            value={Usage_date}
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setUsage_date(selectedDate.toISOString().split('T')[0]);
            }}
          />
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#9A340C" />
        ) : (
          <Button title={'Add Report'} onPress={handleMaterialUsage} />
        )}

        {message ? <Text style={[styles.message, message.includes('error') && styles.errorMessage]}>{message}</Text> : null}
      </View>
    </View>
  );
};

export default MaterialUsage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  inputContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  picker: { width: '100%', backgroundColor: '#fff', marginVertical: 8 },
  fileButton: { backgroundColor: '#eee1f1', padding: 1, borderRadius: 8, marginVertical: 8, borderColor: 'black' },
  message: { marginTop: 10, fontWeight: 'bold', color: 'green' },
  errorMessage: { color: 'red' },
});
