import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  input: {
    height: 48,
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingRight: 16,
    textAlign: 'right',
    flex: 1 ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor:'#022B3A',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 0,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 7,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#7C98B3",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  dec: {
    height: 130,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingRight: 10,
    paddingBottom:90,
    textAlign: 'right',
  },
  
  viewContainer: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "center",
  },
  inputIOSContainer: { height: "100%", justifyContent: "center" },
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  RadioBtnsTitle :{
    paddingRight: 5,
    textAlign: 'right',
    color:"#aaaaaa",
    marginBottom: -23,
    paddingTop: 13,
  },
  warning:{
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 30,
    color:"#9a2222",
    fontWeight: "bold",
  
  },
  condtions:{
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingRight: 16,
    textAlign: 'right',
    fontSize: 14,
    color:"gray",
  },
  agree:{
    color: "#7C98B3",
    fontWeight: "bold",
    fontSize: 14,
  },


SectionStyle: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: 5,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 30,
  marginRight: 30,

},
searchIcon:{

  marginTop: 10,
  marginBottom: 10,
  marginLeft: 20,
  marginRight: 30,
  width:"auto"
},
pass:{
  height: 48,
    borderRadius: 5,
    paddingRight: 15,
    textAlign: 'right',
    flex: 1 ,
    width:250,

    
  },


});
