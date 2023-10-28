cardDetailsPokeStyles

import { StyleSheet } from "react-native";

const cardDetailsPokeStyles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center"
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
    alignItems: "center"
  }
})

export default cardDetailsPokeStyles;