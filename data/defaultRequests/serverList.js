import requestAPI from "./requestAPI";
async function serverList() {
  return requestAPI("list", "GET").then((result) => {
    return result?.data;
  });
}

export default serverList;
