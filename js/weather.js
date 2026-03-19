const API_KEY = "abe4dc4c82646ff050f871e96c2e532d";
const weatherDescKo = {
  201: "가벼운 비 / 천둥구름",
  200: "비 / 천둥구름",
  202: "폭우 / 천둥구름",
  210: "약한 천둥구름",
  211: "천둥구름",
  212: "강한 천둥구름",
  221: "불규칙적 천둥구름",
  230: "약한 연무 / 천둥구름",
  231: "연무 / 천둥구름",
  232: "강한 안개비 / 천둥구름",
  300: "가벼운 안개비",
  301: "안개비",
  302: "강한 안개비",
  310: "가벼운 적은비",
  311: "적은비",
  312: "강한 적은비",
  313: "소나기 / 안개비",
  314: "강한 소나기 / 안개비",
  321: "소나기",
  500: "약한 비",
  501: "중간 비",
  502: "강한 비",
  503: "매우 강한 비",
  504: "극심한 비",
  511: "우박",
  520: "약한 소나기",
  521: "소나기 비",
  522: "강한 소나기",
  531: "불규칙적 소나기",
  600: "가벼운 눈",
  601: "눈",
  602: "강한 눈",
  611: "진눈깨비",
  612: "소나기 / 진눈깨비",
  615: "약한 비 / 눈",
  616: "비 / 눈",
  620: "약한 소나기 / 눈",
  621: "소나기 / 눈",
  622: "강한 소나기 / 눈",
  701: "박무",
  711: "연기",
  721: "연무",
  731: "모래 먼지",
  741: "안개",
  751: "모래",
  761: "먼지",
  762: "화산재",
  771: "돌풍",
  781: "토네이도",
  800: "맑은 하늘",
  801: "약간 구름",
  802: "구름 보통",
  803: "약간 구름",
  804: "구름 많음",
};
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      weather.innerText = `${weatherDescKo[data.weather[0].id]} / ${Math.floor(data.main.temp)}°C`;
    });
}
function onGeoError() {
  alert("위치를 찾을 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
