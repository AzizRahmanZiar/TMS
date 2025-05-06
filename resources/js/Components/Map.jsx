import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";

const Map = () => {
    const [isClient, setIsClient] = useState(false);
    const position = [31.6289, 65.7372]; // د کندهار جغرافیوي مختصات

    useEffect(() => {
        setIsClient(true);
    }, []);

    const customIcon = L.icon({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-[500px] w-full">
            {isClient && (
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position} icon={customIcon}>
                        <Popup>(کندهار، افغانستان)</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default Map;
