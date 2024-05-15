import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { fromLonLat } from "ol/proj";
import DmsCoordinates, { parseDms } from "dms-conversion";

/**
 * Creates a point vector layer with the specified latitude and longitude.
 * @param {number} lat The latitude of the point.
 * @param {number} long The longitude of the point.
 * @returns {VectorLayer} The created vector layer.
 */
export const createPoint = (lat: number, long: number) => new VectorLayer({
    source: new VectorSource({
        features: [
            new Feature({
                name: "Point",
                geometry: new Point(
                    fromLonLat([long, lat])
                ),
                style: new Style({
                    image: new Icon({
                        src:
                            "data:image/svg+xml;utf8," +
                            encodeURIComponent(`<svg width="50" height="72" viewBox="0 0 50 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 34.2C22.632 34.2 20.361 33.2518 18.6865 31.564C17.0121 29.8761 16.0714 27.5869 16.0714 25.2C16.0714 22.8131 17.0121 20.5239 18.6865 18.836C20.361 17.1482 22.632 16.2 25 16.2C27.368 16.2 29.639 17.1482 31.3135 18.836C32.9879 20.5239 33.9286 22.8131 33.9286 25.2C33.9286 26.3819 33.6976 27.5522 33.2489 28.6442C32.8002 29.7361 32.1425 30.7282 31.3135 31.564C30.4844 32.3997 29.5001 33.0626 28.4168 33.5149C27.3336 33.9672 26.1725 34.2 25 34.2ZM25 0C18.3696 0 12.0107 2.65499 7.32233 7.38091C2.63392 12.1068 0 18.5165 0 25.2C0 44.1 25 72 25 72C25 72 50 44.1 50 25.2C50 18.5165 47.3661 12.1068 42.6777 7.38091C37.9893 2.65499 31.6304 0 25 0Z" fill="#E74C3C"/>
                </svg>`),
                        scale: 0.5,
                        anchor: [0.5, 1],
                    }),
                }),
            }),
        ],
    }),
    style: function (feature) {
        return feature.get("style");
    },
});


/**
 * Converts coordinates in decimal degrees to degrees, minutes, and seconds (DMS) format.
 * @param lat - The latitude in decimal degrees.
 * @param long - The longitude in decimal degrees.
 * @returns An object containing the latitude and longitude in DMS format.
 */
export const convertDDToDMS = (lat: number, long: number) => {
    const DMSValue = new DmsCoordinates(lat, long);
    return {
        latitude: DMSValue.latitude.toString(2),
        longitude: DMSValue.longitude.toString(2),
    };
}

/**
 * Converts coordinates in Degree-Minute-Second format to Decimal Degree format.
 * @param lat - The latitude in Degree-Minute-Second format.
 * @param long - The longitude in Degree-Minute-Second format.
 * @returns An object containing the converted latitude and longitude in Decimal Degree format.
 */
export const convertDMSToDD = (lat: string, long: string) => {
    return {
        latitude: parseDms(lat),
        longitude: parseDms(long),
    };
}