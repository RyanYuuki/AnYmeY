/* eslint-disable react/prop-types */

import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable no-unused-vars */
function CurrentEpisode({ data, title }) {

  const dubServers = [
    { name: 'Zoro', url: 'https://zoro.example.com' },
    { name: 'Gogo', url: 'https://gogo.example.com' },
    { name: 'Vidstream', url: 'https://vidstream.example.com' },
  ]

  return (
    <div className="current-episode-container">
      <div className="episodes-row">
        <p>
          You{`'`}re Watching <span style={{ fontWeight: '600' }} >Episode {data.number || '?'}</span>
        </p>
        <p>if current server {"doesn't"} then you can switch to different server.</p>
      </div>
      <div className="episodes-row">
        <div className="sub">
          <p className="label">
            <FontAwesomeIcon icon={faClosedCaptioning} />
            Sub
          </p>
          <div className="servers">
            <p className="server">Zoro</p>
            <p className="server">Gogo</p>
            <p className="server">Vidstream</p>
          </div>
        </div>
        <div className="dub">
          <p className="label">
            <FontAwesomeIcon icon={faMicrophone} />
            Dub
          </p>
          <div className="servers">
            <p className="server">Zoro</p>
            <p className="server">Gogo</p>
            <p className="server">Vidstream</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentEpisode;
