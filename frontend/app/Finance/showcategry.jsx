import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const Client = () => {
  const [category, setCategory] = useState([]);  // Ensure it's an array
  const [loading, setLoading] = useState(false);  // State to track loading status

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    setLoading(true);

    try {
        const response = await fetch('http://192.168.167.150:8000/finance/', {
          method: 'GET',
          headers: { 
            "Authorization": "Token 0aacb12174c69ed99e1ab48c305a1000c3f4d482",  'Content-Type': 'application/json' },
   
        });
        const data = await response.json();
        setCategory(data);
      } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableContainer}>
      <View style={styles.row}>
      <Text style={styles.cellHeader}>Name:</Text> 
      <Text style={styles.cell}>{item.name}</Text>
      </View>
     
   
    </View>
  );

  return (
    <View style={styles.container}>
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
        <Text style={styles.noDataText}>No category available</Text>
      )}
    </View>
  );
};

export default Client;

const styles = StyleSheet.create({

  clientCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  clientTask: { fontSize: 18, fontWeight: 'bold' },
  clientStatus: { marginTop: 8, color: '#555' },
  clientAssignees: { marginTop: 8, color: '#555' },
  clientDueDate: { marginTop: 8, color: '#555' },
  clientTags: { marginTop: 8, color: '#555' },
  clientFile: { marginTop: 8, color: '#555' },
  noDataText: {
    fontSize: 16,
    color: '#9A340C',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  cellHeader: {
    flex: 0,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  cell: {
    flex:0,
    paddingHorizontal: 5,

  },
});
