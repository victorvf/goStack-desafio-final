import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import DetailDelivery from './pages/DeliveryPages/DetailDelivery';
import ReportProblem from './pages/DeliveryPages/ReportProblem';
import ViewProblems from './pages/DeliveryPages/ViewProblems';
import ConfirmDelivery from './pages/DeliveryPages/ConfirmDelivery';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    const signed = useSelector((state) => state.auth.signed);

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
                        name="Deliveries"
                        options={{
                            tabBarLabel: 'Entregas',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="dehaze" size={size} color={color} />
                            ),
                        }}
                    >
                        {() => (
                            <Stack.Navigator
                                initialRouteName="Deliveries"
                                screenOptions={{
                                    headerTransparent: true,
                                    headerTintColor: '#fff',
                                }}
                            >
                                <Stack.Screen
                                    name="Dashboard"
                                    component={Dashboard}
                                    options={Dashboard.navigationOptions}
                                />
                                <Stack.Screen
                                    name="DetailDelivery"
                                    component={DetailDelivery}
                                    options={DetailDelivery.navigationOptions}
                                />
                                <Stack.Screen
                                    name="ViewProblems"
                                    component={ViewProblems}
                                    options={ViewProblems.navigationOptions}
                                />
                                <Stack.Screen
                                    name="ReportProblem"
                                    component={ReportProblem}
                                    options={ReportProblem.navigationOptions}
                                />
                                <Stack.Screen
                                    name="ConfirmDelivery"
                                    component={ConfirmDelivery}
                                    options={ConfirmDelivery.navigationOptions}
                                />
                            </Stack.Navigator>
                        )}
                    </Tab.Screen>
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
