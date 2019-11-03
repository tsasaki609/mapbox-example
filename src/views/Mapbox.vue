<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import axios from "axios";
import cheerio from "cheerio";

const mapboxToken =
  "pk.eyJ1IjoidHNhc2FraTYwOSIsImEiOiJjajVrdmlxZTEyeWdyMzNucW90YWxwcnJlIn0.ja519b4VzmHJUC7hEzdlsw";
const appid = "dj00aiZpPVozVjM1YW9uWDVjdiZzPWNvbnN1bWVyc2VjcmV0Jng9MmE-";

const markerList = {};

const random_rgba = () => {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ",1)";
};

const getPoi = async point => {
  console.log(point);
  const { data } = await axios.get("/search/local/V1/localSearch", {
    params: {
      appid: appid,
      lat: point.lat,
      lon: point.lng,
      dist: 3,
      sort: "hybrid",
      detail: "full",
      output: "json"
    }
  });
  console.log(data);
  return data.Feature;
};

const getImage = async keyword => {
  console.log("keyword " + keyword);
  //   const { data } = await axios.get("/search", {
  //     params: {
  //       q: keyword,
  //       hl: "ja",
  //       tbm: "isch"
  //     }
  //   });
  //   const $ = cheerio.load(data);
  //   const image = $("#rg_s div a img").get(0);
  //   return $(image).attr("src");
  return require("@/assets/dummy.png");
};

const displayPoi = async (map, poiList) => {
  console.log("poiList " + poiList);

  for (const poi of poiList) {
    if (markerList[poi.Name]) continue;

    const image = await getImage(poi.Name);
    console.log("image " + image);

    const markerElement = document.createElement("img");
    markerElement.setAttribute("src", image);
    markerElement.setAttribute(
      "style",
      "width:100px;border-radius: 30px;border: 5px solid;border-color:" +
        random_rgba()
    );
    const marker = new mapboxgl.Marker({
      element: markerElement
    })
      .setLngLat(poi.Geometry.Coordinates.split(","))
      .addTo(map);
    markerList[poi.Name] = marker;
  }
};

export default {
  created: () => {
    const mapboxCss = document.createElement("link");
    mapboxCss.setAttribute(
      "href",
      "https://api.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.css"
    );
    mapboxCss.setAttribute("rel", "stylesheet");
    document.head.appendChild(mapboxCss);
  },
  mounted: async () => {
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/tsasaki609/ck2il9o1p30xt1cpt0emx23cc",
      center: [139.7307289, 35.6805187],
      zoom: 16
    });
    map.on("load", async () => {
      displayPoi(map, await getPoi(map.getCenter()));
      map.on("moveend", async () => {
        displayPoi(map, await getPoi(map.getCenter()));
      });
    });
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
