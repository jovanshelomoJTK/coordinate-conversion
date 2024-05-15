import { useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import useMapStore from "@/hooks/useMapStore";
import { convertDDToDMS, createPoint } from "@/lib/map-utils";
import { transform } from "ol/proj";
import useConverterPopoverStore from "@/hooks/useConverterPopoverStore";
import { Point } from "ol/geom";

/**
 * Renders a map view component.
 * @returns The map view component.
 */
export default function MapView() {
  const setMap = useMapStore((state) => state.setMap);
  const setPopoverOpen = useConverterPopoverStore(
    (state) => state.setPopoverOpen
  );
  const setDDValue = useConverterPopoverStore((state) => state.setDDValue);
  const setDMSValue = useConverterPopoverStore((state) => state.setDMSValue);

  const setSelectedMarker = useConverterPopoverStore(
    (state) => state.setSelectedMarker
  );

  useEffect(() => {
    const tempMap = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        // Center of Indonesia
        center: [13185720.993673442, -264464.2858834424],
        zoom: 5.5,
      }),
    });
    setMap(tempMap);

    tempMap.on("singleclick", (event) => {
      // Check if there is a feature at the clicked location
      if (tempMap.hasFeatureAtPixel(event.pixel)) {
        const feature = tempMap.getFeaturesAtPixel(event.pixel)[0];
        setPopoverOpen(true);
        const flatCoordiates = (
          feature.getGeometry() as Point
        ).getFlatCoordinates() as [number, number];

        const DDCoordinates = transform(
          flatCoordiates,
          "EPSG:3857",
          "EPSG:4326"
        );
        const DMSCoordinates = convertDDToDMS(
          DDCoordinates[1],
          DDCoordinates[0]
        );

        setDDValue([DDCoordinates[1], DDCoordinates[0]]);
        setDMSValue([DMSCoordinates.latitude, DMSCoordinates.longitude]);
        setSelectedMarker(feature);
      } else {
        // If there is no feature, add a new point
        const coord = event.coordinate;
        const toLonLat = transform(coord, "EPSG:3857", "EPSG:4326");
        tempMap.addLayer(createPoint(toLonLat[1], toLonLat[0]));
      }
    });

    return () => {
      tempMap.setTarget(undefined);
      setMap(undefined);
    };
  }, [setDDValue, setDMSValue, setMap, setPopoverOpen, setSelectedMarker]);

  return <div id="map" className="w-full h-full" />;
}
