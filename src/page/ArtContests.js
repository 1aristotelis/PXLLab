import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  Hidden,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { use100vh } from "react-div-100vh";
import InfiniteScroll from "react-infinite-scroll-component";

import { FetchPostDetail } from "../api/TwetchGraph";
import StickyButton from "../components/StickyButton";
import Composer from "../components/Composer";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Post from "../components/Post";

const indexToOrder = {
  0: "CREATED_AT_DESC",
  10: "CREATED_AT_ASC",
  20: "RANKING_DESC"
};

const OrderToIndex = {
  CREATED_AT_DESC: 0,
  CREATED_AT_ASC: 10,
  RANKING_DESC: 20
};

export default function ArtContest(props) {
  const filter = "#PXLArtContest";
  //console.log(filter);
  //const [filter, setFilter] = useState(props.filter);
  const [activeContest, setActiveContest] = useState({});
  const [completeContest0, setCompleteContest0] = useState({});
  const [offset, setOffset] = useState(0);
  const [boosts, setBoosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";

  //Soon
  const txActive = "";

  const txComplete0 =
    "5c695b5b987f0732bea38bf9b09bd2f6d841e565f84ec87b188cd2b46776ead5";
  useEffect(() => {
    setLoading(true);
    /* FetchPostDetail(txActive).then((data) => {
      setActiveContest(data.allPosts.edges);
    }); */
    FetchPostDetail(txComplete0).then((data) => {
      //console.log(data);
      setCompleteContest0(data.allPosts.edges[0]);
    });
    setLoading(false);
    //getBoosts().then((res) => setBoosts(res));
  }, [txActive, txComplete0]);

  const scrollTop = (e) => {
    document.getElementById("scrollable").scrollTo(0, 0);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Hidden smDown>
        <LeftPane currentTab="ArtContests" />
      </Hidden>
      <div
        style={{
          flex: 2,
          width: "100%",
          maxWidth: "600px"
        }}
      >
        <div></div>
        <div
          className="borders"
          style={{
            flex: 2,
            width: "100%",
            maxWidth: "600px"
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={scrollTop}>
            <Hidden smUp>
              <AppBar currentTab="ArtContests" />
            </Hidden>
            <Hidden xsDown>
              <div
                style={{
                  height: "81px",
                  position: "sticky",
                  display: "flex",
                  justifyContent: "center",
                  padding: "16px",
                  borderBottom: "1px solid #F2F2F2"
                }}
              >
                <Button
                  style={{
                    color: "#2F2F2F",
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    textTransform: "none"
                  }}
                  onClick={() => history.push("/challenges")}
                >
                  PXL Art Contest
                </Button>
              </div>
            </Hidden>
          </div>
          {loading ? (
            <div
              style={{
                display: "flex",
                marginTop: "16px",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <div
              id="scrollable"
              style={{
                position: "relative",
                height: `calc(${containerHeight}px - 114px)`,
                overflowY: "auto"
              }}
            >
              <Typography
                variant="body1"
                style={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: "36px",
                  borderBottom: "1px solid #000000",
                  marginBottom: "12px"
                }}
              >
                Active(s)
              </Typography>
              {/* <Post {...activeContest} tx={txActive} /> */}
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Soon™
              </Typography>
              <Typography
                variant="body1"
                style={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: "36px",
                  borderBottom: "1px solid #000000",
                  marginBottom: "12px"
                }}
              >
                Completed
              </Typography>

              {completeContest0.node && (
                <div style={{ opacity: 0.69 }}>
                  <Post
                    {...completeContest0}
                    tx={completeContest0.node.transaction}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Hidden mdDown>
        <RightPane />
      </Hidden>
    </div>
  );
}
