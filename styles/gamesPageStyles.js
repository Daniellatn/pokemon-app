import { StyleSheet } from "react-native";


const gamesPageStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  levelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    marginTop: 15,
    width: 200,
  }
    
})

export default gamesPageStyles;