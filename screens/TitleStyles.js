import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    // Main titles
    sectionTitle:{ 
        fontFamily: 'AJannatLTBold',
        fontSize:24,
        fontWeight:'bold',
        paddingBottom: 20,
        textAlign: 'right',
        color:'#536b78' },

    // sub headings
    subTitle:{ 
        fontFamily: 'AJannatLT',
        fontSize:18,
        color:'#637081',
          },
      

    SignOutbutton: {
        position:'absolute',
        height:35,
        width:35,
        borderRadius:6,
        marginLeft:30,
        marginTop:25,
        backgroundColor: "#eeeeee",
        alignItems:'center',
        justifyContent:'center',
        transform: [{ rotate: '180deg'}]
            
            
            },  
    // the List styles

    container: {
        flex: 1,
         backgroundColor: 'white',
         
    },
    tasksWrapper:{
         paddingTop:80,
         paddingHorizontal:20,
    }, 
    item:{
        
         backgroundColor:'#eeeeee',
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


    //Page details

    containerDetails: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        
      },

      square:{
        marginTop:20,
        alignItems:'flex-end',
        backgroundColor:'#eeeeee',
        borderRadius:10,
        width:'90%', 
      },
      
 
    Rejectbutton: {
        position:'relative',
        marginTop:'5%',
        marginRight:'5%',
        marginBottom:'5%',
        width:100,
        backgroundColor:'#FF6663',
        borderRadius:6,
         
  },

    RejectDetailsBtn:{
        fontFamily:'AJannatLT',
        color:'white',
        textAlign:'center',
        padding:3,
        fontSize: 25, 
        
    },

    Acceptbutton: {
        position:'relative',
        marginTop:'5%',
        marginBottom:'5%',
        width:100,
        backgroundColor:'#6DA34D',
        borderRadius:6,
         
  },

  investButton:{
    position:'relative',
    marginTop:'5%',
    marginBottom:'5%',
    marginRight:'5%',
    width:100,
    backgroundColor:'#7c98b3',
    borderRadius:6,
  },

    AcceptDetailsBtn:{
        fontFamily:'AJannatLT',
        color:'white',
        textAlign:'center',
        padding:3,
        fontSize: 25, 
        
    },

    ProjectName:{
        marginTop:20,
        fontFamily:'AJannatLTBold',
        fontSize:30,
        fontWeight:'bold',
        color:'#1d2d44',
       
        
    },
    TitleFix:{
       fontFamily: 'AJannatLTBold',
       marginTop: '4%',
       color:'#536b78',
       fontSize:20,
       marginRight:15,
       width:'90%',
       textAlign:'right'
       
       
        },

    DescText:{
        marginRight:20,
        width:'90%',
        textAlign:'right'
         },

   
    
     button: {
        width: 150,
        margin: 10,
        color:'white'
        },
    buttonTitle: {
        color: 'dodgerblue',
        fontSize: 16,
        fontWeight: "bold",
        
        },

})