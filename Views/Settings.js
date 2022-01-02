import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings(props) {
  const storeData = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem("testKey", value).then(() =>
        props.navigation.goBack()
      );
    } catch (e) {
      // saving error
      console.log("error");
    }
  };
  const [textInputValue, setTextInputValue] = useState();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("testKey");
      if (value !== null) {
        // value previously stored
        setTextInputValue(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>Votre TOKEN API Minestrator : </Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.textInput}
            value={textInputValue}
            onChangeText={setTextInputValue}
          />
        </View>
      </View>
      <View style={styles.containerButton}>
        <ButtonComponent
          text={"Enregistrer le TOKEN"}
          callback={() => storeData(textInputValue)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerInput: {
    width: "80%",
    backgroundColor: "white",
    height: 40,
    borderRadius: 10,
  },
  containerButton: {
    width: "50%",
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    width: "100%",
  },
});

export default Settings;
