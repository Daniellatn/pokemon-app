import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "./Favorites";
import DetailsPokemon from "../pokemon/DetailsPokemon";

const Stack = createNativeStackNavigator();

const StackFavorites = () => {
  return (
    <>
      <Stack.Navigator>
      <Stack.Screen name="list-favorites" component={Favorites} options={{ title: 'Favoritos' }} />
      <Stack.Screen name="details-pokemon" component={DetailsPokemon} options={{ title: 'Detalhes Pokémons' }} />
      </Stack.Navigator>
    </>
  )
}

export default StackFavorites