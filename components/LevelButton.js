import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper"
import gamesPageStyles from "../styles/gamesPageStyles";
import COLORS from "../util/colorsTypePoke";

const LevelButton = ({ level, navigation, pokemon }) => {

  return (
    <>
      <Button style={[gamesPageStyles.button, {backgroundColor: COLORS[level.description]}]} mode="contained-tonal" onPress={() => navigation.push('memory-game', {level: level, pokemons: pokemon})}>
        {level.name}
      </Button>
    </>

  )
}

export default LevelButton