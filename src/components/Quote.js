import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Avatar, Grid, IconButton, Typography } from "@material-ui/core";
import LikeIcon from "../resources/LikeIcon";
import ReplyIcon from "../resources/ReplyIcon";
import BoostIcon from "../resources/BoostIcon";
import CopyIcon from "../resources/CopyIcon";
import TwetchLogo from "../resources/TwetchLogo";
import Timestamp from "../utils/Timestamp";
import defaultAvatar from "../resources/squareApu.png";
import BranchIcon from "../resources/BranchIcon";
import MediaGrid from "./MediaGrid";

export default function Quote(props) {
  const postTx = props.tx;
  const branchedById = props.branchedById;
  const branchedByName = props.branchedByName;
  const postData = props.node;
  const diff = props.boostDiff;
  const history = useHistory();
  const timestamp = new Timestamp(postData.createdAt);

  const getDetail = (e) => {
    e.stopPropagation();
    history.push(`/t/${postTx}`);
  };
  if (postData.userByUserId) {
    return (
      <div
        style={{
          marginTop: "8px",
          border: "1px solid #F2F2F2",
          cursor: "pointer",
          position: "relative",
          background: "#FFFFFF",
          borderRadius: "6px"
        }}
        onClick={getDetail}
      >
        <div
          style={{
            display: "flex",
            padding: "8px",
            background: "#F2F2F2",
            borderRadius: "4px 4px 0 0"
          }}
        >
          <Link to={postData.userId} onClick={(e) => e.stopPropagation()}>
            <Avatar
              src={postData.userByUserId.icon}
              style={{
                width: "24px",
                height: "24px",
                marginRight: "8px"
              }}
            />
          </Link>
          <div style={{ flexGrow: 1, width: "100%", display: "inline-block" }}>
            <Link
              to={`/u/${postData.userId}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                lineHeight: "24px",
                color: "#000000",
                cursor: "pointer",
                display: "inline-block",
                overflow: "hidden",
                fontSize: "16px",
                maxWidth: "calc(100% - 64px)",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                verticalAlign: "top",
                textDecoration: "none"
              }}
            >
              {postData.userByUserId.name}
            </Link>
            <Typography
              variant="body1"
              style={{
                color: "#828282",
                display: "inline-block",
                fontSize: "16px",
                fontWeight: "normal",
                lineHeight: "24px",
                marginLeft: "6px",
                verticalAlign: "top"
              }}
            >
              @{postData.userId}
            </Typography>
          </div>
          <div
            style={{
              color: "#696969",
              float: "right",
              cursor: "pointer",
              fontSize: "12px",
              lineHeight: "16px",
              verticalAlign: "top"
            }}
          >
            {timestamp.getPostTimestamp(new Date())}
          </div>
        </div>
        <div style={{ padding: "8px" }}>
          <div style={{ position: "relative" }}>{postData.bContent}</div>
          <div>
            <MediaGrid files={postData.files} />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
