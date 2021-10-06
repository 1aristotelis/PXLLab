import { SvgIcon, IconButton, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useState } from "react";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#21e800"
    }
  }
});

export default function HashIcon(props) {
  const txId = props.tx;
  const [target, setTarget] = useState("");
  const handleClick = (e) => {
    e.stopPropagation();
    setTarget("21e8");
    magic(txId, "21e8");
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton onClick={handleClick} color="primary">
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              stroke="#696969"
              color="#696969"
              strokeWidth="0"
              strokeMiterlimit="10"
              d="M 20.460938 3.9804688 A 1.50015 1.50015 0 0 0 19.025391 5.2207031 L 16.986328 16 L 7.5 16 A 1.50015 1.50015 0 1 0 7.5 19 L 16.417969 19 L 14.527344 29 L 5.5 29 A 1.50015 1.50015 0 1 0 5.5 32 L 13.958984 32 L 12.025391 42.220703 A 1.5008259 1.5008259 0 1 0 14.974609 42.779297 L 17.013672 32 L 27.958984 32 L 26.025391 42.220703 A 1.5008259 1.5008259 0 0 0 28.974609 42.779297 L 31.013672 32 L 40.5 32 A 1.50015 1.50015 0 1 0 40.5 29 L 31.582031 29 L 33.472656 19 L 42.5 19 A 1.50015 1.50015 0 1 0 42.5 16 L 34.041016 16 L 35.974609 5.7792969 A 1.5008259 1.5008259 0 0 0 33.025391 5.2207031 L 30.986328 16 L 20.041016 16 L 21.974609 5.7792969 A 1.50015 1.50015 0 0 0 20.460938 3.9804688 z M 19.472656 19 L 30.417969 19 L 28.527344 29 L 17.582031 29 L 19.472656 19 z"
            ></path>
          </SvgIcon>
        </IconButton>
        <Typography className="hoverRed" component="span" variant="body1">
          {target}
        </Typography>
      </div>
    </ThemeProvider>
  );
}

async function magic(txid, target) {
  const magicNumScript = `${txid} ${target} OP_SIZE 4 OP_PICK OP_SHA256 OP_SWAP OP_SPLIT OP_DROP OP_EQUALVERIFY OP_DROP OP_CHECKSIG`;
  var outputs = [
    {
      to: "1C2meU6ukY9S4tY6DdbhNqc8PuDhif5vPE",
      amount: 0.00001,
      currency: "BSV"
    }
  ];
  outputs.push({
    amount: 0.00002,
    currency: "BSV",
    script: magicNumScript
  });
  window.twetchPay
    .pay({
      //wallets: ["moneybutton", "relayx"],
      outputs: outputs,
      label: "21e8",
      moneybuttonProps: {},
      relayxProps: {},
      onPayment: (payment) => {
        console.log({ payment });
        let paymail, pubkey;
        if (payment.walletResponse.senderPaymail) {
          paymail = payment.walletResponse.senderPaymail;
          pubkey = payment.walletResponse.signaturePubkey;
        } else {
          paymail = payment.walletResponse.paymail;
          pubkey = payment.walletResponse.identity;
        }
        console.log("Paymail: ", paymail);
        console.log("Public (Identity) key: ", pubkey);
        console.log("txid: ", payment.txid);
        console.log("rawTx: ", payment.rawtx);
      }
    })
    .then((res) => {
      console.log(res);
    });

  //await build(txid, "twetch/like@0.0.1", false);
  //await send("twetch/like@0.0.1", txid, false);
}
