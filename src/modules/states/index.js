import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { uf } from '../../assets/values/uf'
import { Icon, HeaderList } from '../../helpers';

export const States = ({ navigation }) => {

    const [loading, setLoading] = useState(true)
    const [states, setState] = useState({ data: [] })
    const [filter, setFilter] = useState({ data: [], text: "" });

    useEffect(() => getStates(), [])

    const getStates = () => {
        return axios({
            method: "GET",
            headers: { 'Content-Type': 'application/json', },
            url: "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalEstado"
        })
            .then(resp => {
                setState({ data: resp.data })
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const goToCities = name => {
        const state = uf.filter(item => item.uf === name)
        navigation.navigate("Cities", { cod: state[0].codigo_uf })
    }

    const configNumber = number =>
        number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity onPress={() => goToCities(item.nome)}
                style={styles.containerItem} key={String(index)}>
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
                <View style={styles.containerRow}>
                    <Icon
                        lib={"Ionicons"}
                        name={"people"}
                        style={styles.icon}
                        color={"rgba(92, 184, 92,1)"} />
                    <Text style={styles.txtTitle}>{"População estimada: "}</Text>
                    <Text style={styles.txtText}>{configNumber(item.populacaoTCU2019)}</Text>
                </View>
            </TouchableOpacity >
        )
    }

    const filterStates = text => {
        const data = states.data.filter(value =>
            value.nome.toUpperCase().includes(text.toUpperCase()))
        setFilter({ data, text })
    }

    const getEmptyComponent = () =>
        <View style={styles.containerLoad}>
            <Text style={styles.txtSubtitle}>
                Estado não encontrado
            </Text>
        </View>

    return (
        <View style={styles.containerAll}>
            {
                loading ?
                    <View style={styles.containerLoad}>
                        <ActivityIndicator color={"white"} size={"large"} />
                    </View>
                    :
                    <>
                        <HeaderList
                            title={"Estados"}
                            text={filter.text}
                            placeholder={"Pesquisar..."}
                            onClose={() => setFilter({ data: [], text: "" })}
                            onchange={text => filterStates(text)} />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={filter.text ? filter.data : states.data}
                            ListEmptyComponent={getEmptyComponent}
                            renderItem={({ item, index }) => renderItem(item, index)}
                        />
                    </>
            }
        </View>
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