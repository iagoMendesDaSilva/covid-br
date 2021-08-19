import React, { useState, useRef, createRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Animated, Keyboard, Text } from 'react-native';

import { Icon } from './icon';

const widthScreen = Dimensions.get("screen").width;

export const HeaderList = ({ title, onchange, placeholder, onClose, text = "" }) => {

    const refInput = createRef(null);

    const [open, setOpen] = useState(false);
    const searchWidth = useRef(new Animated.Value(widthScreen)).current;

    const pressSearch = () => {
        Animated.timing(searchWidth, {
            toValue: open ? widthScreen : 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            !open ? refInput.current.focus() : Keyboard.dismiss()
            open && onClose()
            setOpen(!open)
        })
    }

    return (
        <View style={styles.containerAll}>
            <View style={styles.containerContent}>
                <View style={styles.containerSearch}>
                    <Text
                        children={title}
                        style={styles.txtTitle} />
                </View>
                <TouchableOpacity
                    style={styles.icon}
                    hitSlop={styles.hitSlop}
                    onPress={pressSearch} >
                    <Icon
                        lib={"Octicons"}
                        name={"search"} />
                </TouchableOpacity>
            </View>

            <Animated.View style={{ ...styles.containerContent, transform: [{ translateX: searchWidth }] }}>
                <View style={styles.containerSearch}>
                    <TouchableOpacity
                        onPress={pressSearch}
                        style={styles.iconArrow}
                        hitSlop={styles.hitSlopArrow}>
                        <Icon
                            size={25}
                            name={"angle-left"} />
                    </TouchableOpacity>
                    <TextInput
                        value={text}
                        ref={refInput}
                        autoCorrect={false}
                        style={styles.textInput}
                        allowFontScaling={false}
                        placeholder={placeholder}
                        onChangeText={onchange}
                        placeholderTextColor={"rgba(255,255,255,.3)"} />
                    {
                        Boolean(text) &&
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.iconArrow}
                            hitSlop={styles.hitSlopArrow}>
                            <Icon
                                name={"close"}
                                lib={"antdesign"}
                                color={"rgba(255,255,255,.3)"} />
                        </TouchableOpacity>
                    }
                </View>

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        height: 70,
        marginBottom:10,
        width: widthScreen,
    },
    containerContent: {
        position: "absolute",
        paddingVertical: 10,
        width: widthScreen,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#171717",
    },
    textInput: {
        flex: 1,
        fontSize: 20,
        color: "white",
    },
    icon: {
        marginRight: 20,
    },
    iconArrow: {
        marginRight: 10,
    },
    containerSearch: {
        flex: 1,
        height: 50,
        marginLeft: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    txtTitle: {
        fontSize: 30,
        marginLeft: 20,
        color: "white",
        fontWeight: "bold",
    },
    hitSlop: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    },
    hitSlopArrow: {
        top: 10,
        left: 10,
        right: 20,
        bottom: 10,
    },
})
