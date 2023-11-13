import { View } from "react-native"
import { Text } from "react-native-paper"
import LevelButton from "../../../components/LevelButton"
import levelMemoryGame from "../../../util/levelsMemoryGame"
import gamesPageStyles from "../../../styles/gamesPageStyles"
import { useEffect, useState } from "react"
import apiPoke from "../../../services/apiPoke"

const LevelsGame = ({ navigation }) => {

  const [pokemon, setpokemon] = useState([])

  useEffect(() => {
    getAllPokemon()
  }, [])

  function getAllPokemon() {
    apiPoke.get('/pokemon').then(async (resultado) => {
      const pokemonList = resultado.data.results
      const detailsPokemonList = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const response = await apiPoke.get("/pokemon/" + pokemon.name);
          return response.data
        })
      )
      setpokemon(detailsPokemonList)
    })
  }

  return (

      <View style={gamesPageStyles.levelButton}>
        <Text style={gamesPageStyles.title}>Escolha o nível</Text>

          <LevelButton level={levelMemoryGame.EASY} navigation={navigation} pokemon={pokemon}></LevelButton>
          <LevelButton level={levelMemoryGame.MEDIUM} navigation={navigation} pokemon={pokemon}></LevelButton>
          <LevelButton level={levelMemoryGame.HARD} navigation={navigation} pokemon={pokemon}></LevelButton>

      </View>

  )
}

export default LevelsGame