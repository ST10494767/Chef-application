import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { MenuItem } from './App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

type Props = NativeStackScreenProps<RootStackParamList, 'FilterMenu'> & {
  menuItems: MenuItem[];
};

export default function FilterScreen({ menuItems }: Props) {
  const [selected, setSelected] = useState<MenuItem['category'] | null>(null);

  const filtered = selected
    ? menuItems.filter((item) => item.category === selected)
    : menuItems;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>

      <View style={styles.buttons}>
        {(['Starter', 'Main', 'Dessert', 'Beverage'] as MenuItem['category'][]).map(
          (course) => (
            <Button key={course} title={course} onPress={() => setSelected(course)} />
          )
        )}
        <Button title="Show All" onPress={() => setSelected(null)} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.category} - R{item.price}
          </Text>
        )}
        ListEmptyComponent={<Text>No items to show.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  buttons: { gap: 6, marginBottom: 12 },
  item: { marginVertical: 4 },
});
