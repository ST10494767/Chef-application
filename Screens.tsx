import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { MenuItem } from './App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  menuItems: MenuItem[];
};

export default function HomeScreen({ navigation, menuItems }: Props) {
  const calculateAverage = (category: MenuItem['category']) => {
    const items = menuItems.filter((item) => item.category === category);
    if (items.length === 0) return 0;
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return (total / items.length).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Menu</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.category} - R{item.price}
          </Text>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No menu items added yet.</Text>
        }
      />

      <Text style={styles.subtitle}>Average Price per Course</Text>
      {(['Starter', 'Main', 'Dessert', 'Beverage'] as MenuItem['category'][]).map(
        (course) => (
          <Text key={course} style={styles.avgText}>
            {course}: R{calculateAverage(course)}
          </Text>
        )
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Manage Menu"
          onPress={() => navigation.navigate('ManageMenu')}
        />
        <Button
          title="Filter Menu"
          onPress={() => navigation.navigate('FilterMenu')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#00ff15ff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { marginTop: 20, fontWeight: 'bold' },
  item: { marginVertical: 5 },
  avgText: { marginVertical: 2 },
  emptyText: { color: '#999', marginVertical: 10 },
  buttonContainer: { marginTop: 20, gap: 10 },
});
