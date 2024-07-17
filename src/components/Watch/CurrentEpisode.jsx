/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CurrentEpisode({ data, title, handleEpisodeContexts }) {
  const servers = [
    {
      name: "VidStream",
      types: ["dub", "sub"],
    },
    {
      name: "MegaCloud",
      types: ["dub", "sub"],
    },
    {
      name: "StreamSb",
      types: ["dub", "sub"],
    }
  ];

  const [currentServer, setCurrentServer] = useState({ name: "VidStream", type: "sub" });

  return (
    <div className="current-episode-container">
      <div className="episodes-row episodes-row1">
        <p>
          You{"'"}re Watching{" "}
          <span style={{ fontWeight: "600" }}>
            Episode {data.number || "?"}
          </span>
        </p>
        <p>
          If current server doesn{"'"}t work, you can switch to a different server.
        </p>
      </div>
      <div className="episodes-row episode-row2">
        <div className="sub">
          <p className="label">
            <FontAwesomeIcon icon={faClosedCaptioning} />
            Sub
          </p>
          <div className="servers">
            {servers.map((server) => (
              server.types.includes("sub") && (
                <p
                  key={server.name}
                  className={`${currentServer.name === server.name && currentServer.type === "sub" ? "server-active" : "server"}`}
                  onClick={() => {
                    setCurrentServer({ name: server.name, type: "sub" });
                    handleEpisodeContexts(server.name, "sub");
                  }}
                >
                  {server.name}
                </p>
              )
            ))}
          </div>
        </div>
        <div className="dub">
          <p className="label">
            <FontAwesomeIcon icon={faMicrophone} />
            Dub
          </p>
          <div className="servers">
            {servers.map((server) => (
              server.types.includes("dub") && (
                <p
                  key={server.name}
                  className={`${currentServer.name === server.name && currentServer.type === "dub" ? "server-active" : "server"}`}
                  onClick={() => {
                    setCurrentServer({ name: server.name, type: "dub" });
                    handleEpisodeContexts(server.name, "dub");
                  }}
                >
                  {server.name}
                </p>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentEpisode;
