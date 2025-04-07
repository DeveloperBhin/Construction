import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const Budget = () => {
  const [budget, setBudget] = useState([]);
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBudget();
   
  }, []);

  const fetchBudget = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.167.150:8000/SupplierReport/', {
        method: 'GET',
        headers: {
            "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482", 'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Budget Data:", data); // Debugging Log
      if (Array.isArray(data)) {
        setBudget(data);
      } else {
        setBudget([]);
        setMessage("Invalid data format: Expected a list of items.");
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const deleteTransaction = (id) => {
    setBudget(prevBudget => prevBudget.filter(item => item.id !== id));
  };

  const updateRow = (index, field, value) => {
    setBudget(prevBudget =>
      prevBudget.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };


 

  const renderBudgetItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.itemText}>💰 material ID: {item.id}</Text>
      <Text style={styles.itemText}>💲 material Name: {item.name}</Text>
      <Text style={styles.itemText}>💲 material Amount Needed: {item.amount}</Text>
      <Text style={styles.itemText}>💲 material Price Per Amount: {item.price}</Text>
      <Text style={styles.itemText}>💲 material Total Amount: {item.total}</Text>
      <Text style={styles.itemText}>💲 Finance Feedback Status: {item.Status}</Text>
      <Text>Supplier Report</Text>
      <Text style={styles.itemText}>💲 material Amount Needed: {item.Quantity_Needed}</Text>
      <Text style={styles.itemText}>💲 material Amount Available: {item.Quantity_Available}</Text>
      <Text style={styles.itemText}>💲 material Price Per Quantity: {item.price_Per_Quantity}</Text>
      <Text style={styles.itemText}>💲 material Total Price: {item.Total_Price}</Text>
      <Text style={styles.itemText}>💲 Supplier Feedback Status: {item.SupplierStatus}</Text>
      

     
      

      <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create A Budget</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#9A340C" />
      ) : budget.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>📊 Material Details</Text>
          <FlatList
            data={budget}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBudgetItem}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <Text style={styles.noDataText}>No budget available</Text>
      )}

     

    
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginBottom: 10 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 5, marginTop: 15, color: '#333' },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginVertical: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  itemText: { fontSize: 16, color: '#333' },
 
  deleteButton: { marginTop: 10, alignSelf: '' },
  listContainer: { paddingBottom: 20 },
  noDataText: { fontSize: 16, color: '#9A340C', textAlign: 'center', marginTop: 20 },
  message: { color: 'red', textAlign: 'center', marginTop: 10 },
});
