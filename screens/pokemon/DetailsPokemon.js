import { useEffect, useState } from "react";
import { Button, Card, IconButton, List, ProgressBar, Text } from "react-native-paper";
import apiPoke from "../../services/apiPoke";
import { Image, ScrollView, View } from "react-native";
import COLORS from "../../util/colorsTypePoke";
import cardDetailsPokeStyles from "../../styles/cardDetailsPokeStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsPokemon = ({ route }) => {
  const [details, setDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const type = route.params.type;
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    const id = route.params.id
    getDetails(id)
    
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('pokemon').then(result => {
      const pokemon = JSON.parse(result) || [];
      const isAlreadyFavorite = pokemon.some(p => p.id === details.id);
      setIsFavorite(isAlreadyFavorite);
    });
  }, [details]);

  function getDetails(id) {
    apiPoke.get('/pokemon/' + id).then(resultado => {
      setDetails(resultado.data);
    });
  }

  function addPokemon(data) {
    AsyncStorage.getItem('pokemon').then(result => {
      const pokemon = JSON.parse(result) || [];
      if (!isFavorite) {
        pokemon.push(data);
        AsyncStorage.setItem('pokemon', JSON.stringify(pokemon));
        setIsFavorite(true);
      } else {
        removePokemon(data.id);
        setIsFavorite(false);
      }
    });
  }

  function removePokemon(id) {
    AsyncStorage.getItem('pokemon').then(result => {
      const pokemon = JSON.parse(result) || [];
      const updatedPokemon = pokemon.filter(p => p.id !== id);
      AsyncStorage.setItem('pokemon', JSON.stringify(updatedPokemon));
    });
  }

  return (
    <>
      <ScrollView>
        <View style={{ backgroundColor: COLORS[type] }} >
          <View style={cardDetailsPokeStyles.favorite} >
            <Text style={cardDetailsPokeStyles.text}> Nº  {details.id}</Text>
            <IconButton
              icon={isFavorite ? "cards-heart" : "cards-heart-outline"}
              onPress={() => addPokemon(details)}
            />
          </View>
          <View style={cardDetailsPokeStyles.card}>
            <Image source={{ uri: details.sprites?.other?.home?.front_default }} style={cardDetailsPokeStyles.image} />
          </View>
          <Text style={cardDetailsPokeStyles.textCard}>{details.name?.toUpperCase()}</Text>
        </View>
        <View style={{ flex: 3 }}>
          <List.Section >
            <List.Accordion
              title="Tipos"
              left={props => <List.Icon {...props} icon="pokeball" />}>
              <Card style={cardDetailsPokeStyles.cardType}>
                {details.types?.map(item => (
                  <View style={[cardDetailsPokeStyles.type, {backgroundColor: COLORS[item.type.name]}]}>
                    <Text style={cardDetailsPokeStyles.textType}>{item.type.name}</Text>
                  </View>
                ))}
              </Card>

            </List.Accordion>

            <List.Accordion
              title="Estatistica "
              left={props => <List.Icon {...props} icon="pokeball" />}
              expanded={expanded}
              onPress={handlePress}>
              {details.stats?.map(item => (
                <View style={{ marginLeft: 0 }}>
                  <Text>{item.stat?.name} - {item.base_stat} </Text>
                  <ProgressBar progress={item.base_stat / 100} color='blue' />
                </View>
              ))}
            </List.Accordion>

            <List.Accordion
              title="Habilidades"
              left={props => <List.Icon {...props} icon="pokeball" />}>
              {details.abilities?.map(item => (
                <Card.Title
                  title={item.ability?.name}

                  right={(props) => <IconButton {...props} icon="check" />}
                />
              ))}

            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>

    </>
  );
}

export default DetailsPokemon;