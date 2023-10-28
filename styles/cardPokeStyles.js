import { StyleSheet } from "react-native";

const cardPokeStyles = StyleSheet.create({
  card: {
    width: 175,
    height: 160,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: "bold",
    color: 'black',
    marginTop: 10 
  }
})

export default cardPokeStyles;