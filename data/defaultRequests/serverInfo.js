import requestAPI from "./requestAPI";
async function serverInfo(hashsupport) {
  return requestAPI("data/" + hashsupport, "GET").then((result) => {
    return result?.data[0];
  });
}

export default serverInfo;
