const USERNAME_KEY = "username";

let greetingInterval = null;

/**
 * 인사말 요소를 현재 시간대에 맞춰 업데이트하는 함수
 * - 로그인 상태 확인
 * - 시간대별 인사말 생성
 * - 요소가 숨겨져 있으면 강제로 보이게 함
 */
function updateGreeting() {
  const greeting = document.getElementById("greeting");
  if (!greeting) return;

  if (greeting.style.display === "none") {
    greeting.style.display = "block";
  }

  const username = localStorage.getItem(USERNAME_KEY);
  if (!username) return;

  const hour = new Date().getHours();
  let greetingText;

  if (hour >= 6 && hour < 12) {
    greetingText = `좋은 아침 ${username}! 오늘도 힘내!`;
  } else if (hour >= 12 && hour < 18) {
    greetingText = `점심 잘 챙기고 있니, ${username}?`;
  } else {
    greetingText = `오늘 하루 고생 많았어, ${username}!`;
  }

  greeting.innerText = greetingText;
  greeting.style.display = "block";
}

/**
 * 인사말 실시간 업데이트 시작
 * - 즉시 한 번 업데이트
 * - 이미 실행 중이면 중복 실행 방지
 */
function startGreetingUpdate() {
  if (greetingInterval) return;
  updateGreeting();
  greetingInterval = setInterval(updateGreeting, 1000);
}

/**
 * 인사말 실시간 업데이트 중지
 * - setInterval 해제
 * - interval ID 초기화
 */
function stopGreetingUpdate() {
  if (greetingInterval) {
    clearInterval(greetingInterval);
    greetingInterval = null;
  }
}

export { startGreetingUpdate, stopGreetingUpdate, updateGreeting };
