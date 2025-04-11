import { StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity,TextInput,Button ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const Report = () => {
  const[material,setMaterial] = useState('');
  const[plannedQuantity,setPlannedQuantity] = useState('');
  const[usedQuantity,setUsedQuantity] = useState('');
  const[remainingQuantity,setRemainingQuantity] =useState('');
  const[Remark,setRemark] = useState('');
  const[comments,setComments] = useState('');
   const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false); 
  const navigation=useNavigation(); 

 const [number, setNumber] = useState([]);
 
   useEffect(() => {
     fetchNumber();
   }, []);
 
   const fetchNumber = async () => {
     setLoading(true);
 
     try {
         const response = await fetch('http://192.168.1.150:8000/FinanceExpnumber/', {
           method: 'GET',
           headers: { 
            "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482",
              'Content-Type': 'application/json' },
    
         });
         const data = await response.json();
         const updatedData = data.map(item => ({
          ...item,
          material: '',
          plannedQuantity: '',
          usedQuantity: '',
          remainingQuantity:'',

          Remark: '',
          comments:'',
        }));
  
         setNumber(updatedData);
       } catch (error) {
       console.error("Error fetching number:", error);
     } finally {
       setLoading(false);
     }
   };
   const updateRow = (index, field, value) => {
    const updatedNumber = [...number];
    updatedNumber[index][field] = value;
    setNumber(updatedNumber);
  };
 
     
 
   
  const handleExpenditure = async () => {
    const isEmpty = number.some(item => 
      item.material.trim() === '' || 
      item.plannedQuantity.trim() === '' || 
      item.remainingQuantity.trim() === '' || 
      item.usedQuantity.trim() === '' ||
     
      item.Remark.trim() === ''
      
  );

  if (number.length === 0 || isEmpty) {
      setMessage("Please fill in all fields before submitting.");
      return;
  }
    setLoading(true);
    setMessage('');

    // Prepare the data in the correct format
  
    try {
        const response = await fetch('http://192.168.1.150:8000/FinanceExpenditure/', {
            method: 'POST',
            headers: { 
                "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({form:number,comments}),  
        });

        if (response.ok) {
            const data = await response.json();
            setMessage("form submitted successfully!");
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
    <Text style={styles.cell}>{item.number}
    <TextInput
      style={{ height: 0, opacity: 0 }} // Makes it hidden
      value={item.number} // Keeps the name stored in input
      editable={false} // Prevents user from editing
    />

    </Text>
    

<TextInput
      style={styles.input}
      placeholder="Material"
      value={item.material}
      onChangeText={(text) => { setMaterial(text); updateRow(index, 'material', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Planned.Q"
      keyboardType="numeric"
      value={item.plannedQuantity}
      onChangeText={(text) =>{ setPlannedQuantity(text);  updateRow(index, 'plannedQuantity', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Used.Q"
      keyboardType="numeric"
      value={item.usedQuantity}
      onChangeText={(text) =>{ setUsedQuantity(text);  updateRow(index, 'usedQuantity', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Remaining.Q"
      keyboardType="numeric"
      value={item.remainingQuantity}
      onChangeText={(text) =>{ setRemainingQuantity(text);  updateRow(index, 'remainingQuantity', text);}}
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
  <Text style={styles.repot}>Create Expenditure Report</Text>
   
      {loading ? (
        <ActivityIndicator size="large" color="#9A340C" />
      ) : number.length > 0 ? (
        <FlatList
          data={number}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No Material available</Text>
      )}

      <View style={styles.container1}>
      <TextInput
      style={styles.com}
      placeholder="Comments"
      value={comments}
      onChangeText={setComments}
    />
     
      <TouchableOpacity style={styles.button1}>
        <Link href='Client/ExpenditureNo'>Add Material Space</Link>
      </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#D84315" />
        ) : (
          <Button title="Submit" onPress={handleExpenditure} />
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
      paddingVertical: 5,
      borderRadius: 5,
      marginHorizontal: 5,
      fontSize:6,
     
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
  
