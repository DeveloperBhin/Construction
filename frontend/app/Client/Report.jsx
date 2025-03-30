import { StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity,TextInput,Button ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const Report = () => {
  const[budget,setBudget] = useState('');
  const[actual_expenses,setActual_expenses] = useState('');
  const[variance,setVariance] = useState('');
  const[Remark,setRemark] = useState('');
  const[comments,setComments] = useState('');
   const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false); 
  const navigation=useNavigation(); 

 const [category, setCategory] = useState([]);
 
   useEffect(() => {
     fetchCategory();
   }, []);
 
   const fetchCategory = async () => {
     setLoading(true);
 
     try {
         const response = await fetch('http://192.168.219.150:8000/finance/', {
           method: 'GET',
           headers: { 
             "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
             'Content-Type': 'application/json' },
    
         });
         const data = await response.json();
         const updatedData = data.map(item => ({
          ...item,
          budget: '',
          actual_expenses: '',
          variance: '',
          Remark: '',
          comments:'',
        }));
  
         setCategory(updatedData);
       } catch (error) {
       console.error("Error fetching clients:", error);
     } finally {
       setLoading(false);
     }
   };
   const updateRow = (index, field, value) => {
    const updatedCategory = [...category];
    updatedCategory[index][field] = value;
    setCategory(updatedCategory);
  };
 
     
 
   
  const handleFinancereport = async () => {
    const isEmpty = category.some(item => 
      item.budget.trim() === '' || 
      item.actual_expenses.trim() === '' || 
      item.variance.trim() === '' || 
     
      item.Remark.trim() === ''
      
  );

  if (category.length === 0 || isEmpty) {
      setMessage("Please fill in all fields before submitting.");
      return;
  }
    setLoading(true);
    setMessage('');

    // Prepare the data in the correct format
  
    try {
        const response = await fetch('http://192.168.219.150:8000/financereport/', {
            method: 'POST',
            headers: { 
                "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({reports:category,comments}),  
        });

        if (response.ok) {
            const data = await response.json();
            setMessage("Reports submitted successfully!");
            navigation.navigate('Client/(tabs)', { screen: 'Home' });
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
  
 // Render Each Row Independently
const renderItem = ({ item, index }) => (
  <View style={styles.rowContainer}>
    <Text style={styles.cell}>{item.name}
    <TextInput
      style={{ height: 0, opacity: 0 }} // Makes it hidden
      value={item.name} // Keeps the name stored in input
      editable={false} // Prevents user from editing
    />

    </Text>
    
    <TextInput
  style={styles.input}
  placeholder="Budget"
  keyboardType="numeric"
  value={item.budget}
  onChangeText={(text) => {
    setBudget(text);  
    updateRow(index, 'budget', text);  
  }}
/>
    <TextInput
      style={styles.input}
      placeholder="A.Expenses"
      keyboardType="numeric"
      value={item.actual_expenses}
      onChangeText={(text) =>{ setActual_expenses(text);  updateRow(index, 'actual_expenses', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Variance"
      keyboardType="numeric"
      value={item.variance}
      onChangeText={(text) =>{ setVariance(text);  updateRow(index, 'variance', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Remark"
      value={item.Remark}
      onChangeText={(text) => { setRemark(text); updateRow(index, 'Remark', text);}}
    />
  </View>
  
);
  return (
    <View style={styles.container}>
  <Text style={styles.repot}>Create A report</Text>
   
      {loading ? (
        <ActivityIndicator size="large" color="#9A340C" />
      ) : category.length > 0 ? (
        <FlatList
          data={category}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No Category available</Text>
      )}

      <View style={styles.container1}>
      <TextInput
      style={styles.com}
      placeholder="Comments"
      value={comments}
      onChangeText={setComments}
    />
      <Text style={styles.add}>Add category "Total" before submiting</Text>
      <TouchableOpacity style={styles.button1}>
        <Link href='Client/Addcategory'>Add Category</Link>
      </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#D84315" />
        ) : (
          <Button title="Submit" onPress={handleFinancereport} />
        )}

        {message ? <Text style={styles.message}>{message}</Text> : null}

        
      </View>
      
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  container1: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  message: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
  
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      padding: 10,
    },
    cell: {
      width: 80, // Adjust this width as per your requirement
      fontWeight: 'bold',
      marginRight: 5,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
      marginHorizontal: 5,
      fontSize:9,
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
  });
  
