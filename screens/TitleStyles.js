import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    // Main titles
    sectionTitle:{ 
        fontFamily: 'AJannatLTBold',
        fontSize:24,
        fontWeight:'bold',
        paddingBottom: 20,
        textAlign: 'right'
          },

    // sub headings
    subTitle:{ 
        fontFamily: 'AJannatLT',
        fontSize:18,
          },
      
    // the List styles

    container: {
        flex: 1,
         backgroundColor: '#E1E5F2',
    },
    tasksWrapper:{
         paddingTop:80,
         paddingHorizontal:20,
    }, 
    item:{
         backgroundColor:'#FFF',
         padding:15,
         borderRadius:10,
         flexDirection:'row',
     // alignItems:'center',
         justifyContent:"space-between",
         marginBottom:20, 
    },
    Accounts:{
         fontSize:18,
         fontWeight:'bold',
         textAlign: 'right'  
    },
 
    Rejectbutton: {
        position:'absolute',
        bottom:50,
        left:50,
        width:150,
        backgroundColor:'#FF6663',
        borderRadius:30,
         
  },

    RejectDetailsBtn:{
        fontFamily:'AJannatLT',

        color:'white',
        textAlign:'center',
        padding:10,
        fontSize: 25, 
        
    },

    Acceptbutton: {
        position:'absolute',
        bottom:50,
        right:50,
        width:150,
        backgroundColor:'#6DA34D',
        borderRadius:30,
         
  },

    AcceptDetailsBtn:{
        fontFamily:'AJannatLT',
        color:'white',
        textAlign:'center',
        padding:10,
        fontSize: 25, 
        
    },

})