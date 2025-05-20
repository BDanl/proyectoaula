import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useUsersContext } from "../../context/UsersContext";
import SettingsButton from "../../components/Profile/Settings/SettingsButton";
import { Ionicons } from "@expo/vector-icons";
import Brand from "../../components/Logo/Brand";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const {
    users,
    CurrentUser,
    loading,
    error,
    getUser,
    loadAllUsers,
    updateUser,
  } = useUsersContext();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user?.email) {
      loadAllUsers();
      handleSearch();
    }
  }, [user]);

  const handleSearch = async () => {
    try {
      await getUser(user.email);
    } catch (err) {
      console.error("Error in handleSearch:", err);
    }
  };

  const handleCombinedUpdate = async () => {
    if (!user) return;

    const nameChanged = newName.trim() && newName !== user.displayName;
    const photoChanged = photoURL.trim() && photoURL !== user.photoURL;

    if (!nameChanged && !photoChanged) return;

    // Alerta de confirmación
    Alert.alert(
      "Confirmar cambios",
      "¿Estás seguro de que deseas guardar los cambios?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            setUploading(true);
            try {
              const updates = {};

              if (nameChanged) updates.displayName = newName;

              if (nameChanged) {
                await updateProfile(user, { displayName: newName });
              }

              if (photoChanged) {
                const firestoreUpdates = {
                  photoURL: photoURL,
                };

                const success = await updateUser(user.email, firestoreUpdates);
                if (!success)
                  throw new Error("No se pudo actualizar en Firestore");
              }
              await getUser(user.email);

              Alert.alert(
                "Perfil actualizado",
                "Los cambios se guardaron correctamente"
              );
              setEditModalVisible(false);
              setNewName("");
              setPhotoURL("");
            } catch (error) {
              console.error("Error actualizando perfil:", error);
              Alert.alert("Error", "No se pudo actualizar el perfil");
            } finally {
              setUploading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {(loading || uploading) && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}

        {user && (
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              {user.photoURL ? (
                <Image
                  source={{ uri: user.photoURL }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <Text style={styles.placeholderText}>
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditModalVisible(true)}
              >
                <Ionicons name="create-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.displayName}>
                {user.displayName || "Usuario no identificado"}
              </Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Editar perfil</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Nuevo nombre"
                placeholderTextColor="#999"
                value={newName}
                onChangeText={setNewName}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="URL de nueva foto"
                placeholderTextColor="#999"
                value={photoURL}
                onChangeText={setPhotoURL}
                autoCapitalize="none"
              />

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonSave]}
                  onPress={handleCombinedUpdate}
                  disabled={uploading || (!newName.trim() && !photoURL.trim())}
                >
                  {uploading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Guardar</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {CurrentUser && (
          <View style={styles.additionalInfo}>
            <Text style={styles.infoText}>
              Nombre: {CurrentUser.name} {CurrentUser.lastname}
            </Text>
            <Text style={styles.infoText}>
              Miembro desde:{" "}
              {new Date(CurrentUser.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.infoText}>
              Bio: {CurrentUser.bio || "No disponible"}
            </Text>
            <Text style={[styles.infoText, { flexWrap: "wrap" }]}>
              Social:{" "}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(CurrentUser.link).catch((err) =>
                    console.error("Error opening link: ", err)
                  )
                }
              >
                <Text style={{ color: "blue" }}>
                  {CurrentUser.link || "No disponible"}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        )}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.exercisesButton]}
            onPress={() => navigation.navigate("ExercisesList")}
          >
            <Text style={styles.buttonText}>Ejercicios</Text>
            <Ionicons
              name="barbell-outline"
              size={20}
              color="#e6e6e6"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.statsButton]}
            onPress={() => navigation.navigate("Stats")}
          >
            <Text style={styles.buttonText}>Estadísticas</Text>
            <Ionicons
              name="stats-chart-outline"
              size={20}
              color="#e6e6e6"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Brand />
        </View>

        <View style={styles.iconContainer}>
          <SettingsButton />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    paddingTop: "20%",
    paddingBottom: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#3498db",
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3498db",
  },
  placeholderText: {
    fontSize: 48,
    color: "#000",
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    borderColor: "#3498db",
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    alignItems: "center",
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#ccc",
  },
  additionalInfo: {
    backgroundColor: "#000",
    borderColor: "#3498db",
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  iconContainer: {
    position: "absolute",
    top: 100,
    right: 20,
    zIndex: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#000",
    borderColor: "#3498db",
    borderWidth: 2,
    borderRadius: 10,
    padding: 25,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  modalInput: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: "#3498db",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 8,
    padding: 12,
    width: "48%",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#3498db",
  },
  buttonCancel: {
    backgroundColor: "#000",
  },
  buttonSave: {
    backgroundColor: "#000",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginVertical: 40,
    marginBottom: 50,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "45%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 0,
  },
  exercisesButton: {
    backgroundColor: "#004d99",
  },
  statsButton: {
    backgroundColor: "#004d99",
  },
  buttonIcon: {
    marginLeft: 8,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default ProfileScreen;
