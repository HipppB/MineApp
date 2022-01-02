import requestAPI from "./requestAPI";

async function controlRequest(hashsupport, type) {
  //Type can be : start stop restart kill
  return requestAPI("action", "POST", {
    hashsupport: hashsupport,
    action: type,
  }).then((result) => {
    return result?.data;
  });
}

export default controlRequest;
