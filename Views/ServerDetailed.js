import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import serverContent from "../data/defaultRequests/serverContent";
import serverConsomption from "../data/defaultRequests/serverConsomption";
import { SafeAreaView } from "react-native-safe-area-context";
import controlRequest from "../data/defaultRequests/controlRequest";
const { width, height } = Dimensions.get("window");
import { useIsFocused } from "@react-navigation/native";

function ServerDetailed(props) {
  const server = props.route.params.server;

  const [serverRessources, setServerRessources] = useState();
  const [serverContentData, setServerContent] = useState();
  const [statusColor, setStatusColor] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    actualiseRessources();
    actualiseContent();

    const interval = setInterval(() => {
      actualiseRessources();
      actualiseContent();
      console.log("data was actualised");
    }, 5000);
    return () => {
      console.log("SCREEN WAS UNFOCUSED");
      clearInterval(interval);
    };
  }, []);

  function toggleOnOff() {
    if (serverRessources?.status == "on") {
      controlRequest(server.hashsupport, "stop");
    } else {
      controlRequest(server.hashsupport, "start");
    }
    actualiseRessources();
  }
  async function restartServer() {
    controlRequest(server.hashsupport, "restart");
    actualiseRessources();
  }
  async function killServer() {
    controlRequest(server.hashsupport, "kill");
    actualiseRessources();
  }
  async function actualiseRessources() {
    serverConsomption(server.hashsupport).then((result) => {
      setServerRessources(result);
      if (result?.status == "starting" || result?.status == "stopping") {
        setStatusColor("orange");
      } else if (result?.status == "off") {
        setStatusColor("#FF7F7F");
      } else {
        setStatusColor("lightgreen");
      }
    });
  }
  async function actualiseContent() {
    serverContent(server.hashsupport).then((result) => {
      setServerContent(result);
    });
  }

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          style={{ marginLeft: 15 }}
          source={require("../assets/chevron-left.png")}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{server?.name}</Text>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitleText}>{server?.offer}</Text>
          </View>
        </View>
        <View style={styles.contentLine}>
          <Text style={styles.subTitleText}>Statut du serveur : </Text>
          <View
            style={[
              styles.contentStatus,
              {
                backgroundColor: statusColor,
              },
            ]}
          >
            <Text style={styles.subTitleText}>{serverRessources?.status}</Text>
          </View>
        </View>
        {serverRessources?.status == "on" ? (
          <View style={styles.contentLine}>
            <Text style={styles.subTitleText}>Nombre de joueur : </Text>
            <View>
              <Text style={styles.subTitleText}>
                {serverContentData?.players?.online} /{" "}
                {serverContentData?.players?.max}
              </Text>
            </View>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.contentLine}>
          <Text style={styles.subTitleText}>Ip du serveur : </Text>
          <View>
            <Text style={styles.subTitleText}>
              {server?.ip}:{server?.port}
            </Text>
          </View>
        </View>
        <View style={styles.containerFooter}>
          <TouchableOpacity style={styles.button} onPress={() => killServer()}>
            <Text style={styles.buttonText}>Kill</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => restartServer()}
          >
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => toggleOnOff()}>
            <Text style={styles.buttonText}>
              {serverRessources?.status == "on" ? "Stop" : "Start"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignContent: "center",
    display: "flex",
    alignItems: "center",
    fontSize: 30,
    marginBottom: 40,
  },
  titleText: {
    alignContent: "center",
    display: "flex",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitleContainer: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  subTitleText: {
    alignContent: "center",
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#fff",
    alignSelf: "center",
    position: "absolute",
    bottom: 25,
    top: 75,
    width: "90%",
    display: "flex",
    alignItems: "center",
    borderRadius: 20,
    padding: 15,
  },
  contentLine: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "baseline",
    alignItems: "center",
    marginBottom: 15,
  },
  indicator: {
    backgroundColor: "green",
  },
  contentStatus: {
    backgroundColor: "lightgreen",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  containerFooter: {
    height: 30,
    width: "100%",
    marginBottom: 30,
    display: "flex",
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    justifyContent: "space-evenly",
  },

  button: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "25%",
  },
  buttonText: {
    textAlignVertical: "center",
    lineHeight: 30,
  },
});

export default ServerDetailed;
