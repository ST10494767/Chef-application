import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens';
import ManageMenuScreen from './menuScreen';
import FilterScreen from './filterScreen';

// Define the structure of a MenuItem
export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: 'Starter' | 'Main' | 'Dessert' | 'Beverage';
  description?: string;
};

export type RootStackParamList = {
  Home: undefined;
  ManageMenu: undefined;
  FilterMenu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="ManageMenu" options={{ title: 'Manage Menu' }}>
          {(props) => (
            <ManageMenuScreen
              {...props}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="FilterMenu" options={{ title: 'Filter Menu' }}>
          {(props) => <FilterScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
