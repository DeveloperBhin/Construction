import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';





const Report = () => {
  const[material,setMaterial] = useState([]);
  const[Quantity_Needed,setQuantity_Needed] = useState('');
  const[price_Per_Quantity,setprice_Per_Quantity] = useState('');
  const[Total_Amount,setTotal_Amount] =useState('');
  const deleteTransaction = (id) => {
    setMaterial(material.filter(item => item.id !== id));
  };
  
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false); 
  const navigation=useNavigation(); 

 
   useEffect(() => {
     fetchMaterial();
   }, []);
 
   const fetchMaterial = async () => {
     setLoading(true);
 
     try {
         const response = await fetch('http://192.168.219.150:8000/FinanceMaterialname/', {
           method: 'GET',
           headers: { 
             "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
             'Content-Type': 'application/json' },
    
         });
         const data = await response.json();
         const updatedData = data.map(item => ({
          ...item,
          
          Quantity_Needed: '',
          price_Per_Quantity: '',
          Total_Amount:'',

          
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
 
     
 
   
  const handleSupplier = async () => {
    const isEmpty = material.some(item => 
      
      item.Quantity_Needed.trim() === '' || 
      item.price_Per_Quantity.trim() === '' || 
      item.Total_Amount.trim() === '' 
     
      
      
  );

  if (material.length === 0 || isEmpty) {
      setMessage("Please fill in all fields before submitting.");
      return;
  }
    setLoading(true);
    setMessage('');

    // Prepare the data in the correct format
  
    try {
        const response = await fetch('http://192.168.219.150:8000/SupplierReport/', {
            method: 'POST',
            headers: { 
                "Authorization": "Token 0103de006028cef3dff84acc0295e5e2e36395ba",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({supplierform:material}),  
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
    <Text style={styles.cell}>{item.id}
   
    <TextInput
      style={{ height: 0, opacity: 0 }} // Makes it hidden
      value={item.material} // Keeps the name stored in input
      editable={false} // Prevents user from editing
    />

    </Text>
    <Text style={styles.cell}>{item.name}
   
   <TextInput
     style={{ height: 0, opacity: 0 }} // Makes it hidden
     value={item.material} // Keeps the name stored in input
     editable={false} // Prevents user from editing
   />

   </Text>
    


    <TextInput
      style={styles.input}
      placeholder="QuantityNeeded"
      keyboardType="numeric"
      value={item.Quantity_Needed}
      onChangeText={(text) =>{ setQuantity_Needed(text);  updateRow(index, 'Quantity_Needed', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Price per Quantity"
      keyboardType="numeric"
      value={item.price_Per_Quantity}
      onChangeText={(text) =>{ setprice_Per_Quantity(text);  updateRow(index, 'price_Per_Quantity', text);}}
    />
    <TextInput
      style={styles.input}
      placeholder="Total Amount"
      keyboardType="numeric"
      value={item.Total_Amount}
      onChangeText={(text) =>{ set_Total_Amount(text);  updateRow(index, 'Total_Amount', text);}}
    />
  <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteButton}>
      <Ionicons name="trash" size={24} color="red" />
    </TouchableOpacity>
  </View>
  
);
  return (
    <View style={styles.container}>
  
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
  
