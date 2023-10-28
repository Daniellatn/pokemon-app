import { useEffect, useState } from "react"
import { Button, Card, IconButton, List, ProgressBar, Text } from "react-native-paper"
import apiPoke from "../../services/apiPoke"
import { Image, ScrollView, View } from "react-native"
import COLORS from "../../util/colorsTypePoke"
import cardDetailsPokeStyles from "../../styles/cardDetailsPokeStyles"
import AsyncStorage from "@react-native-async-storage/async-storage"

const DetailsPokemon = ({ route }) => {

  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);


  const [details, setdetails] = useState({})
  const type = route.params.type
 
  useEffect(() => {
    const id = route.params.id
    getDetails(id)
  }, [])

  function getDetails(id) {
    apiPoke.get('/pokemon/' + id).then(resultado => {
      setdetails(resultado.data)
    })
  }

  function addPokemon(data) {
    AsyncStorage.getItem('pokemon').then(result => {
      const pokemon = JSON.parse(result) || []
      pokemon.push(data)
      AsyncStorage.setItem('pokemon', JSON.stringify(pokemon))
    })
  }

  return (
    <>
     <ScrollView>
      <View style={{ backgroundColor: COLORS[type] }} >
        <View style={cardDetailsPokeStyles.favorite} >
          <Text> Nº  {details.id}</Text>
          <IconButton icon="cards-heart-outline" onPress={() => addPokemon(details)} />
        </View>
        <View style={cardDetailsPokeStyles.card}>
          <Image source={{ uri: details.sprites?.other?.home?.front_default }} style={cardDetailsPokeStyles.image} />
        </View>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 25, padding: 10 }}>{details.name}</Text>
      </View>

      <View style={{ flex: 3 }}>
          <List.Section >
            <Text style={{textAlign:'center', text:COLORS[type], marginTop:0, padding:20}} >SOBRE</Text>
  
      <List.Accordion
        title="Habilidades"
        left={props => <List.Icon {...props} icon="pokeball" />}>
          {details.abilities?.map(item => (
             <Card.Title
             title= {item.ability?.name}
             
             right={(props) => <IconButton {...props} icon="check" />}
           />
            ))}

      </List.Accordion>

      <List.Accordion
        title="Estatistica "
        left={props => <List.Icon {...props} icon="pokeball" />}
        expanded={expanded}
        onPress={handlePress}>
          {details.stats?.map(item => (
            <View style={{marginLeft:0}}>
        <Text>{item.stat?.name} - {item.base_stat} </Text> 
        <ProgressBar   progress={item.base_stat/100} color='blue'/>
            </View>
            ))}
      </List.Accordion>
    </List.Section>
    
    
    
            </View>
            </ScrollView> 
     
      
     
    </>
  )
}

export default DetailsPokemon