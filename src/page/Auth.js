import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Backdrop,
  Button,
  InputAdornment,
  OutlinedInput,
  Typography
} from "@material-ui/core";

import MBLogo from "../resources/moneybutton.png";
import RelayLogo from "../resources/relay.png";
import HandCashLogo from "../resources/handcash.png";

import { twquery } from "../api/TwetchGraph";

const Twetch = require("@twetch/sdk");

const { HandCashConnect } = require("@handcash/handcash-connect");
export const handCashConnect = new HandCashConnect("60d35d1304898f0b46b7da39");
// Use this field to redirect the user to the HandCash authorization screen.
const redirectionLoginUrl = handCashConnect.getRedirectionUrl();

const clientID = "10d3b9a3-3733-4769-9f97-d255ee37113b";

const inviteLink = "https://twet.ch/inv/zeroschool";

export const imbCli = window.location.href.includes("csb")
  ? "d1782f2caa2a71f85576cc0423818882"
  : "ce4eb6ea41a4f43044dd7e71c08e50b2";

export default function Auth(props) {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const TwetchLogin = (e) => {
    // config
    const host = window.location.host;
    let redirectUrl = `https://${host}/auth/callback/twetch`;
    let appName = "ZeroSchool";
    e.preventDefault();
    window.location.href = `https://twetch.app/auth/authorize?appName=${appName}&redirectUrl=${redirectUrl}`;
  };

  const HandCashLogin = (e) => {
    window.alert("Soon");
    return;
    e.preventDefault();
    window.location.href = redirectionLoginUrl;
  };

  const MBLogin = async () => {
    let getPermissionForCurrentUser = () => {
      return localStorage.token;
    };
    const imb = new window.moneyButton.IMB({
      clientIdentifier: imbCli,
      permission: getPermissionForCurrentUser(),
      onNewPermissionGranted: (token) => localStorage.setItem("token", token)
    });
    if (!localStorage.getItem("tokenTwetchAuth")) {
      fetch("https://auth.twetch.app/api/v1/challenge")
        .then(function (res) {
          return res.json();
        })
        .then(async (resp) => {
          var cryptoOperations = [
            {
              name: "mySignature",
              method: "sign",
              data: resp.message,
              dataEncoding: "utf8",
              key: "identity",
              algorithm: "bitcoin-signed-message"
            },
            { name: "myPublicKey", method: "public-key", key: "identity" },
            { name: "myAddress", method: "address", key: "identity" }
          ];
          imb.swipe({
            cryptoOperations: cryptoOperations,
            onCryptoOperations: async (ops) => {
              saveWallet(ops[1].paymail, "moneybutton");
              if (localStorage.getItem("paymail")) {
                twLogin(ops[2].value, resp.message, ops[0].value, () => {
                  history.push("/");
                });
              }
            }
          });
        });
    } else {
      history.push("/");
    }
  };
  const RelayXLogin = async () => {
    window.alert("Soon");
    return;
    let token = await window.relayone.authBeta({ withGrant: true }),
      res;
    localStorage.setItem("token", token);
    let [payload, signature] = token.split(".");
    //console.log(signature);
    const data = JSON.parse(atob(payload));

    fetch("https://auth.twetch.app/api/v1/challenge", { method: "get" })
      .then((res) => {
        return res.json();
      })
      .then(async (resp) => {
        try {
          res = await window.relayone.sign(resp.message);
          const publicKey = window.bsv.PublicKey.fromHex(data.pubkey);
          const signAddr = window.bsv.Address.fromPublicKey(
            publicKey
          ).toString();
          if (res) {
            saveWallet(data.paymail, "relayx");
            if (localStorage.getItem("paymail")) {
              twLogin(signAddr, resp.message, res.value, () => {
                history.push("/");
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  const handleDrawerToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const selectWallet = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        maxHeight: "100vh",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          userSelect: "none"
        }}
      ></div>
      <div
        style={{
          transform: "none",
          transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          maxHeight: "50vh",
          flexSirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px",
            background: "#F6F5FB",
            borderRadius: "12px 12px 0 0"
          }}
        >
          <Typography
            variant="body1"
            style={{
              color: "#010101",
              fontSize: "18px",
              fontWeight: "bold",
              lineHeight: "24px"
            }}
          >
            Select Wallet
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Typography
            variant="body1"
            style={{
              color: "#838388",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Cancel
          </Typography>
        </div>
        <div
          style={{
            flexGrow: 1,
            background: "#FFFFFF",
            overflowY: "auto"
          }}
        >
          {/* <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={RelayXLogin}
          >
            <img
              src={RelayLogo}
              alt="RelayX"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              RelayX
            </Typography>
          </div> */}
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={MBLogin}
          >
            <img
              src={MBLogo}
              alt="MoneyButton"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              MoneyButton
            </Typography>
          </div>
          {/* <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={HandCashLogin}
          >
            <img
              src={HandCashLogo}
              alt="HandCash"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              HandCash
            </Typography>
          </div> */}
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        left: 0,
        width: "100vw",
        bottom: 0,
        height: "100%",
        display: "flex",
        position: "fixed",
        background: "#FFFFFF",
        maxHeight: "100%",
        overflowY: "auto",
        flexDirection: "column"
      }}
    >
      <div style={{ flexGrow: 1 }}></div>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}></div>
        <div
          style={{
            width: "600px",
            padding: "36px 44px",
            maxWidth: "100%",
            background: "white",
            boxShadow: "0px 0px 60px rgb(0 0 0 / 10%)",
            borderRadius: "6px"
          }}
        >
          <div
            style={{
              margin: "0 auto",
              maxWidth: "100%"
            }}
          >
            <div
              style={{
                position: "relative",
                marginBottom: "36px"
              }}
            >
              <h1
                style={{
                  height: "24px",
                  margin: "0 auto",
                  display: "block",
                  textAlign: "center"
                }}
              >
                ZeroSchool
              </h1>
            </div>
            <Typography
              variant="body1"
              style={{
                color: "#0A0A0B",
                fontSize: "29px",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "24px"
              }}
            >
              Sign In
            </Typography>
            <Typography
              style={{
                color: "#58585A",
                fontSize: "16px",
                lineHeight: "24px",
                marginTop: "16px",
                textAlign: "center",
                fontWeight: 500
              }}
              variant="body1"
            >
              Don't have an account?{" "}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                marginTop: "4px",
                textAlign: "center",
                fontWeight: 500
              }}
            >
              <a
                style={{
                  color: "#085AF6",
                  cursor: "pointer",
                  textDecoration: "none"
                }}
                href={inviteLink}
                target="_blank"
                rel="noreferrer"
              >
                Sign Up Now!
              </a>
            </Typography>

            <div
              style={{
                margin: "0 auto 44px auto",
                display: "flex",
                maxWidth: "300px"
              }}
            ></div>
            <div
              style={{
                margin: "0 auto",
                maxWidth: "300px"
              }}
            >
              <Button
                color="primary"
                variant="contained"
                fullWidth
                disabled={false}
                onClick={TwetchLogin}
                style={{
                  width: "100%",
                  border: "1px solid #085AF6",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  marginBottom: "10px",
                  textTransform: "none"
                }}
              >
                Sign in witch Twetch
              </Button>
            </div>
            <div
              style={{
                margin: "0 auto",
                maxWidth: "300px"
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                disabled={false}
                onClick={() => setOpen(true)}
                style={{
                  color: "#085AF6",
                  width: "100%",
                  border: "1px solid #085AF6",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  marginBottom: "10px",
                  textTransform: "none"
                }}
              >
                Sign In With Wallet Provider
              </Button>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <Backdrop
        style={{
          opacity: 1,
          transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          width: "100%",
          height: "100%",
          zIndex: 1400,
          position: "absolute",
          background: "rgba(26, 26, 28, .5)",
          userSelect: "none"
        }}
        open={open}
        onClick={() => setOpen(false)}
      >
        {selectWallet}
      </Backdrop>
    </div>
  );
}

export const saveWallet = (paymail, wallet) => {
  localStorage.setItem("paymail", paymail);
  localStorage.setItem("wallet", wallet);
};

export const twLogin = (address, message, signature, callback) => {
  let obj = { address, message, signature };
  fetch("https://auth.twetch.app/api/v1/authenticate", {
    method: "post",
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" }
  })
    .then((res) => {
      return res.json();
    })
    .then(async (resp) => {
      //console.log(resp);
      localStorage.setItem("tokenTwetchAuth", resp.token);
      let { me } = await twquery(`{ me { id icon name } }`);
      //console.log({ me });
      localStorage.setItem("id", me.id);
      localStorage.setItem("icon", me.icon);
      localStorage.setItem("name", me.name);
      callback();
    });
};
