import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Games from "./Games";
import LevelsGame from "./memory-game/LevelsGame";
import MemoryGame from "./memory-game/MemoryGame";
import Comparator from "./Comparator";

const Stack = createNativeStackNavigator();

const StackGames = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="list-games" component={Games} options={{ title: 'Games' }} />
        <Stack.Screen name="level-memory-game" component={LevelsGame} options={{ title: 'Nível' }} />
        <Stack.Screen name="memory-game" component={MemoryGame} options={{ title: 'Jogo da Mémoria' }} />
        <Stack.Screen name="comparator-page" component={Comparator} options={{ title: 'Comparador' }} />
      </Stack.Navigator>
    </>
  )
}

export default StackGames