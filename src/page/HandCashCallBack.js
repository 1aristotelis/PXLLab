import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { handCashConnect, saveWallet, twLogin } from "./Auth";

export default function HandCashCallBack() {
  const history = useHistory();
  let params = new URLSearchParams(document.location.search.substring(1));
  let token = params.get("authToken");
  localStorage.setItem("token", token);

  const account = handCashConnect.getAccountFromAuthToken(token);
  account.profile
    .getCurrentProfile()
    .then((res) => saveWallet(res.publicProfile.paymail, "handcash"));

  fetch("https://auth.twetch.app/api/v1/challenge", { method: "get" })
    .then((res) => {
      return res.json();
    })
    .then(async (resp) => {
      try {
        account.profile
          .signData({
            value: resp.message,
            format: "utf-8"
          })
          .then((res) => {
            let address = window.bsv.PublicKey.fromHex(res.publicKey)
              .toAddress()
              .toString();
            let signature = res.signature;
            twLogin(address, resp.message, signature, () => history.push("/"));
          });
      } catch (e) {
        console.log(e);
      }
    });

  return (
    <div
      style={{
        display: "flex",
        marginTop: "16px",
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </div>
  );
}
