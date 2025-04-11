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
      const response = await fetch('http://192.168.1.150:8000/FinanceMaterial/', {
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
           <Text style={styles.itemText}>💲 material Amount Needed: {item.amount}
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
           <Text style={styles.itemText}>💲 Quality Assurance Feedback Status: {item.Status}
              <TextInput
                          style={{ height: 0, opacity: 0 }} 
                          value={item.Status} 
                          editable={false} 
                        />
           </Text>
           
 
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
