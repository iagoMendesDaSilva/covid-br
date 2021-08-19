import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Icon } from '../helpers';
import { Splash, States, Cities } from '../modules';

export const StackNav = () => {

    const Stack = createStackNavigator();

    const back = () =>
        <StatusBar animated barStyle={'light-content'} backgroundColor={"black"} />

    const screenOptions = {
        headerTitle: false,
        headerTransparent: true,
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Splash'
                screenOptions={screenOptions}>
                <Stack.Screen name="Splash" component={Splash} options={{ header: back }} />
                <Stack.Screen name="States" component={States} options={{ header: back }} />
                <Stack.Screen name="Cities" component={Cities} options={{ header: back }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
