import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type MenuItem = {
  name: string;
  price: string;
  category: string;
  description?: string;
};

const COURSE_CATEGORIES: string[] = ['Starter', 'Main', 'Dessert', 'Beverage'];

export function MenuScreen({ route, navigation }: any) {
  const items: MenuItem[] = route.params?.items ?? [];
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.heading}>Menu (second page)</Text>
        <FlatList<MenuItem>
          data={items}
          keyExtractor={(_: MenuItem, idx: number) => idx.toString()}
          renderItem={({ item }: { item: MenuItem }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemTitle}>{item.name} — {item.price}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: "#000" }}>No items yet</Text>}
          contentContainerStyle={{ paddingBottom: 8 }}
        />
        <Pressable style={{ marginTop: 12 }} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export function FilterScreen({ route, navigation }: any) {
  const items: MenuItem[] = route.params?.items ?? [];
  const [selected, setSelected] = useState<"All" | string>("All");

  const filtered = selected === "All" ? items : items.filter(i => i.category === selected);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.heading}>Filter Menu</Text>

        <View style={{ flexDirection: "row", marginBottom: 12, flexWrap: "wrap" }}>
          <Pressable
            key="All"
            onPress={() => setSelected("All")}
            style={[
              styles.categoryButton,
              { backgroundColor: selected === "All" ? "#108700ff" : "#e0e0e0", marginRight: 8, marginBottom: 8 }
            ]}
          >
            <Text style={{ color: selected === "All" ? "#fff" : "#333", fontWeight: selected === "All" ? "700" : "400" }}>All</Text>
          </Pressable>

          {COURSE_CATEGORIES.map((cat: string) => (
            <Pressable
              key={cat}
              onPress={() => setSelected(cat)}
              style={[
                styles.categoryButton,
                { backgroundColor: selected === cat ? "#108700ff" : "#e0e0e0", marginRight: 8, marginBottom: 8 }
              ]}
            >
              <Text style={{ color: selected === cat ? "#fff" : "#333", fontWeight: selected === cat ? "700" : "400" }}>{cat}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={{ marginBottom: 8, color: "#000" }}>Showing: {selected}</Text>

        <FlatList<MenuItem>
          data={filtered}
          keyExtractor={(_: MenuItem, idx: number) => idx.toString()}
          renderItem={({ item }: { item: MenuItem }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemTitle}>{item.name} — {item.price}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: "#000" }}>No items for this category</Text>}
          contentContainerStyle={{ paddingBottom: 8 }}
        />

        <Pressable style={{ marginTop: 12 }} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Define your app screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  // screen wrapper like HomeScreen
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
  // Home/Menu/Filter
  panel: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 16,
    borderRadius: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#108700ff",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    textAlign: "center",
    color: "#000000ff",
    fontWeight: "700",
  },
  editButton: {
    padding: 6,
    backgroundColor: "#ffeaa7",
    borderRadius: 6,
    marginRight: 6,
  },
  deleteButton: {
    padding: 6,
    backgroundColor: "#ff7675",
    borderRadius: 6,
  },

  // Styles used by MenuScreen and FilterScreen to match HomeScreen's look
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#108700ff",
  },
  itemCard: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  itemTitle: {
    fontWeight: "700",
  },
  itemCategory: {
    color: "#444",
  },
  itemDescription: {
    color: "#333",
  },
  backText: {
    color: "#108700ff",
  },
});
