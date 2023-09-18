import "leaflet/dist/leaflet.css";
import "./App.css";
import Maps from "./Map";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet-draw";
import { Draw, DrawMap } from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";

function App() {
  const center: LatLngExpression = [20.9361, 106.0545]; // Center the map on Vietnam
  // const context = useLeafletContext();

  return (
    // <MapContainer
    //   center={center}
    //   zoom={13}
    //   scrollWheelZoom={true}
    //   style={{ minHeight: "100vh", minWidth: "100vw" }}
    // >
    //   <TileLayer
    //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Marker position={center}>
    //     <Popup>
    //       A pretty CSS3 popup. <br /> Easily customizable.
    //     </Popup>
    //   </Marker>
    // </MapContainer>
    <>
      <Maps />
    </>
  );
}

export default App;
