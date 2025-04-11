import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Report = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.150:8000/FinanceMaterial/', {
        method: 'GET',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482",  'Content-Type': 'application/json'
        },
      });
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setMessage("Failed to fetch materials.");
    } finally {
      setLoading(false);
    }
  };

  const updateMaterial = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index][field] = value;
    setMaterials(updatedMaterials);
  };

  const handleSubmit = async () => {
    if (materials.some(item => !item.QuantityNeeded || !item.pricePerQuantity || !item.TotalAmount)) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://192.168.1.150:8000/FinanceMaterial/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482", "Content-Type": "application/json"
        },
        body: JSON.stringify({ materialform: materials }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setMessage("Form submitted successfully!");
      navigation.navigate('Finance/(tabs)', { screen: 'Home' });
    } catch (error) {
      console.error("Error submitting materials:", error);
      setMessage("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
     
       <Text style={styles.itemText}>💰 material Quantity Needed: {item.QuantityNeeded}</Text>
        <Text style={styles.itemText}>💲 material PricePerQuantity: {item.pricePerQuantity}</Text>
        <Text style={styles.itemText}>💲 material TotalAmount: {item.TotalAmount}</Text>

            
      <TextInput style={styles.input} placeholder="Quantity" keyboardType="numeric"
        value={item.QuantityNeeded} onChangeText={(text) => updateMaterial(index, 'QuantityNeeded', text)} />
      <TextInput style={styles.input} placeholder="Price" keyboardType="numeric"
        value={item.pricePerQuantity} onChangeText={(text) => updateMaterial(index, 'pricePerQuantity', text)} />
      <TextInput style={styles.input} placeholder="Total" keyboardType="numeric"
        value={item.TotalAmount} onChangeText={(text) => updateMaterial(index, 'TotalAmount', text)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Material Budget</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#9A340C" />
      ) : materials.length > 0 ? (
        <FlatList data={materials} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
      ) : (
        <Text style={styles.noDataText}>No Materials Available</Text>
      )}
      <Button title="Submit" onPress={handleSubmit} disabled={loading} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

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

export default Report;
