import React from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';

export const Splash = ({ navigation }) => {

    const fade = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => Animated.timing(fade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
    }).start(() => navigation.replace("States")), [])

    return (
        <View style={styles.containerAll}>
            <Animated.View style={{ ...styles.containerImage, opacity: fade }}>
                <Image resizeMode={"contain"} source={require("../../assets/images/logo.png")} style={styles.img} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: "black"
    },
    containerImage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        width: "40%",
    }
});