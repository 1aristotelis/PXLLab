import { BSVABI } from "../utils/BSVABI";

export const getABI = async () => {
  let res = await fetch("https://api.twetch.app/v1/abi");
  let jres = await res.json();
  return jres;
};

// is also in Auth Component
const imbCli = window.location.href.includes("csb")
  ? "d1782f2caa2a71f85576cc0423818882"
  : "ce4eb6ea41a4f43044dd7e71c08e50b2";

let outputs, cryptoOperations;

export const build = async (content, action, replyTx) => {
  let obj, twOutput;
  if (action === "twetch/post@0.0.1") {
    obj = {
      bContent: content,
      mapReply: replyTx
    };
  } else {
    obj = { postTransaction: content };
  }
  const abi = new BSVABI(JSON.parse(localStorage.getItem("abi")), { action });
  abi.fromObject(obj);
  let payees = await getPayees({ args: abi.toArray(), action });
  await abi.replace({ "#{invoice}": () => payees.invoice });
  let arg = abi.action.args.find((e) => e.type === "Signature");
  const ab = abi
    .toArray()
    .slice(arg.messageStartIndex || 0, arg.messageEndIndex + 1);
  //bContent = ab[1];
  const contentHash = await digestMessage(ab);
  let outputScript = window.bsv.Script.buildSafeDataOut(abi.toArray()).toASM();
  if (localStorage.wallet === "moneybutton") {
    twOutput = { currency: "BSV", amount: 0, script: outputScript };
  } else if (localStorage.wallet === "relayx") {
    twOutput = {
      currency: "BSV",
      amount: 0,
      signatures: ["TWETCH-AIP"],
      script: arrToScript(abi.args.slice(0, abi.args.length - 5))
    };
  }
  outputs = [twOutput].concat(payees.payees);
  if (action === "twetch/like@0.0.1") {
    const penny = await getPenny();
    const liked = outputs.find(
      (o) => JSON.stringify(o).includes("like") && o.user_id !== "0"
    );
    if (liked) {
      outputs.push({ to: liked.to, amount: penny * 4, currency: "BSV" });
      outputs.push({
        to: "1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE",
        amount: penny,
        currency: "BSV"
      });
    }
  }
  console.log({ outputs });
  cryptoOperations = [
    { name: "myAddress", method: "address", key: "identity" },
    {
      name: "mySignature",
      method: "sign",
      data: contentHash,
      dataEncoding: "utf8",
      key: "identity",
      algorithm: "bitcoin-signed-message"
    }
  ];
};

export const send = async (action, likeTx, replyTx, count, boost) => {
  if (localStorage.wallet === "moneybutton") {
    let getPermissionForCurrentUser = () => {
      return localStorage.token;
    };
    const imb = new window.moneyButton.IMB({
      clientIdentifier: imbCli,
      permission: getPermissionForCurrentUser(),
      onNewPermissionGranted: (token) => localStorage.setItem("token", token)
    });
    imb.swipe({
      outputs,
      cryptoOperations,
      onPayment: async (payment) => {
        await finish(replyTx, action, likeTx, payment.rawtx, count);
      },
      onError: (err) => console.log(err)
    });
  } else if (localStorage.wallet === "relayx") {
    let res = await RelayOne.send({ outputs });
    if (res.txid) {
      await finish(replyTx, action, likeTx, res.rawTx, count);
    } else {
      alert("Failed to broadcast");
    }
  }
};

const finish = async (
  replyTx,
  action,
  likeTx,
  rawtx,
  count,
  broadcast = false
) => {
  /* if (tipped === true) {
    coinSound.play();
    loadingText = "Loading";
  } */
  let r = await publishRequest({ signed_raw_tx: rawtx, action, broadcast });
  /* if (r) {
    window.location.reload();
  } */
  return r;
};

export const publishRequest = async (payload) => {
  let res = await fetch("https://api.twetch.app/v1/publish", {
    method: "post",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  let jres = await res.json();
  console.log(jres, jres?.errors);
  return jres;
};

export const getPayees = async (payload) => {
  let res = await fetch("https://api.twetch.app/v1/payees", {
    method: "post",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      ...payload,
      client_identifier: "9d27a879-ee0c-4653-8839-a4b2f6fa8023"
    })
  });
  let jres = await res.json();
  return jres;
};

export const digestMessage = async (message) => {
  const msgUint8 = new TextEncoder().encode(message);
  let decoded = new TextDecoder().decode(msgUint8);
  let value = decoded.replaceAll(",", "");
  const msgToHash = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgToHash);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export const arrToScript = (arr) => {
  let script = "0 OP_RETURN";
  for (let i = 0; i < arr.length; i++) {
    script += " " + ascii_to_hexa(arr[i]);
  }
  return script;
};

const ascii_to_hexa = (str) => {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
};

export const getPenny = async () => {
  let price = await bsvPrice();
  let penny = parseFloat((Math.ceil(1000000 / price) / 100000000).toFixed(8));
  return penny;
};

const bsvPrice = async () => {
  let res = await fetch("https://cloud-functions.twetch.app/api/exchange-rate");
  let jres = await res.json();
  return jres.price;
};
