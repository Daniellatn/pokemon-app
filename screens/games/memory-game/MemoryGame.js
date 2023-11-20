import { useEffect, useState } from "react"
import { Image, TouchableWithoutFeedback, View } from "react-native"
import { Text } from "react-native-paper"
import memoryGameStyles from "../../../styles/memoryGameStyles"
import FlipCard from "react-native-flip-card"
import { shuffle } from "../../../util/shuffle"
import levelMemoryGame from "../../../util/levelsMemoryGame"
import apiPoke from "../../../services/apiPoke"

const MemoryGame = ({ navigation, route }) => {

  const level = route.params.level
  const coupleCardsNumber = level.quantity
  let pokemon = route.params.pokemons
  const [cardRow, setCardRow] = useState([])
  const [selecteds, setSelecteds] = useState([])
  const [combinedCards, setCombinedCards] = useState([])

  const [initTime, setInitTime] = useState(undefined)

  useEffect(() => {
    navigation.setOptions({ title: `Nível ${level.name}` });
    pokemon = shuffle(pokemon)
    console.log('PPP', pokemon)
    let cardList = [];
    let id = 0;
    for (let i = 0; i < (coupleCardsNumber / 2); i++) {
      const obj = () => {
        return { id: id, type: pokemon[i].sprites?.other?.home?.front_default, selected: false }
      }
      cardList.push(obj())
      id++;
      cardList.push(obj())
      id++;
    }

    cardList = shuffle(cardList);

    const rowList = [];
    
    console.log('cardList.length', cardList.length)
    if (level == levelMemoryGame.EASY || level == levelMemoryGame.MEDIUM) {
      for (let i = 0; i < cardList.length; i = i + 3) {
        rowList.push(cardList.slice(i, i + 3));
      }
    }
    if (level == levelMemoryGame.HARD) {
      for (let i = 0; i < cardList.length; i = i + 4) {
        rowList.push(cardList.slice(i, i + 4));
      }
    }
    setCardRow(rowList);
    console.log('cardList', cardList)
  }, []);

  useEffect(() => {
    if (selecteds.length == 2) {
      setTimeout(() => {
        if (selecteds[0].type === selecteds[1].type) {
          setCombinedCards([...combinedCards, selecteds[0].type]);
        }

        setSelecteds([]);
      }, 1000);
    }
  }, [selecteds]);

  function onPressCard(card) {
    if (
      selecteds.length < 2 &&
      !(selecteds.find((el) => el.id == card.id)) &&
      !(combinedCards.find((el) => el == card.type))
    ) {
      setSelecteds([...selecteds, card]);
    }

    if (initTime == null) {
      setInitTime(new Date());
    }
  }

  function calculateTime() {
    function format(milliseconds) {
      var ret = '';
      let secs = milliseconds / 1000;
      const mins = secs / 60;

      if (mins >= 1) {
        ret += mins.toFixed(0) + ' minuto(s) e ';
        secs = secs - 60 * parseInt(mins.toFixed(0));
      }
      ret += secs.toFixed(0) + ' segundos.';
      return ret;
    }

    return format(Math.abs(new Date().getTime() - initTime.getTime()));
  }

  // function getAllPokemon() {
  //   apiPoke.get('/pokemon').then(async (resultado) => {
  //     const pokemonList = resultado.data.results
  //     const detailsPokemonList = await Promise.all(
  //       pokemonList.map(async (pokemon) => {
  //         const response = await apiPoke.get("/pokemon/" + pokemon.name);
  //         return response.data
  //       })
  //     )
  //     setpokemon(detailsPokemonList)
  //   })
  // }

  return (
    <View style={memoryGameStyles.container}>
      {combinedCards.length < coupleCardsNumber && (
        <View style={memoryGameStyles.cardsContainer}>
          {cardRow.map((cardListRow, index) => (
            <View style={memoryGameStyles.cardRow} key={`cardrow_${index}`}>
              {cardListRow.map((card, index) => (
                <TouchableWithoutFeedback
                  style={{ height: 110, minHeight: 110 }}
                  key={`card_${index}`}
                  onPress={() => onPressCard(card)}
                >
                  <FlipCard
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={Boolean(
                      selecteds.find((el) => el.id == card.id)
                    )}
                    clickable={false}
                    style={memoryGameStyles.cardContainer}
                  >
                    <Image
                      style={[
                        {
                          opacity: Boolean(
                            combinedCards.find((type) => type == card.type)
                          )
                            ? 0
                            : 1,
                        },
                        memoryGameStyles.cardImage,
                        memoryGameStyles.cardFront,
                      ]}
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png' }}
                    />
                    <Image
                      style={[
                        {
                          opacity: Boolean(
                            combinedCards.find((type) => type == card.type)
                          )
                            ? 0
                            : 1,
                        },
                        memoryGameStyles.cardImage, memoryGameStyles.cardBack
                      ]}
                      resizeMode="center"
                      source={{ uri: card.type }}
                    />
                  </FlipCard>
                </TouchableWithoutFeedback>
              ))}
            </View>
          ))}
        </View>
      )}
      {combinedCards.length == (coupleCardsNumber/2) && (
        <View style={memoryGameStyles.resultContainer}>
          <Text style={memoryGameStyles.resultText}>PARABÉNS</Text>
          <Text style={memoryGameStyles.resultText}>
            Você concluiu com sucesso o nível {level.name} com o tempo de:
          </Text>
          <Text style={memoryGameStyles.resultText}>{calculateTime()}</Text>
        </View>
      )}
    </View>
  )
}

export default MemoryGame