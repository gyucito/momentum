const clock = document.querySelector("h2#clock");
const toggle = document.querySelector("#clock-toggle");
let is24Hour = true;

/**
 * 현재 시간을 가져와서 clock 요소에 표시하는 함수
 * 1초마다 setInterval로 호출됨
 */
function getClock() {
  const date = new Date();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (!is24Hour) {
    hours = hours % 12 || 12;
  }
  clock.innerText = `${String(hours).padStart(2, "0")}:${minutes}`;
}

/**
 * 토글 버튼의 텍스트를 현재 형식에 맞게 업데이트
 * 24시간 → "12시간" 버튼, 12시간 → "24시간" 버튼
 */
function setToggleText() {
  if (!toggle) return;
  toggle.innerText = is24Hour ? "12시간" : "24시간";
}

/**
 * 시계 초기화 함수
 * - 로컬스토리지에서 저장된 12/24시간 설정 불러오기
 * - 초기 시간 표시
 * - 1초마다 시간 업데이트 타이머 시작
 * - 토글 버튼 클릭 이벤트 등록
 */
export function initClock() {
  const savedIs24Hour = localStorage.getItem("is24Hour");
  if (savedIs24Hour !== null) {
    is24Hour = savedIs24Hour === "true";
  }
  setToggleText();
  getClock();
  setInterval(getClock, 1000);

  toggle?.addEventListener("click", () => {
    is24Hour = !is24Hour;
    localStorage.setItem("is24Hour", is24Hour ? "true" : "false");
    setToggleText();
    getClock();
  });
}
