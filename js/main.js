import { initClock } from "./clock.js";
import { initPomodoro } from "./pomodoro.js";
import { startGreetingUpdate, stopGreetingUpdate } from "./greeting.js";

const tabs = document.querySelectorAll("#app-tabs .tab");
const USERNAME_KEY = "username";

const loginScreen = document.getElementById("login-screen");
const appContainer = document.getElementById("app");
const usernameInput = document.getElementById("username-input");

/**
 * 페이지 로드 시 가장 먼저 실행되는 초기화
 * - 시계는 로그인 여부 상관없이 항상 시작
 * - 로그인 상태 체크 후 UI 전환
 */
document.addEventListener("DOMContentLoaded", () => {
  initClock();
  showAppIfLoggedIn();
});

/**
 * 로그인 상태를 확인하고 UI를 전환하는 함수
 * - localStorage에 username이 있으면 → 메인 앱 표시
 * - 없으면 → 이름 입력 화면 표시
 */
function showAppIfLoggedIn() {
  const username = localStorage.getItem(USERNAME_KEY);
  if (username) {
    loginScreen.style.display = "none";
    appContainer.style.display = "block";

    initTabs();
    setTab("todo");
    initPomodoro();
    startGreetingUpdate();
  } else {
    loginScreen.style.display = "block";
    appContainer.style.display = "none";
  }
}

usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const name = usernameInput.value.trim();

    if (name.length === 0) {
      alert("이름을 입력해주세요!");
      usernameInput.focus();
      return;
    }

    localStorage.setItem(USERNAME_KEY, name);

    loginScreen.style.display = "none";
    appContainer.style.display = "block";

    initTabs();
    setTab("todo");
    initPomodoro();
    startGreetingUpdate();

    usernameInput.value = "";
  }
});

/**
 * 탭 전환 함수
 * - 활성 탭 스타일 변경
 * - 각 탭별로 필요한 요소들 제어
 * - todo 탭: todo-form, todo-list, greeting, clock 등 보이기
 * - pomodoro 탭: pomodoro-area 보이고, todo/greeting/clock 등 숨김
 */
function setTab(tabName) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });

  const todoForm = document.getElementById("todo-form");
  const todoList = document.getElementById("todo-list");
  const pomodoroArea = document.getElementById("pomodoro-area");
  const clockEl = document.getElementById("clock");
  const toggleBtn = document.getElementById("clock-toggle");
  const greetingEl = document.getElementById("greeting");
  const toDoToggle = document.getElementById("todo-toggle");

  if (tabName === "todo") {
    if (todoForm) todoForm.style.display = "block";
    if (pomodoroArea) pomodoroArea.style.display = "none";
    if (clockEl) clockEl.style.display = "inline-block";
    if (toggleBtn) toggleBtn.style.display = "block";
    if (greetingEl) greetingEl.style.display = "block";
    if (toDoToggle) toDoToggle.style.display = "flex";

    startGreetingUpdate();
  } else {
    if (todoForm) todoForm.style.display = "none";
    if (pomodoroArea) pomodoroArea.style.display = "block";
    if (clockEl) clockEl.style.display = "none";
    if (toggleBtn) toggleBtn.style.display = "none";
    if (greetingEl) greetingEl.style.display = "none";
    if (toDoToggle) toDoToggle.style.display = "flex";

    stopGreetingUpdate();
  }
}

/**
 * 탭 버튼 클릭 이벤트 등록
 * - 로그인 안 된 상태면 경고창 띄우고 탭 전환 막음
 * - 로그인 된 상태면 setTab() 호출
 */
function initTabs() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!localStorage.getItem(USERNAME_KEY)) {
        alert("이름을 입력하세요.");
        return;
      }
      setTab(tab.dataset.tab);
    });
  });
}
