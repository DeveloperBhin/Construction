import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker'

const Report = () => {
  const [material, setMaterial] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); 

  useEffect(() => {
    fetchMaterial();
  }, []);

  const fetchMaterial = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.167.150:8000/FinanceMaterial/', {
        method: 'GET',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482", 'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const updatedData = data.map(item => ({
        ...item,
        Quantity_Needed: '',
        price_Per_Quantity: '',
        Total_Amount: '',
      }));
      setMaterial(updatedData);
    } catch (error) {
      console.error("Error fetching material:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRow = (index, field, value) => {
    const updatedMaterial = [...material];
    updatedMaterial[index][field] = value;
    setMaterial(updatedMaterial);
  };

  const deleteTransaction = (id) => {
    setMaterial(material.filter(item => item.id !== id));
  };

  const handleSupplier = async () => {
    const isEmpty = material.some(item => 
      item.Quantity_Needed === '' || 
      item.Quantity_Available === '' ||
      item.price_Per_Quantity === '' || 
      item.SupplierStatus === '' ||
      item.Total_Amount === ''
    );

    if (material.length === 0 || isEmpty) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://192.168.167.150:8000/SupplierReport/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482", "Content-Type": "application/json",
        },
        body: JSON.stringify({ supplierform: material }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Form submitted successfully!");
        navigation.navigate('supplier/(tabs)', { screen: 'Home' });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while submitting reports.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.inputContainer}>
     <Text style={styles.itemText}>💰 material ID: {item.id}</Text>
           <Text style={styles.itemText}>💲 material Name: {item.name}
              <TextInput
                          style={{ height: 0, opacity: 0 }} 
                          value={item.name} 
                          editable={false} 
                        />
           </Text>
           <Text style={styles.itemText}>💲 material Amount Neede: {item.amount}
              <TextInput
                          style={{ height: 0, opacity: 0 }} 
                          value={item.amount} 
                          editable={false} 
                        />
           </Text>
           <Text style={styles.itemText}>💲 material Price Per Amount: {item.price}
              <TextInput
                          style={{ height: 0, opacity: 0 }} 
                          value={item.price} 
                          editable={false} 
                        />
           </Text>
           <Text style={styles.itemText}>💲 material Total Amount: {item.total}
              <TextInput
                          style={{ height: 0, opacity: 0 }} 
                          value={item.total} 
                          editable={false} 
                        />
           </Text>
           <Text style={styles.itemText}>💲 Finance Feedback Status: {item.Status}
              <TextInput
                          style={{ height: 0, opacity: 0 }} 
                          value={item.Status} 
                          editable={false} 
                        />
           </Text>
           
      <TextInput
        style={styles.input}
        placeholder="Quantity Needed"
        keyboardType="numeric"
        value={item.Quantity_Needed}
        onChangeText={(text) => updateRow(index, 'Quantity_Needed', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Available Quantity"
        keyboardType="numeric"
        value={item.Quantity_Available}
        onChangeText={(text) => updateRow(index, 'Quantity_Available', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Quantity"
        keyboardType="numeric"
        value={item.price_Per_Quantity}
        onChangeText={(text) => updateRow(index, 'price_Per_Quantity', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Amount"
        keyboardType="numeric"
        value={item.Total_Amount}
        onChangeText={(text) => updateRow(index, 'Total_Amount', text)}
      />
 <Picker
        selectedValue={item.SupplierStatus}
        style={styles.picker}
        onValueChange={(itemValue) => updateRow(index, 'SupplierStatus', itemValue)}
      >
        <Picker.Item label='Pending' value='Pending' />
        <Picker.Item label='Approved' value='Approved' />
        <Picker.Item label='Rejected' value='Rejected' />
     
      </Picker>
      <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Material Reports</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#9A340C" />
      ) : material.length > 0 ? (
        <FlatList
          data={material}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No Material available</Text>
      )}

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#D84315" />
        ) : (
          <Button title="Submit" onPress={handleSupplier} />
        )}

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  inputContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  picker: { width: '100%', backgroundColor: '#fff', marginVertical: 8 },
  fileButton: { backgroundColor: '#eee1f1', padding: 1, borderRadius: 8, marginVertical: 8,borderColor:'black', },
  message: { marginTop: 10, color: 'white', fontWeight: 'bold' },
  deleteButton: {
    marginTop: 10,
  },
});
