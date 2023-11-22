cardDetailsPokeStyles

import { StyleSheet } from "react-native";

const cardDetailsPokeStyles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center"
  },
  textCard: {
    color: 'black', 
    textAlign: 'center', 
    fontSize: 25, 
    padding: 10, 
    fontWeight: 'bold'
  },
  image: {
    width: 180,
    height: 180,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 15,
  },
  favorite: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  },
  type: {
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10
  },
  textType: {
    color: 'white',
    fontWeight: "bold",
  }
})

export default cardDetailsPokeStyles;