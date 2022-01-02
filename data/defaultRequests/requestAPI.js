import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function requestAPI(uri, method, data) {
  const TOKEN = await AsyncStorage.getItem("testKey");
  if (TOKEN !== null) {
    // value previously stored
  } else {
    return 400;
  }

  let APIURL = "https://rest.minestrator.com/api/v1/server/";

  var myHeaders = new Headers();
  myHeaders.append("Authorization", TOKEN);

  var requestOptions = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
  };
  if (method == "POST") {
    var formdata = new FormData();
    formdata.append("action", data.action);
    formdata.append("hashsupport", data.hashsupport);
    requestOptions["body"] = formdata;
  }
  return fetch(APIURL + uri, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => {
      console.log("error", error);
      return 404;
    });
}
