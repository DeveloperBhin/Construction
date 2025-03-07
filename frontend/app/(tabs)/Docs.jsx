import { StyleSheet, Text, View ,Image,Button} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Docs = () => {
  return (
    
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/workers.png')} />
  
    
  
      <View style={styles.button}>
        <Text style={styles.Pname}>Project Name:</Text>
        <Text style={styles.Pcode}>Project Code:</Text>
      </View>

    
      

     
      <View style={styles.Manage}>
     
    
      
      
      <Image style={styles.image} source={require('../../assets/images/upload.png')} />
      <Button title="Pick an Image" />
      {<Image source={{  }} style={{ width: 10, height: 10 }} />}
      <Button title="Upload Image"   />
     
     
     
      </View>
     
      </View>
  

    
  )
}

export default Docs


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
    color: 'brown',
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
        height:'60%',
     
  
     
      marginTop:0,
      
     
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
      paddingVertical:15,
      width:'100%',
 
      borderColor:'white',
      borderWidth:1,
      flexDirection:'row',
      justifyContent:'space-between',

      
      

    },
    button1:{
      marginTop:5,
      backgroundColor: 'brown',
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
      backgroundColor:'#9A340C',
      paddingVertical:55,
      borderBottomEndRadius:80,
      borderBottomStartRadius:80,
      
      
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
      marginTop:30,
      backgroundColor:'white',
      width:'90%',
      marginLeft:20,
      justifyContent:'center',
      alignItems:'center',
      paddingVertical:50,
      backgroundColor:'#732303'
      
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
