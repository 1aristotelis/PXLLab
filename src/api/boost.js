const axios = require("axios");
const boost = require("boostpow-js");

// is also in Auth Component
const imbCli = window.location.href.includes("csb")
  ? "d1782f2caa2a71f85576cc0423818882"
  : "ce4eb6ea41a4f43044dd7e71c08e50b2";

/* var data = {
  name: localStorage.name,
  position: "ZeroSchool Learner"
}; */

export async function getBoosts() {
  let res = await axios.get(
    "https://graph.boostpow.com/api/v1/main/boost/search",
    {
      params: {
        tag: "$zeroschool"
        //unmined: "true"
      }
    }
  );
  let mined = res.data.mined;
  let boosted = [];
  mined.map((obj) => {
    return boosted.push({
      tx: obj.boostData.content,
      diff: obj.boostJob.diff
    });
  });
  return boosted;
  //localStorage.setItem("boosted", boostedTxs);
}

function buildBoost(content, diff, category) {
  var addData = {};
  var tag = "$zeroschool";
  const boostJob = boost.BoostPowJob.fromObject({
    content: Buffer.from(content, "hex"),
    diff: diff, // Minimum '1'. Specifies how much hashrate. 1 = difficulty of Bitcoin Genesis (7 MH/second)
    category: Buffer.from(category, "utf8").toString("hex"),
    additionalData: Buffer.from(addData, "utf8").toString("hex"),
    userNonce: "",
    tag: Buffer.from(tag, "utf8").toString("hex")
  });
  //console.log(boostJob);
  const boostOutputs = [
    {
      script: boostJob.toASM(),
      amount: boostJob.getDiff() * 0.00005, // Charge a fee for the Boost. In future this will be a feeQuote system. Higher payout the more likely a miner will mine the boost relativity to the diff.
      currency: "BSV"
    }
  ];
  //console.log(boostOutputs[0]);
  return boostOutputs;
}

export async function sendBoostTransaction(content, diff, category) {
  console.log(content);
  let boostOutputs = buildBoost(content, diff, category);
  let bsvScript = window.bsv.Script.fromASM(boostOutputs[0].script);
  let output = new window.bsv.Transaction.Output({
    script: bsvScript,
    satoshis: boostOutputs[0].amount * 100000000
  });
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
      output,
      onPayment: async (payment) => {
        console.log("payment completed", payment);
        const boostRequestSubmit = await boost
          .Graph()
          .submitBoostJob(payment.rawtx);
        console.log("boostRequestSubmit", boostRequestSubmit);
      },
      onError: (err) => console.log(err)
    });
  } else if (localStorage.wallet === "relayx") {
    let res = await window.relayone.send({ output });
    if (res.txid) {
      console.log("payment completed", res);
      const boostRequestSubmit = await boost.Graph().submitBoostJob(res.rawtx);
      console.log("boostRequestSubmit", boostRequestSubmit);
    } else {
      alert("Failed to broadcast");
    }
  }
}
//buildTransaction();
async function getStatus(txid) {
  const result = await boost.Graph().getBoostJobStatus(txid);
  console.log(result);
}
//getStatus("2904715608135170ac3aeb0729a78bb9e4828cf37340ac66bf465f4b421ec234");
