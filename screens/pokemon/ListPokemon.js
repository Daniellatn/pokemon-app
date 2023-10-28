import { useEffect, useState } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import CardPoke from "../../components/CardPoke"
import listCardPokeStyles from "../../styles/listCardPokeStyles"
import apiPoke from "../../services/apiPoke"


const ListPokemon = ({ navigation }) => {

  const [pokemons, setpokemons] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //getAllPokemon()
    loadMorePokemons()
  }, [])

  function addPokemon(data) {
    AsyncStorage.getItem('pokemon').then(result => {
      const pokemon = JSON.parse(result) || [];
  
      // Verificar se o Pokémon já existe no array
      const isDuplicate = pokemon.some(p => p.name === data.name);
  
      if (!isDuplicate) {
        pokemon.push(data);
        AsyncStorage.setItem('pokemon', JSON.stringify(pokemon));
      } else {
        // Lidar com o caso de tentativa de adicionar um Pokémon duplicado
        console.log('Este Pokémon já está na lista.');
      }
    });
  }
  

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !isLoading) {
      loadMorePokemons();
    }
  };

  const loadMorePokemons = async () => {
    setIsLoading(true);
    try {
      const response = await apiPoke.get('/pokemon', {
        params: {
          offset: pokemons.length,
          limit: 20,
        },
      });

      const pokemonList = response.data.results;
      const detailedPokemonList = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const response = await apiPoke.get(pokemon.url);
          return response.data;
        })
      );

      setpokemons((prevPokemons) => [...prevPokemons, ...detailedPokemonList]);
    } catch (error) {
      console.error('Error loading more pokémons', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll}>
        <View style={listCardPokeStyles.container}>
          {pokemons.map((item, i) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.push('details-pokemon', { id: item.id, type: item.types[0].type.name })}>
              <CardPoke key={i} infos={item}></CardPoke>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    </>
  )
 }

export default ListPokemon