import requestAPI from "./requestAPI";
async function serverConsomption(hashsupport) {
  return requestAPI("ressources/" + hashsupport, "GET").then((result) => {
    //DEV PURPOSE
    return result?.data[0];
  });
}

export default serverConsomption;
