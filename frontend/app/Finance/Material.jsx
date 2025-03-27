import { StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity,TextInput,Button ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 




const Report = () => {
  const[name,setName] = useState([]);
  const[QuantityNeeded,setQuantityNeeded] = useState('');
  const[pricePerQuantity,setpricePerQuantity] = useState('');
  const[TotalAmount,setTotalAmount] =useState('');
  const deleteTransaction = (id) => {
    setName(name.filter(item => item.id !== id));
  };
  
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false); 
  const navigation=useNavigation(); 

 
   useEffect(() => {
     fetchName();
   }, []);
 
   const fetchName = async () => {
     setLoading(true);
 
     try {
         const response = await fetch('http://192.168.104.150:8000/FinanceMaterialname/', {
           method: 'GET',
           headers: { 
             "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
             'Content-Type': 'application/json' },
    
         });
         const data = await response.json();
         const updatedData = data.map(item => ({
          ...item,
          
          QuantityNeeded: '',
          PricePerQuantity: '',
          TotalAmount:'',

          
        }));
  
         setName(updatedData);
       } catch (error) {
       console.error("Error fetching number:", error);
     } finally {
       setLoading(false);
     }
   };
   const updateRow = (index, field, value) => {
    const updatedName = [...name];
    updatedName[index][field] = value;
    setName(updatedName);
  };
 
     
 
   
  const handleMaterial = async () => {
    const isEmpty = name.some(item => 
      
      item.QuantityNeeded.trim() === '' || 
      item.pricePerQuantity.trim() === '' || 
      item.TotalAmount.trim() === '' 
     
      
      
  );

  if (name.length === 0 || isEmpty) {
      setMessage("Please fill in all fields before submitting.");
      return;
  }
    setLoading(true);
    setMessage('');

    // Prepare the data in the correct format
  
    try {
        const response = await fetch('http://192.168.104.150:8000/FinanceMaterial/', {
            method: 'POST',
            headers: { 
                "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({materialform:name}),  
        });

        if (response.ok) {
            const data = await response.json();
            setMessage("form submitted successfully!");
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
    <Text style={styles.cell}>{item.name}
    <TextInput
      style={{ height: 0, opacity: 0 }} // Makes it hidden
      value={item.name} // Keeps the name stored in input
      editable={false} // Prevents user from editing
    />

    </Text>
    


    <TextInput
      style={styles.input}
      placeholder="QuantityNeeded"
      keyboardType="numeric"
      value={item.QuantityNeeded}
      onChangeText={(text) =>{ setQuantityNeeded(text);  updateRow(index, 'QuantityNeeded', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Price per Quantity"
      keyboardType="numeric"
      value={item.pricePerQuantity}
      onChangeText={(text) =>{ setpricePerQuantity(text);  updateRow(index, 'pricePerQuantity', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Total Amount"
      keyboardType="numeric"
      value={item.TotalAmount}
      onChangeText={(text) =>{ setTotalAmount(text);  updateRow(index, 'TotalAmount', text);}}
    />
  <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
      <Ionicons name="trash" size={24} color="red" />
    </TouchableOpacity>
  </View>
  
);
  return (
    <View style={styles.container}>
  <Text style={styles.repot}>Create Material budget</Text>
   
      {loading ? (
        <ActivityIndicator size="large" color="#9A340C" />
      ) : name.length > 0 ? (
        <FlatList
          data={name}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No Material available</Text>
      )}

      <View style={styles.container1}>
    
     
      <TouchableOpacity style={styles.button1}>
        <Link href='Finance/MaterialNo'>Add Material Space</Link>
      </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#D84315" />
        ) : (
          <Button title="Submit" onPress={handleMaterial} />
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
  
