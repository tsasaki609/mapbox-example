import axios from "axios";
import cheerio from "cheerio";

const getImage = async keyword => {
  console.log("keyword " + keyword);
  const { data } = await axios.get(
    "https://search.yahoo.co.jp/image/search?p=%E3%83%A4%E3%83%95%E3%83%BC&ei=UTF-8"
  );
  const $ = cheerio.load(data);
  const imageList = $("#gridlist div div p a img");

  console.log("image " + imageList);
};

(async () => {
  await getImage("ヤフー");
})();
