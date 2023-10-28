import { View } from "react-native"
import { Text } from "react-native-paper"
import LevelButton from "../../../components/LevelButton"
import levelMemoryGame from "../../../util/levelsMemoryGame"
import gamesPageStyles from "../../../styles/gamesPageStyles"

const LevelsGame = ({ navigation }) => {
  return (

      <View style={gamesPageStyles.levelButton}>
        <Text style={gamesPageStyles.title}>Escolha o nível</Text>

          <LevelButton level={levelMemoryGame.EASY} navigation={navigation}></LevelButton>
          <LevelButton level={levelMemoryGame.MEDIUM} navigation={navigation}></LevelButton>
          <LevelButton level={levelMemoryGame.HARD} navigation={navigation}></LevelButton>

      </View>

  )
}

export default LevelsGame