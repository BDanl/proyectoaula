import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUsersContext } from "../../context/UsersContext";
import { Ionicons } from "@expo/vector-icons";
import AppLogoImage from "../../components/Logo/AppLogoImage";
import AppLogoImage2 from "../../components/Logo/AppLogoImage2";
import Brand from "../../components/Logo/Brand";
import BrandText from "../../components/Logo/BrandText";
import { useRoutinesContext } from "../../context/RoutinesContext";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { CurrentUser, getUser } = useUsersContext();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { loadAllRoutines, routines } = useRoutinesContext();
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await loadAllRoutines();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          if (!currentUser.isAnonymous && currentUser.email) {
            await getUser(currentUser.email);
          }
        } catch (err) {
          console.error("Error getting user:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleSearch = (text) => {
    setInputText(text);
    if (text.length > 0) {
      const filtered = routines.filter((routine) =>
        routine.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const navigateToRoutine = (routineName) => {
    navigation.navigate(routineName);
    setInputText("");
    setSearchResults([]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, paddingTop: "15%" }}>
          {user ? (
            <>
              <View style={styles.cardContainer}>
                <View style={styles.userCard}>
                  {user.isAnonymous ? (
                    <>
                      <View style={styles.profilePlaceholder}>
                        <Ionicons name="person" size={60} color="#fff" />
                      </View>
                      <View style={styles.userInfo}>
                        <Text style={styles.displayName}>Usuario Invitado</Text>
                        <Text style={styles.infoText}>
                          Disfruta de acceso básico a la aplicación
                        </Text>
                        <Text style={styles.infoText}>
                          Regístrate para acceder a todas las funciones
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.imageContainer}>
                        {user.photoURL ? (
                          <Image
                            source={{ uri: user.photoURL }}
                            style={styles.profileImage}
                            resizeMode="cover"
                          />
                        ) : (
                          <View style={styles.profilePlaceholder}>
                            <Text style={styles.placeholderText}>
                              {user.displayName?.charAt(0) ||
                                user.email?.charAt(0)}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.userInfo}>
                        <Text style={styles.displayName}>
                          {user.displayName || "Usuario no identificado"}
                        </Text>
                        {CurrentUser && (
                          <Text style={styles.fullName}>
                            {CurrentUser.name} {CurrentUser.lastname}
                          </Text>
                        )}
                        <Text style={styles.infoText}>
                          Tiempo como miembro:{" "}
                          {Math.floor(
                            (new Date() -
                              new Date(CurrentUser?.createdAt || new Date())) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          días
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>

              <View style={{ flex: 1, bottom: "10%" }}>
                <View style={styles.logoContainer}>
                  <AppLogoImage />
                  <Brand />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Buscar rutinas..."
                    placeholderTextColor="#999"
                    value={inputText}
                    onChangeText={handleSearch}
                  />
                </View>

                {searchResults.length > 0 && (
                  <View style={styles.searchResultsContainer}>
                    {searchResults.map((item, index) => (
                      <TouchableOpacity
                        key={index} 
                        style={styles.resultItem}
                        onPress={() => navigateToRoutine(item.name)}
                      >
                        <Text style={styles.resultText}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {!isKeyboardVisible && (
                <View style={styles.fixedFooter}>
                  <AppLogoImage2 />
                  <BrandText />
                </View>
              )}
            </>
          ) : (
            <Text style={styles.infoText}>No hay usuario autenticado</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  cardContainer: {
    alignItems: "center",
    marginTop: 35,
  },
  userCard: {
    width: "90%",
    maxWidth: 300,
    backgroundColor: "black",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#3498db",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#3498db",
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#3498db",
  },
  placeholderText: {
    fontSize: 60,
    color: "#fff",
    fontWeight: "bold",
  },
  userInfo: {
    alignItems: "center",
    width: "100%",
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  fullName: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 15,
    textAlign: "center",
  },
  logoContainer: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  inputContainer: {
    width: "90%",
    paddingHorizontal: 20,
    marginBottom: 30,
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3498db",
    fontSize: 16,
  },
  fixedFooter: {
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "10%",
  },
  searchResultsContainer: {
  width: "90%",
  maxHeight: 200, 
  backgroundColor: "#1a1a1a",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#3498db",
  alignSelf: "center",
  marginTop: -20,
  overflow: 'hidden', 
},
searchResultsScroll: {
  flexGrow: 1, 
},
resultItem: {
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: "#333",
},
resultText: {
  color: "#fff",
  fontSize: 16,
},
});

export default HomeScreen;
