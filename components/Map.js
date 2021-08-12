import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  console.log(coordinates);
  const center = getCenter(coordinates);

  console.log(center);
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/aidil42/cks6df88n271417nyolbn71ue"
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchResults.map((result) => {
        console.log("result ->", result);
        return (
          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetRight={-10}
            >
              <p className="cursor-pointer text-2xl animate-bounce">📌</p>
            </Marker>
          </div>
        );
      })}
    </ReactMapGL>
  );
}

export default Map;
