import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import {Card, Divider, IconButton, MD3Colors, Menu, ProgressBar, Text } from 'react-native-paper'
import apiPoke from '../../services/apiPoke'
import { Picker } from '@react-native-picker/picker'
const Comparator = () => {

    const [primeiro, setPrimeiro] = useState({})
    const [segundo, setSegundo] = useState({})
    const [lista, setLista] = useState([])
    const [n, setN] = useState(0)

    const [comparador, setComparador] = useState(['bulbasaur', 'charmander'])

    function alterar(value) {
        comparador.splice(0, 1, value)
        setN(n + 1)
        console.log(comparador, n);
    }
    function alterarSegundo(value) {
        comparador.splice(1, 1, value)
        setN(n + 1)
        console.log(comparador, n);
    }

    useEffect(() => {
        apiPoke.get('pokemon/' + comparador[0]).then(resultado => {
            setPrimeiro(resultado.data)
        })
        apiPoke.get('pokemon/' + comparador[1]).then(resultado => {
            setSegundo(resultado.data)
        })
        apiPoke.get('pokemon').then(resultado => {
            setLista(resultado.data.results)
        })


    }, [n])

    return (
        <ScrollView>

            <Picker onValueChange={(value) => alterar(value)}>
              <Picker.Item label='Selecione um Pokemon..'value='null' />
              {lista.map(item=>(
                <Picker.Item label={item.name} value={item.name} />
              ))}
                
            </Picker>
            <Picker onValueChange={(value) => alterarSegundo(value)}>
            <Picker.Item label='Selecione um Pokemon..'value='null' />
              {lista.map(item=>(
                <Picker.Item label={item.name} value={item.name} />

              ))}
                
            </Picker>
               
           
            <View style={estilo.imagem}>
                {primeiro.sprites &&
                    <Image source={{ uri: primeiro.sprites?.other?.home?.front_default }}
                        style={{ height: 100, width: 100, alignItems:'flex-start' }} />
                }
                <Image source={require('../../assets/pokeball.png')} style={{height:80, width:80, margin:10}}/>
                {segundo.sprites &&

                    <Image source={{ uri: segundo.sprites?.other?.home?.front_default }}
                        style={{ height: 100, width: 100, alignItems:'flex-end' }} />
                }
            </View>
            <View style={estilo.informacao} >
                <View style={{margin:5}}>
                    <Text style={{color: '#37A7F2'}}>{primeiro.name} </Text>
                    <Divider/>
                    {primeiro.stats &&
                        primeiro.stats.map(item => (
                            <View>
                            <Text style={{color: '#37A7F2',}}>{item?.stat?.name},{item.base_stat}</Text>
                            <ProgressBar progress={item.base_stat/100} color='blue' />
                            </View>
                        ))
                    }
                </View>
                <View style={{margin:5,}}>
                    <Text style={{color: '#37A7F2', }}> {segundo.name}</Text>
                    <Divider/>
                    {segundo.stats &&
                        segundo.stats.map(item => (
                            <View >
                            <Text style={{color: '#37A7F2', alignItems:'flex-end'}}>{item.base_stat},{item?.stat?.name}</Text>
                            <ProgressBar progress={item.base_stat/100} color='red' />
                            
                            </View>
                        ))
                      }
                </View>
            </View>
        </ScrollView>
    )
}

const estilo = StyleSheet.create({
    imagem: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#37A7F2',
        borderRadius: 20, 
        padding:20,
       
    },
    informacao: {
        display: 'flex',
        flexDirection: 'Row',
        margin: 10,
        borderWidth: 2, // Largura da borda em pixels
        borderColor: 'blue',
        borderRadius: 20,
        padding:10,
    }
})

export default Comparator