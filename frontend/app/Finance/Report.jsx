import { StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity,TextInput,Button ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 


const Report = () => {
  const[TotalBudget,setTotalBudget] = useState('');
  const[Totalexpenses,setTotalexpenses] = useState('');
  const[variance,setVariance] = useState('');
  const[Notes,setNotes] = useState('');
  const[Remark,setRemark] = useState('');
  const[generated_at,setGenerated_at] = useState('')
  const [message, setMessage] = useState('');
  const deleteTransaction = (id) => {
    setCategory(category.filter(item => item.id !== id));
  };
  
  const [loading, setLoading] = useState(false); 
  const navigation=useNavigation(); 

 const [category, setCategory] = useState([]);
 
   useEffect(() => {
     fetchCategory();
   }, []);
 
   const fetchCategory = async () => {
     setLoading(true);
 
     try {
         const response = await fetch('http://192.168.167.150:8000/finance/', {
           method: 'GET',
           headers: { 
             "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
             'Content-Type': 'application/json' },
    
         });
         const data = await response.json();
         const updatedData = data.map(item => ({
          ...item,
          TotalBudget: '',
          Totalexpenses: '',
          variance: '',
          Remark: '',
          Notes:'',
        }));
  
         setCategory(updatedData);
       } catch (error) {
       console.error("Error fetching report name:", error);
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
      item.TotalBudget.trim() === '' || 
      item.Totalexpenses.trim() === '' || 
      item.variance.trim() === '' || 
     item.Notes.trim() ==='' ||
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
        const response = await fetch('http://192.168.167.150:8000/financereport/', {
            method: 'POST',
            headers: { 
                "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({reports:category}),  
        });

        if (response.ok) {
            const data = await response.json();
            setMessage("Reports submitted successfully!");
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
  
 // Render Each Row Independently
const renderItem = ({ item, index }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.cell}>{item.Reportname}
    <TextInput
      style={{ height: 0, opacity: 0 }} // Makes it hidden
      value={item.Reportname} // Keeps the name stored in input
      editable={false} // Prevents user from editing
    />

    </Text>
    
    <TextInput
  style={styles.input}
  placeholder="TotalBudget"
  keyboardType="numeric"
  value={item.TotalBudget}
  onChangeText={(text) => {
    setTotalBudget(text);  
    updateRow(index, 'TotalBudget', text);  
  }}
/>
    <TextInput
      style={styles.input}
      placeholder="TotalExpenses"
      keyboardType="numeric"
      value={item.Totalexpenses}
      onChangeText={(text) =>{ setTotalexpenses(text);  updateRow(index, 'Totalexpenses', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Remaining"
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
      <TextInput
      style={styles.input}
      placeholder="Notes"
      value={item.Notes}
      onChangeText={(text) => { setNotes(text); updateRow(index, 'Notes', text);}}
    />
      <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
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

      <View >
    
      
      <TouchableOpacity style={styles.button1}>
        <Link href='Finance/Addcategory'>Add Report</Link>
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
  
