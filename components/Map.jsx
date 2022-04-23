import { useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import getCenter from "geolib/es/getCenter";

const MapComponent = ({ searchResults }) => {
  const [showMarkerPopup, setShowMarkerPopup] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState({});

  const markerPos = searchResults?.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const mapCenterPos = getCenter(markerPos);

  const [mapView, setMapView] = useState({
    longitude: mapCenterPos.longitude,
    latitude: mapCenterPos.latitude,
    zoom: 12,
    width: "100%",
    height: "100%",
  });

  return (
    <Map
      {...mapView}
      onMove={(e) => setMapView(e.viewState)}
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      mapStyle={"mapbox://styles/devmahian/cl28q8nn7001614m1wg4rgl80"}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {searchResults?.map((result, index) => (
        <div key={index}>
          <Marker latitude={result.lat} longitude={result.long} anchor="bottom">
            <p
              role="img"
              className="cursor-pointer animate-bounce"
              onMouseDown={() => setSelectedMarker(result)}
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {selectedMarker.long === result.long && (
            <Popup
              // closeOnClick={true}
              onClose={() => setSelectedMarker({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
};

export default MapComponent;
