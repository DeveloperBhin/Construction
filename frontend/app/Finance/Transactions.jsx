import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; 



const Transactions = () => {
  const [transname, setTransname] = useState([]);
  const deleteTransaction = (id) => {
    setTransname(transname.filter(item => item.id !== id));
  };
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [datePickerIndex, setDatePickerIndex] = useState(null);

  useEffect(() => {
    fetchTransname();
    
  }, []);

  const fetchTransname = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.150:8000/FinanceTransactionNo/', {
        method: 'GET',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482",  'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setTransname(data);
    } catch (error) {
      console.error("Error fetching Transaction No:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const updateRow = (index, field, value) => {
    const updatedTrans = [...transname];
    updatedTrans[index][field] = value;
    setTransname(updatedTrans);
  };

  const handleFinanceTransaction = async () => {
    if (transname.length === 0 || transname.some(item => 
      !item.TransactionType ||
      !item.Amount || 
      !item.description || 
      !item.date 
      )) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://192.168.1.150:8000/FinanceTransaction/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482",  "Content-Type": "application/json"
        },
        body: JSON.stringify({ Transform: transname})
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

  const renderItem = ({ item, index }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.cell}>{item.number}</Text>
      
    
      <Picker selectedValue={item.TransactionType} placeholder="Transaction Type" style={styles.picker} onValueChange={(text) => updateRow(index, 'TransactionType', text)}>
          <Picker.Item label='Income' value='Income'/>
          <Picker.Item label='Expenses' value='Expenses'/>
          
        </Picker>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={item.Amount}
        onChangeText={(text) => updateRow(index, 'Amount', text)}
      />
       
      <TextInput
        style={styles.input}
        placeholder="Description"
        
        value={item.description}
        onChangeText={(text) => updateRow(index, 'description', text)}
      />
     
     <TouchableOpacity onPress={() => setDatePickerIndex(index)}>
        <TextInput
          style={styles.input}
          placeholder="Due Date"
          value={item.date}
          editable={false}
        />
      </TouchableOpacity>

      {datePickerIndex === index && (
        <DateTimePicker
          value={item.date ? new Date(item.date) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setDatePickerIndex(null);
            if (selectedDate) updateRow(index, 'date', selectedDate.toISOString().split('T')[0]);
          }}
        />
)}
  <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
      <Ionicons name="trash" size={24} color="red" />
    </TouchableOpacity>
     
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.repot}>Create A Budget</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#9A340C" />
      ) : transname.length > 0 ? (
        <FlatList
          data={transname}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No Transaction available</Text>
      )}
      <TouchableOpacity style={styles.button1}>
        <Link href='Finance/TransactionNo'>Add Transaction</Link>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#D84315" />
      ) : (
        <Button title="Submit" onPress={handleFinanceTransaction} />
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    
    padding: 10,
  },
  repot:{
    fontWeight:'bold',
    justifyContent:'center',
    textAlign:'center'

  },
  add:{
    color:'red'

  },
  logo:{
      
    marginTop:0,
    width:40,
    height:40,
    marginLeft:150,

  },
  Pname:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBlockStart:1

  },
  Pcode:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBlockEnd:0

  },
  button:{
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#9A340C',
    height:60,
    
    
    
    borderRadius:8,
    paddingHorizontal:10,
    paddingVertical:15,
    width:'100%',

    borderColor:'white',
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'space-between',

    
    

  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  cellHeader: {
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  cell: {
    paddingHorizontal: 5,
  },
  button1: {
    backgroundColor: '#E44D26',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
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
  
   
    cell: {
      width: 80, // Adjust this width as per your requirement
      fontWeight: 'bold',
      marginRight: 5,
    },
    input: {
      
      
      borderColor: '#ccc',
     
      borderRadius: 5,
      marginHorizontal:1,
      fontSize:8,
      textAlign:'center'
    },
    inputContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    placeholderText: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'gray',
    },
    com:{
      
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 8,
      paddingVertical: 14,
      borderRadius: 5,
      marginHorizontal: 15,
      fontSize:16,
      

    },
    container: { flex: 1, backgroundColor: '#F7E4DE', padding: 16 },
    inputContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
    input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
});
