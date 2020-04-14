import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    const signed = true;

    return (
        <NavigationContainer>
            {signed ? (
                <Tab.Navigator
                    initialRouteName="Dashboard"
                    tabBarOptions={{
                        keyboardHidesTabBar: true,
                        activeTintColor: '#7D40E7',
                        inactiveTintColor: '#999',
                        style: {
                            borderTopWidth: 0,
                        },
                        tabStyle: { marginBottom: 3 },
                    }}
                >
                    <Tab.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={Dashboard.navigationOptions}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={Profile.navigationOptions}
                    />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator
                    initialRouteName="SignIn"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="SignIn" component={SignIn} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
