import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import ButtonComponent from "./ButtonComponent";
function ServerCard(server, callback) {
  let today = new Date();
  let date = new Date(server.tend.replace(" ", "T"));
  var Diff_temps = date.getTime() - today.getTime();
  var Diff_jours = Math.round(Diff_temps / (1000 * 3600 * 24));
  const copyToClipboard = (string) => {
    Clipboard.setString(string);
    Alert.alert(
      "Text copié !",
      "Le text " + string + " à été copié dans ton presse papier !",
      [
        {
          text: "OK",
        },
      ]
    );
  };

  return (
    <View key={server.hashsupport} style={styles.cardContainer}>
      <View style={{ width: "100%" }}>
        <View style={styles.cardLine}>
          <View>
            <Text>{server.name}</Text>
            <TouchableOpacity
              onPress={() => copyToClipboard(server.hashsupport)}
            >
              <Text>
                Code support :{" "}
                <Text style={{ fontWeight: "bold" }}>{server.hashsupport}</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textZone}>
            <Text>{server.offer}</Text>
            <Text>{Diff_jours} jours</Text>
          </View>
        </View>

        <View style={styles.ipText}>
          <TouchableOpacity
            onPress={() => copyToClipboard(server.ip + ":" + server.port)}
          >
            <Text>
              IP du serveur : {server.ip}:{server.port}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ButtonComponent
        text={
          server.offer == "gratuits"
            ? "Impossible de gerer un serveur gratuit ici"
            : "Gérer mon serveur"
        }
        callback={
          server.offer == "gratuits"
            ? () => console.log("Forbiden Action")
            : () => callback()
        }
        additionalStyle={{}}
      />
    </View>
  );
}
export default ServerCard;
const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    height: 200,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  text: {
    marginBottom: 10,
  },
  cardLine: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  textZone: {
    alignItems: "center",
  },
  ipText: {
    alignSelf: "center",
    textAlign: "center",
  },
});
