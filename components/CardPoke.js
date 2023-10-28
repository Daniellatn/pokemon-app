import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import cardPokeStyles from "../styles/cardPokeStyles";
import COLORS from "../util/colorsTypePoke";


const CardPoke = ({ infos }) => {

  const type = infos.type != null ? infos.type : infos.types[0]?.type?.name
  const image = infos.icon != null ? infos.icon : infos.sprites.other.home.front_default

  return (
    <View style={[cardPokeStyles.card, {backgroundColor: COLORS[type]}]}>
      <Image
        style={cardPokeStyles.image}
        resizeMode="contain"
        source={{uri: image}}
      />
      <Text style={cardPokeStyles.title}>{infos.name.toUpperCase()}</Text>
    </View>
  )
}

export default CardPoke;