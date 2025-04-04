import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const workerAtendance = () => {
  const [status, setStatus] = useState('Present');
  const [check_in, setCheck_in] = useState('');
  const [date, setDate] = useState('');
  const [check_out, setCheck_out] = useState('');
  const [PerformedWork, setPerformedWork] = useState('');
  const [workinghrs, setWorkinghrs] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeInPicker, setShowTimeInPicker] = useState(false);
  const [showTimeOutPicker, setShowTimeOutPicker] = useState(false);

  const handleWorkerLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('status', status);
      formData.append('date', date);
      formData.append('check_in', check_in);
      formData.append('check_out', check_out);
      formData.append('workinghrs',workinghrs)
      formData.append('PerfomedWork', PerformedWork);

      const response = await fetch('http://192.168.165.150:8000/WorkerAttendance/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        setMessage('Report generated successfully');
        setStatus('Present');
        setCheck_in('');
        setCheck_out('');
        setDate('');
        setPerformedWork('');
        setWorkinghrs('');
        navigation.navigate('worker/(tabs)', { screen: 'Home' });
      } else {
        const data = await response.json();
        setMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setMessage('An error occurred while trying to generate');
    } finally {
      setLoading(false);
    }
  };

  // Calculate the difference between check-in and check-out times
  useEffect(() => {
    if (check_in && check_out) {
      const checkInTime = new Date(`1970-01-01T${check_in}:00Z`);
      const checkOutTime = new Date(`1970-01-01T${check_out}:00Z`);
      const diffInMs = checkOutTime - checkInTime;

      if (diffInMs > 0) {
        const hours = Math.floor(diffInMs / 1000 / 60 / 60);
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        setWorkinghrs(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);
      }
    }
  }, [check_in, check_out]);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Worker Attendance</Text>
        <Picker selectedValue={status} style={styles.picker} onValueChange={(itemValue) => setStatus(itemValue)}>
          <Picker.Item label='Present' value='Present' />
          <Picker.Item label='Absent' value='Absent' />
          <Picker.Item label='Late' value='Late' />
          <Picker.Item label='Sick' value='Sick' />
          <Picker.Item label='On Leave' value='On Leave' />
        </Picker>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput style={styles.input} placeholder="Due Date" value={date} editable={false} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate.toISOString().split('T')[0]);
            }}
          />
        )}

<TouchableOpacity onPress={() => setShowTimeInPicker(true)}>
  <TextInput
    style={styles.input}
    placeholder="Start Time"
    value={check_in}  // Display the formatted time
    editable={false}   // Prevent manual editing
  />
</TouchableOpacity>

{showTimeInPicker && (
  <DateTimePicker
    value={new Date()}  // Default to current time
    mode="time"
    display="default"
    onChange={(event, selectedTime) => {
      setShowTimeInPicker(false); // Hide the picker once the time is selected
      if (selectedTime) {
        // Format the time as HH:mm (remove seconds and milliseconds)
        const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setCheck_in(formattedTime); // Update the state with the formatted time
      }
    }}
  />
)}


<TouchableOpacity onPress={() => setShowTimeOutPicker(true)}>
  <TextInput
    style={styles.input}
    placeholder="Start Time"
    value={check_out}  // Display the formatted time
    editable={false}   // Prevent manual editing
  />
</TouchableOpacity>

{showTimeOutPicker && (
  <DateTimePicker
    value={new Date()}  // Default to current time
    mode="time"
    display="default"
    onChange={(event, selectedTime) => {
      setShowTimeOutPicker(false); // Hide the picker once the time is selected
      if (selectedTime) {
        // Format the time as HH:mm (remove seconds and milliseconds)
        const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setCheck_out(formattedTime); // Update the state with the formatted time
      }
    }}
  />
)}



        <TextInput
          style={styles.input}
          placeholder="Performed Task"
          value={PerformedWork}
          onChangeText={setPerformedWork}
        />

        <Button title="Submit" onPress={handleWorkerLogin} />

        {loading && <ActivityIndicator size="large" color="#9A340C" />}
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

export default workerAtendance;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  inputContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  picker: { width: '100%', backgroundColor: '#fff', marginVertical: 8 },
  message: { marginTop: 10, color: 'white', fontWeight: 'bold' },
});
