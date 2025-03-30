import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const Budget = () => {
  const [budget, setBudget] = useState([]);
  const [worker, setWorker] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBudget();
    fetchWorker();
  }, []);

  const fetchBudget = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.219.150:8000/FinanceMaterialname/', {
        method: 'GET',
        headers: {
          "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Budget Data:", data); // Debugging Log
      setBudget(data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWorker = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.219.150:8000/register-into-existing-project/', {
        method: 'GET',
        headers: {
          "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Worker Data:", data); // Debugging Log
      setWorker(data);
    } catch (error) {
      console.error("Error fetching worker:", error);
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
  const updatesRow = (index, field, value) => {
    setWorker(prevWorker =>
      prevWorker.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleQualityAssurance = async () => {
    if (budget.length === 0 || budget.some(item => !item.QualityStatus)) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://192.168.219.150:8000/QualityAssurance/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Assuranceform: budget, worker })
      });

      if (response.ok) {
        setMessage("Budget submitted successfully!");
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

  const renderBudgetItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.itemText}>💰 material ID: {item.id}</Text>
      <Text style={styles.itemText}>💲 material Name: {item.name}</Text>
      

      <Picker
        selectedValue={item.QualityStatus}
        style={styles.picker}
        onValueChange={(itemValue) => updateRow(index, 'QualityStatus', itemValue)}
      >
        <Picker.Item label='Passed' value='Passed' />
        <Picker.Item label='Failed' value='Failed' />
      </Picker>
      

      <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const renderWorkerItem = ({ item ,index}) => (
    <View style={styles.card}>
      <Text style={styles.itemText}>👷 Worker ID: {item.id}</Text>
      <Text style={styles.itemText}>📛 Name: {item.name}</Text>
      <Text style={styles.itemText}>🛠 Role: {item.email}</Text>
      <Text style={styles.itemText}>Phone: {item.phone}</Text>
      <Text style={styles.itemText}>📅 TypeOfWork: {item.TypeOfWork}</Text>
      
      <Picker
        selectedValue={item.QualityStatus}
        placeholder='Quality Status'
        style={styles.picker}
        onValueChange={(itemValue) => updateRow(index, 'QualityStatus', itemValue)}
      >
        <Picker.Item label='Passed' value='Passed' />
        <Picker.Item label='Failed' value='Failed' />
      </Picker>
  

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
          <Text style={styles.sectionTitle}>📊 Budget Details</Text>
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

      {loading ? (
        <ActivityIndicator size="large" color="#D84315" />
      ) : worker.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>👷 Worker Details</Text>
          <FlatList
            data={worker}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderWorkerItem}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <Text style={styles.noDataText}>No workers available</Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#D84315" />
      ) : (
        <Button title="Submit" onPress={handleQualityAssurance} />
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
