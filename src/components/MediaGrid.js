import { GridList, GridListTile } from "@material-ui/core";
import React from "react";

export default function MediaGrid(props) {
  const files = JSON.parse(props.files);

  if (!files) {
    return <div></div>;
  } else if (files.length === 1) {
    return (
      <div
        style={{
          height: "273.938px",
          width: "487px",
          marginTop: "8px"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "0 auto",
            border: "1px solid #262629",
            display: "flex",
            overflow: "hidden",
            animation: "jss889 8s ease-in-out infinite",
            maxHeight: "100vh",
            alignItems: "center",
            borderRadius: "6px",
            backgroundSize: "400% 100%",
            backgroundImage:
              "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url("https://dogefiles.twetch.app/${files[0]}")`
            }}
          ></div>
        </div>
      </div>
    );
  } else if (files.length === 3) {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <GridList style={{ margin: "-1px" }}>
            <GridListTile
              style={{
                width: "100%",
                height: "204px",
                padding: "1px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: "1px solid #262629",
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    alt={`pxl #${files[0]}`}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      display: "block",
                      animation: "jss494 8s ease-in-out infinite",
                      borderRadius: "6px",
                      backgroundSize: "400% 100%",
                      backgroundImage:
                        "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                    }}
                    src={`https://dogefiles.twetch.app/${files[0]}`}
                  />
                </div>
              </div>
            </GridListTile>
          </GridList>
        </div>
        <div style={{ width: "50%", marginLeft: "1px" }}>
          <GridList style={{ margin: "-1px" }}>
            <GridListTile
              style={{
                width: "100%",
                height: "102px",
                padding: "1px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: "1px solid #262629",
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    alt={`pxl #${files[1]}`}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      display: "block",
                      animation: "jss494 8s ease-in-out infinite",
                      borderRadius: "6px",
                      backgroundSize: "400% 100%",
                      backgroundImage:
                        "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                    }}
                    src={`https://dogefiles.twetch.app/${files[1]}`}
                  />
                </div>
              </div>
            </GridListTile>
            <GridListTile
              style={{
                width: "100%",
                height: "102px",
                padding: "1px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: "1px solid #262629",
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    alt={`pxl #${files[2]}`}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      display: "block",
                      animation: "jss494 8s ease-in-out infinite",
                      borderRadius: "6px",
                      backgroundSize: "400% 100%",
                      backgroundImage:
                        "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                    }}
                    src={`https://dogefiles.twetch.app/${files[2]}`}
                  />
                </div>
              </div>
            </GridListTile>
          </GridList>
        </div>
      </div>
    );
  } else {
    return (
      <GridList style={{ margin: "-1px" }}>
        {files.map((file, index) => {
          return (
            <GridListTile
              style={{
                width: "50%",
                height: "102px",
                padding: "1px"
              }}
              key={index}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: "1px solid #262629",
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    alt={`pxl #${file}`}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      display: "block",
                      animation: "jss494 8s ease-in-out infinite",
                      borderRadius: "6px",
                      backgroundSize: "400% 100%",
                      backgroundImage:
                        "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                    }}
                    src={`https://dogefiles.twetch.app/${file}`}
                  />
                </div>
              </div>
            </GridListTile>
          );
        })}
      </GridList>
    );
  }
}
