import requestAPI from "./requestAPI";
async function serverContent(hashsupport) {
  return requestAPI("content/" + hashsupport, "GET").then((result) => {
    return result?.data[0];
  });
}

export default serverContent;
