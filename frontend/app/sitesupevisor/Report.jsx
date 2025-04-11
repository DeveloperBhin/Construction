import { StyleSheet, Text, View ,Image,TouchableOpacity,} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Button } from 'react-native';



const Home = () => {
  return (
    
    <View style={styles.container}>
      
    
  
      <View style={styles.Manage}>
        <Text >Manage Worker Report</Text>
        <View style={styles.user}>
        <TouchableOpacity  >
       
      <Link href='sitesupevisor/workerreport'  >
      <Image style={styles.client} />{'\n'}
      <Text style={styles. clienttext}>MaterialReport</Text>
     


  
     </Link>
      </TouchableOpacity>
    
       <TouchableOpacity  >
       
       <Link href='sitesupevisor/Attendancereport'  >
       <Image style={styles.client}  />{'\n'}
       <Text style={styles. clienttext}>Attendance </Text>
 
      </Link>
       </TouchableOpacity>
       <TouchableOpacity  >
       
       <Link href='sitesupevisor/WorkerAssurance'  >
       <Image style={styles.client}  />{'\n'}
       <Text style={styles. clienttext}>Workers</Text>
 
      </Link>
       </TouchableOpacity>
     
      </View>
      
      
      
     
      </View>
      
      <View style={styles.Manage}>
        <Text >Manage Finance Report</Text>
        <View style={styles.user}>
        <TouchableOpacity  >
       
      <Link href='sitesupevisor/MaterialReport'  >
      <Image style={styles.client} />{'\n'}
      <Text style={styles. clienttext}>MaterialReport</Text>
     


  
     </Link>
      </TouchableOpacity>
      <TouchableOpacity  >
       
       <Link href='sitesupevisor/BudgetReport'  >
       <Image style={styles.client} />{'\n'}
       <Text style={styles. clienttext}>BudgetReport</Text>
   
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
      width:'96%',
      marginLeft:5,
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
      width:'45%',
      resizeMode:'cover',
      height:'65%',
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
