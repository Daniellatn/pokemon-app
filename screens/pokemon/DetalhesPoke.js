import React, { useEffect, useState } from 'react'
import apiPoke from '../../services/apiPoke'
import { Dimensions, Image, SafeAreaView, ScrollView, View } from 'react-native'
import { Button, Card, IconButton, List, ProgressBar, Text } from 'react-native-paper'
import cardDetailsPokeStyles from '../../styles/cardDetailsPokeStyles'
import COLORS from '../../util/colorsTypePoke'
import { MyCarousel } from '../../components/Carrossel'


const DetalhesPoke = ({ navigation, route }) => {

  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);


  const [detalhes, setDetalhes] = useState({})
  const [poke, setPoke] = useState([])


  const type = route.params.type
  useEffect(() => {
    const id = route.params.id
    apiPoke.get('/pokemon/' + id).then(resultado => {
      setDetalhes(resultado.data)
    })
    apiPoke.get('/pokemon/' + id).then(resultado => {
      setPoke(resultado.data)
    })

  }, [])
 



  return (
    <>
    <ScrollView>

      <View style={{ backgroundColor: COLORS[type] }} >
        <View style={{  alignItems: 'flex-end' }}>
        
          <IconButton  icon="cards-heart-outline" onPress={() => console.log('Pressed')} />  
       
        </View> 
        
          <Text style={{marginLeft:10, marginStart:0}} > Nº  {detalhes.id}</Text>
          
     
        <View style={cardDetailsPokeStyles.card}>
          <Image source={{ uri: detalhes.sprites?.other?.home?.front_default }} style={cardDetailsPokeStyles.image} />
        </View>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 25, padding: 10 }}>{detalhes.name}</Text>
      </View>
           
  
    <View style={{ flex: 3 }}>
          <List.Section >
            <Text style={{textAlign:'center', text:COLORS[type], marginTop:0, padding:20}} >SOBRE</Text>
  
      <List.Accordion
        title="Habilidades"
        left={props => <List.Icon {...props} icon="pokeball" />}>
          {poke.abilities?.map(item => (
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
          {poke.stats?.map(item => (
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

export default DetalhesPoke