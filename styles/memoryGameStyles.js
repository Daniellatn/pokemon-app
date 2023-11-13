import { StyleSheet } from "react-native";

const memoryGameStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    //flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardContainer: {
    margin: 10,
    height: 80,
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 80,
    width: 80,
    textAlign: 'center',
    borderRadius: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    padding: 5
  },
  cardFront: {
    borderWidth: 1,
    borderColor: 'red',
  },
  cardBack: {
    borderWidth: 1,
    borderColor: 'red',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
  },
})

export default memoryGameStyles