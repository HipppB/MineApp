import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import ServerCard from "../components/ServerCard";
import serverList from "../data/defaultRequests/serverList";

function ServerList(props) {
  const [servers, setServers] = useState();
  useEffect(() => {
    actualiseList();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  function actualiseList() {
    setRefreshing(true);
    serverList().then((result) => {
      setRefreshing(false);
      console.log("list was refresh");
      setServers(result);
    });
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={{
          width: 25,
          height: 25,
          alignSelf: "flex-end",
          marginRight: 25,
        }}
        onPress={() => props.navigation.push("Settings")}
      >
        <Image
          source={require("../assets/engrenages.png")}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={actualiseList} />
        }
      >
        {servers?.map((server) =>
          ServerCard(server, () => {
            props.navigation.push("Server", { server: server });
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ServerList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    height: "100%",
    width: "100%",
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
