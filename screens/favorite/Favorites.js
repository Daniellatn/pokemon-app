import React, { useCallback, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import listCardPokeStyles from '../../styles/listCardPokeStyles';
import CardPoke from '../../components/CardPoke';
import { useFocusEffect } from '@react-navigation/native';



const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites()
    }, [])
  )

  function getFavorites() {
    AsyncStorage.getItem('pokemon').then(result => {
      result = JSON.parse(result) || []
      setFavorites(result)
    })
  }
  
  return (
    <>
      <ScrollView>
        <View style={listCardPokeStyles.container}>
          {favorites.map(item => (
            <TouchableOpacity key={item.id} onPress={() => navigation.push('details-pokemon', { id: item.id, type: item.types[0].type.name })}>
              <CardPoke key={item.id} infos={item}></CardPoke>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    </>
  );
};

export default Favorites;
