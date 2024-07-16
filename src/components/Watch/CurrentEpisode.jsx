/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CurrentEpisode({ data, title, handleEpisodeContexts }) {
  const servers = ["VidStream", "MegaCloud", "StreamSb"];
  const [currentServer, setCurrentServer] = useState("VidStream");

  return (
    <div className="current-episode-container">
      <div className="episodes-row episodes-row1">
        <p>
          You{`'`}re Watching{" "}
          <span style={{ fontWeight: "600" }}>
            Episode {data.number || "?"}
          </span>
        </p>
        <p>
          if current server {"doesn't"} work, you can switch to a different server.
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
              <p
                key={server}
                className={`${
                  currentServer == server ? "server-active" : "server"
                }`}
                onClick={() => {
                  setCurrentServer(server);
                  handleEpisodeContexts(server, "sub");
                }}
              >
                {server}
              </p>
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
              <p
                key={server}
                className={`server ${
                  currentServer === server ? "server-active" : ""
                }`}
                onClick={() => {
                  setCurrentServer(server);
                  handleEpisodeContexts(server, "dub");
                }}
              >
                {server}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentEpisode;
