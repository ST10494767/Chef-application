import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { MenuItem } from './App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import uuid from 'react-native-uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageMenu'> & {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

export default function ManageMenuScreen({
  menuItems,
  setMenuItems,
}: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<MenuItem['category'] | ''>('');

  const addItem = () => {
    if (!name || !price || !category) return;
    const newItem: MenuItem = {
      id: uuid.v4().toString(),
      name,
      price: parseFloat(price),
      category,
    };
    setMenuItems([...menuItems, newItem]);
    setName('');
    setPrice('');
    setCategory('');
  };

  const removeItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (Starter/Main/Dessert/Beverage)"
        value={category}
        onChangeText={(text) =>
          setCategory(text as MenuItem['category'])
        }
      />
      <Button title="Add Item" onPress={addItem} />

      <Text style={styles.subtitle}>Current Menu Items</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>
              {item.name} - R{item.price}
            </Text>
            <Button title="Remove" onPress={() => removeItem(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text>No items yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontWeight: 'bold', marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 8,
    marginVertical: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
