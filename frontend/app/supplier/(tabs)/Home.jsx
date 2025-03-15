import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Button } from 'react-native';



const Home = () => {
  return (
    
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/images/workers.png')} />
  
    
    <View style={styles.welcome}>
      <Text style={styles.Text}> WELCOME</Text>
      <View style={styles.button}>
        <Text style={styles.Pname}>Project Name:</Text>
        <Text style={styles.Pcode}>Project Code:</Text>
      </View>

     

      </View>
      <View style={styles.Manage}>
        <Text >Manage Users</Text>
        <View style={styles.user}>
        <TouchableOpacity  >
       
      <Link href='QA/Reports'  >
      <Image style={styles.client} source={require('../../../assets/images/public-relation.png')} />{'\n'}
      <Text style={styles. clienttext}>Reports</Text>
     


  
     </Link>
      </TouchableOpacity>
      <TouchableOpacity  >
       
      <Link href='QA/Createreport'  >
      <Image style={styles.client} source={require('../../../assets/images/public-relation.png')} />{'\n'}
      <Text style={styles. clienttext}>payments</Text>
     


  
     </Link>
      </TouchableOpacity>
     
      
     
      </View>
    
      </View>
  
    </View>
    
  )
}

export default Home


  const styles = StyleSheet.create({
    container: {
      flex: 1,   // Ensures full screen
    
      backgroundColor: '#F7E4DE',
    },
    Text: {
      fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    },
    Text1: {
      fontSize: 18,
    fontWeight: 'bold',
    color: '#9A340C',
    textAlign: 'center',
    },
    

    logo:{
      
      marginTop:0,
      width:40,
      height:40,
      marginLeft:150,

    },
  image:{
      width:'100%',
      resizeMode:'cover',
    height:300,

      marginTop:50,
      
     
    },
    Overlay:{
      position:'absolute',
      marginTop:180,
      padding:20,
      width:'80%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      flexDirection:'row',
      justifyContent:'space-between',
      borderColor:'white',
      borderWidth:2,
      marginLeft:30,
      
      
    },

    button:{
      fontSize: 18,
      fontWeight: 'bold',
      backgroundColor: '#9A340C',
      height:60,
      
      
      
      borderRadius:8,
      paddingHorizontal:10,
      paddingVertical:5,
      width:'80%',
      marginLeft:30,
      borderColor:'white',
      borderWidth:1,
      flexDirection:'row',
      justifyContent:'space-between',

      
      

    },
    button1:{
      marginTop:5,
      backgroundColor: '',
      height:30,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:8,
      paddingHorizontal:10,
      paddingVertical:5,
      width:'50%',
      marginLeft:90,
      

    },
    welcome:{
      backgroundColor:'#732303',
      paddingVertical:60,
      borderBottomEndRadius:'50%',
      borderBottomStartRadius:'50%',
      
      
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
    Manage:{
      marginTop:100,
      backgroundColor:'white',
      width:'80%',
      marginLeft:30,
      justifyContent:'center',
      alignItems:'center',
      paddingLeft:60,
    },

    user:{
      flexDirection:'row',
      justifyContent:'space-between',
      height:100

      

    },
    client:{
      width:'55%',
      resizeMode:'cover',
      height:'70%',
      borderRadius:50,
      borderWidth:2,
      borderColor:'brown',
      justifyContent:'center',
      alignItems:'center',
      
   
      },
      clienttext:{
        fontSize: 16,
        marginTop: 15,
        justifyContent:'center',
        alignItems:'center',


      },
      Finance:{
        width:'55%',
        resizeMode:'cover',
        height:'70%',
      borderRadius:50,
      borderWidth:2,
      borderColor:'brown',
      justifyContent:'center',
      alignItems:'center',
      
     
        },
        

  });
