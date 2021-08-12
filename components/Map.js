import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

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
        return (
          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetRight={-10}
            >
              <p
                role="img"
                onClick={() => setSelectedLocation(result)}
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
              >
                📌
              </p>
            </Marker>
            {/* The popup that should show if we click on a Marker */}
            {selectedLocation.long === result.long ? (
              <Popup
                closeOnClick={true}
                onClose={() => setSelectedLocation({})}
                latitude={result.lat}
                longitude={result.long}
              >
                {result.title}
              </Popup>
            ) : (
              false
            )}
          </div>
        );
      })}
    </ReactMapGL>
  );
}

export default Map;
