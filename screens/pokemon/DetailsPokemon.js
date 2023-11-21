import { useEffect, useState } from "react";
import { Button, Card, IconButton, Text } from "react-native-paper";
import apiPoke from "../../services/apiPoke";
import { Image, View } from "react-native";
import COLORS from "../../util/colorsTypePoke";
import cardDetailsPokeStyles from "../../styles/cardDetailsPokeStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsPokemon = ({ route }) => {
  const [details, setDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const type = route.params.type;

  useEffect(() => {
    const id = route.params.id;
    getDetails(id);
  }, []);

  useEffect(() => {
    // Check if the current Pokémon is already in favorites
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
      <View style={{ backgroundColor: COLORS[type] }} >
        <View style={cardDetailsPokeStyles.favorite} >
          <Text> Nº  {details.id}</Text>
          <IconButton
            icon={isFavorite ? "cards-heart" : "cards-heart-outline"}
            color={isFavorite ? "red" : "black"}
            onPress={() => addPokemon(details)}
          />
        </View>
        <View style={cardDetailsPokeStyles.card}>
          <Image source={{ uri: details.sprites?.other?.home?.front_default }} style={cardDetailsPokeStyles.image} />
        </View>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 25, padding: 10 }}>{details.name}</Text>
      </View>
      <Card style={{ margin: 10 }}>
        <Card.Actions>
          <Button>Sobre</Button>
          <Button>Estatistica</Button>
          <Button>Habilidade</Button>
        </Card.Actions>
        <Text>{details.evolves_from_species}</Text>
      </Card>
    </>
  );
}

export default DetailsPokemon;