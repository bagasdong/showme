import L from "leaflet";
import { BASE_IMAGE_URL } from "../../../helpers/url";

export const alatIcon = new L.Icon({
  iconUrl: BASE_IMAGE_URL + "map_green.png",
  iconRetinaUrl: BASE_IMAGE_URL + "map_green.png",
  popupAnchor: [-0, -0],
  iconSize: [20, 30],
});
export const beritaIcon = new L.Icon({
  iconUrl: BASE_IMAGE_URL + "map_red.png",
  iconRetinaUrl: BASE_IMAGE_URL + "map_red.png",
  popupAnchor: [-0, -0],
  iconSize: [30, 30],
});
export const eventIcon = new L.Icon({
  iconUrl: BASE_IMAGE_URL + "map_yellow.png",
  iconRetinaUrl: BASE_IMAGE_URL + "map_yellow.png",
  popupAnchor: [-0, -0],
  iconSize: [40, 40],
});
