import { View } from "react-native"
import { Text } from "react-native-paper"

const MemoryGame = ({ navigation, route}) => {

  const level =  route.params.level
  
  console.log('jogo ', level)

  return (
    <View>
      <Text>{level.name}</Text>
      <Text>{level.quantity}</Text>
    </View>
  )
}

export default MemoryGame