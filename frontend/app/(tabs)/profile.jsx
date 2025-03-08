import { StyleSheet, Text, View ,TextInput,Image} from 'react-native';
import React from 'react';
import { Link } from 'expo-router'

const profile = () => {
  return (
 
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/images/workers.png')} />
        
          
        
            <View style={styles.button}>
              <Text style={styles.Pname}>Project Name:</Text>
              <Text style={styles.Pcode}>Project Code:</Text>
            </View>
      
    <TextInput 
    style={styles.TextInput}
    placeholder='Name'
    value='Name'
    
    />
   <TextInput 
   style={styles.TextInput}
    placeholder='Password'
    value='Password'
    
       

    
    />
     <Link style={styles.button}  href='/Task '>Reset password</Link>
   <TextInput 
   style={styles.TextInput}
    placeholder='Position'
    value='Position'
    
    />
   <TextInput 
   style={styles.TextInput}
    placeholder='Tasks'
    value='Tasks'
    
    />
   
    </View>
  )
}

export default profile

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


  container1:{
      marginTop:50,
  
      padding:20,
    
      
  },

 Table:{
  borderWidth:4,
 
    backgroundColor:'#9A340C'
  
 },
 head:{
  height:40,
  backgroundColor:''

 },
text:
  { margin:2, textAlign: 'center' ,color:''},



  
  
    
      

});