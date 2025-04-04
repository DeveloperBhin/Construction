import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
      const response = await fetch('http://192.168.167.150:8000/WorkerAttendance/', {
        method: 'GET',
        headers: {
          "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
          'Content-Type': 'application/json',
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
          "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ supplierform: material }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Form submitted successfully!");
        navigation.navigate('Finance/(tabs)', { screen: 'Home' });
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
      <Text style={styles.itemText}>💰 Status: {item.status}</Text>
      <Text style={styles.itemText}>💲 Start Time: {item.check_in}</Text>
      <Text style={styles.itemText}>💲 End Time: {item.check_out}</Text>
      <Text style={styles.itemText}>💲 Working Hours: {item.workinghrs}</Text>
      <Text style={styles.itemText}>💲 Perfomed Work: {item.PerfomedWork}</Text>
      <Text style={styles.itemText}>💲 Date: {item.date}</Text>


      
     

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
  container: {
    padding: 10,
  },
  itemText: {
    fontSize: 14,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#9A340C',
    marginTop: 20,
    textAlign: 'center',
  },
  message: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
  deleteButton: {
    marginTop: 10,
  },
});
