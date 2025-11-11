import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Give the menu item type
interface MenuItem {
  name: string;
  description: string;
  category: string;
  price: string;
}

const COURSE_CATEGORIES = ["Starter", "Main", "Dessert"];

function HomeScreen({ navigation }: any) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [items, setItems] = useState<MenuItem[]>([]); 
  const [validationMsg, setValidationMsg] = useState<string>("");

  
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const scale = useRef(new Animated.Value(1)).current;
  const animatePop = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1.05, friction: 4, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  };

  const handleAddItem = (): boolean => {
    if (!name.trim()) {
      setValidationMsg("Please enter a name");
      return false;
    }
    const cleaned = price.replace(/[^\d.]/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num) || num <= 0) {
      setValidationMsg("Enter a price greater than 0");
      return false;
    }
    if (!category) {
      setValidationMsg("Select a course");
      return false;
    }
    const formatted = `R${num.toFixed(2)}`;
    if (editingIndex !== null && editingIndex >= 0 && editingIndex < items.length) {
      
      const updated = [...items];
      updated[editingIndex] = { name: name.trim(), description: description.trim(), category, price: formatted };
      setItems(updated);
      setEditingIndex(null);
    } else {
      // add new
      setItems([
        ...items,
        { name: name.trim(), description: description.trim(), category, price: formatted }
      ]);
    }
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setValidationMsg("");
    return true;
  };

  const handleDelete = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    // if we were editing this item, cancel edit
    if (editingIndex === index) {
      setEditingIndex(null);
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setValidationMsg("");
    } else if (editingIndex !== null && editingIndex > index) {
      
      setEditingIndex(editingIndex - 1);
    }
  };

  const handleEdit = (index: number) => {
    const it = items[index];
    setName(it.name);
    setDescription(it.description);
    setCategory(it.category);
    setPrice(it.price.replace(/[^\d.]/g, ""));
    setEditingIndex(index);
    setValidationMsg("");
  };

  return (
    <ImageBackground source={require('./assets/download.jpg')} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SafeAreaView style={{ width: "90%" }}>
          <View style={{ backgroundColor: "rgba(255,255,255,0.9)", padding: 16, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ color: "#000000ff", marginBottom: 8 }}>
              {editingIndex !== null ? "Edit Food Item:" : "Enter Food Name:"}
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Food Name"
            />
            <Text style={{ color: "#000000ff", marginBottom: 8 }}>Enter Description:</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
            />
            <Text style={{ color: "#000000ff", marginBottom: 8 }}>Select Food Category:</Text>
            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              {COURSE_CATEGORIES.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: category === cat ? "#108700ff" : "#e0e0e0",
                      borderColor: category === cat ? "#108700ff" : "#ccc",
                      borderWidth: category === cat ? 2 : 1,
                    },
                  ]}
                >
                  <Text style={{ color: category === cat ? "#fff" : "#333", fontWeight: category === cat ? "700" : "400" }}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text style={{ color: "#000000ff" }}>Enter Price:</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Price (e.g., 12.50)"
              keyboardType="numeric"
            />

            <Animated.View style={{ transform: [{ scale }] }}>
              <Pressable
                style={styles.addButton}
                onPress={() => {
                  const ok = handleAddItem();
                  if (ok) animatePop();
                }}
              >
                <Text style={styles.addButtonText}>
                  {editingIndex !== null ? "Save" : "Add to Menu"}
                </Text>
              </Pressable>
            </Animated.View>

            <Pressable
              style={{ marginTop: 8, padding: 10 }}
              onPress={() => navigation.navigate('Menu', { items })}
            >
              <Text style={{ color: "#108700ff", textAlign: "center", fontWeight: "600" }}>
                View Menu (second page)
              </Text>
            </Pressable>

            {validationMsg ? (
              <Text style={{ color: "red", textAlign: "center", marginTop: 8 }}>{validationMsg}</Text>
            ) : null}
          </View>

          <View style={{ alignItems: "center", marginBottom: 8 }}>
            <Text style={{ color: "#000000ff", marginBottom: 4 }}>Total items: {items.length}</Text>
          </View>

          <View style={{ backgroundColor: "rgba(255,255,255,0.9)", padding: 10, borderRadius: 8, minHeight: 40 }}>
            {items.length === 0 ? (
              <Text style={{ color: "#000000ff" }}>All Cuisines will appear here</Text>
            ) : (
              <FlatList
                data={items}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item, index }) => (
                  <View style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold", color: "#108700ff" }}>
                          {item.name} ({item.category})
                        </Text>
                        <Text style={{ color: "#000" }}>{item.description}</Text>
                        <Text style={{ color: "#000" }}>{item.price}</Text>
                      </View>
                      <View style={{ flexDirection: "row", marginLeft: 8 }}>
                        <Pressable onPress={() => handleEdit(index)} style={styles.editButton}>
                          <Text>Edit</Text>
                        </Pressable>
                        <Pressable onPress={() => handleDelete(index)} style={styles.deleteButton}>
                          <Text>Delete</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

function MenuScreen({ route, navigation }: any) {
  const items: MenuItem[] = route.params?.items ?? [];
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Menu (second page)</Text>
      <FlatList
        data={items}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12, padding: 8, backgroundColor: "#fff", borderRadius: 6 }}>
            <Text style={{ fontWeight: "700" }}>{item.name} — {item.price}</Text>
            <Text style={{ color: "#444" }}>{item.category}</Text>
            <Text style={{ color: "#333" }}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No items yet</Text>}
      />
      <Pressable style={{ marginTop: 12 }} onPress={() => navigation.goBack()}>
        <Text style={{ color: "#108700ff" }}>Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default function App() {
  const [route, setRoute] = useState<"Home" | "Menu">("Home");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const fakeNavigation = {
    navigate: (name: string, params?: any) => {
      if (name === "Menu" && params?.items) {
        setMenuItems(params.items);
      }
      setRoute(name === "Menu" ? "Menu" : "Home");
    },
    goBack: () => setRoute("Home"),
  };

  return route === "Home" ? (
    <HomeScreen navigation={fakeNavigation as any} />
  ) : (
    <MenuScreen route={{ params: { items: menuItems } } as any} navigation={fakeNavigation as any} />
  );
}

const styles = StyleSheet.create({
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
});

