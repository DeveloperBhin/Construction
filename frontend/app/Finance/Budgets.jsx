import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 


const Budget = () => {
  const [budgetno, setBudgetno] = useState([]);
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const deleteTransaction = (id) => {
    setBudgetno(budgetno.filter(item => item.id !== id));
  };

  useEffect(() => {
    fetchBudgetno();
    
  }, []);

  const fetchBudgetno = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.150:8000/FinanceBudgetNo/', {
        method: 'GET',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482",  'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setBudgetno(data);
    } catch (error) {
      console.error("Error fetching budget No:", error);
    } finally {
      setLoading(false);
    }
  };

 

  const updateRow = (index, field, value) => {
    const updatedBudget = [...budgetno];
    updatedBudget[index][field] = value;
    setBudgetno(updatedBudget);
  };

  const handleFinancebudget = async () => {
    if (budgetno.length === 0 || budgetno.some(item => 
      !item.BudgetName ||
      !item.Totalbudget || 
      !item.AmountSpent || 
      !item.remainingbudget || 
      !item.comments)) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://192.168.1.150:8000/FinanceBudget/', {
        method: 'POST',
        headers: {
          "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482", "Content-Type": "application/json"
        },
        body: JSON.stringify({ budgetform: budgetno})
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
      
      <TextInput
        style={styles.input}
        placeholder="Budget Name"
        
        value={item.BudgetName}
        onChangeText={(text) => updateRow(index, 'BudgetName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Budget"
        keyboardType="numeric"
        value={item.Totalbudget}
        onChangeText={(text) => updateRow(index, 'Totalbudget', text)}
      />
       
      <TextInput
        style={styles.input}
        placeholder="Amount Spent"
        keyboardType="numeric"
        value={item.AmountSpent}
        onChangeText={(text) => updateRow(index, 'AmountSpent', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Remaining Budget"
        keyboardType="numeric"
        value={item.remainingbudget}
        onChangeText={(text) => updateRow(index, 'remainingbudget', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Comments"
        value={item.comments}
        onChangeText={(text) => updateRow(index, 'comments', text)}
      />
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
      ) : budgetno.length > 0 ? (
        <FlatList
          data={budgetno}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No budget available</Text>
      )}
      <TouchableOpacity style={styles.button1}>
        <Link href='Finance/Budgettype'>Add Budget</Link>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#D84315" />
      ) : (
        <Button title="Submit" onPress={handleFinancebudget} />
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

export default Budget;

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
