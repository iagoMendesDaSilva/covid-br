import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, SafeAreaView } from 'react-native';

import { Icon, HeaderList } from '../../helpers';

export const Cities = ({ route }) => {

    const [loading, setLoading] = useState(true)
    const [cities, setCities] = useState({ data: [] })
    const [filter, setFilter] = useState({ data: [], text: "" });

    useEffect(() => getCities(), [])

    const getCities = () => {
        return axios({
            method: "GET",
            headers: { 'Content-Type': 'application/json', },
            url: "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalMunicipio"
        })
            .then(resp => {
                configCIties(resp.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const configCIties = cities => {
        const data = cities.filter(item => item.cod.substring(0, 2) == route.params.cod)
        setCities({ data })
    }

    const configNumber = number =>
        number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    const renderItem = (item, index) => {
        return (
            <View style={styles.containerItem} key={String(index)}>
                <Text style={styles.txtName}>{item.nome}</Text>
                <View style={styles.containerRow}>
                    <Icon
                        style={styles.icon}
                        lib={"FontAwesome5"}
                        name={"head-side-cough"}
                        color={"rgba(237, 161, 52,1)"} />
                    <Text style={styles.txtTitle}>{"Casos Acumulados: "}</Text>
                    <Text style={styles.txtText}>{configNumber(item.casosAcumulado)}</Text>
                </View>
                <View style={styles.containerRow}>
                    <Icon
                        name={"skull"}
                        lib={"Ionicons"}
                        style={styles.icon}
                        color={"rgba(217, 61, 56,1)"} />
                    <Text style={styles.txtTitle}>{"Óbitos Acumulados: "}</Text>
                    <Text style={styles.txtText}>{configNumber(item.obitosAcumulado)}</Text>
                </View>
            </View >
        )
    }

    const filterCities = text => {
        const data = cities.data.filter(value =>
            value.nome.toUpperCase().includes(text.toUpperCase()))
        setFilter({ data, text })
    }

    const getEmptyComponent = () =>
        <View style={styles.containerLoad}>
            <Text style={styles.txtSubtitle}>
                Cidade não encontrada
            </Text>
        </View>

    return (
        <SafeAreaView style={styles.containerAll}>
            {
                loading ?
                    <View style={styles.containerLoad}>
                        <ActivityIndicator color={"white"} size={"large"} />
                    </View>
                    :
                    <>
                        <HeaderList
                            title={"Cidades"}
                            text={filter.text}
                            placeholder={"Pesquisar..."}
                            onClose={() => setFilter({ data: [], text: "" })}
                            onchange={text => filterCities(text)} />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={filter.text ? filter.data : cities.data}
                            ListEmptyComponent={getEmptyComponent}
                            renderItem={({ item, index }) => renderItem(item, index)}
                        />
                    </>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: "black"
    },
    containerLoad: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    txtName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "rgba(255,255,255,.5)",
    },
    txtText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgba(255,255,255,1)",
    },
    txtTitle: {
        fontSize: 18,
        color: "rgba(255,255,255,1)",
    },
    containerItem: {
        width: "95%",
        padding: 10,
        borderRadius: 10,
        marginLeft: "2.5%",
        marginBottom: 10,
        backgroundColor: "#171717",
    },
    containerRow: {
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 10,
    },
    txtSubtitle: {
        fontSize: 18,
        color: "rgba(255,255,255,.5)",
    },
});