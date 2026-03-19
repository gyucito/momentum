import { formatTime } from "./utils.js";

const pomodoroTabs = document.querySelectorAll(".pomodoro-tab");
const pomodoroTime = document.getElementById("pomodoro-time");
const pomodoroStart = document.getElementById("pomodoro-start");
const pomodoroPause = document.getElementById("pomodoro-pause");
const pomodoroReset = document.getElementById("pomodoro-reset");

// 알람 사운드 설정
const alarmSound = new Audio("/audio/singing-bowl-low-and-loud.mp3");
alarmSound.volume = 0.6;

let pomodoroMode = "focus";
let focusMinutes =
  parseInt(localStorage.getItem("pomodoro-focusMinutes")) || 25;
let restMinutes = parseInt(localStorage.getItem("pomodoro-restMinutes")) || 5;
let timerSeconds = focusMinutes * 60;

let timerInterval = null;
let isTimerRunning = false;

let isSilentMode = localStorage.getItem("pomodoro-silent-mode") === "true";

const silentToggleInput = document.getElementById("pomodoro-silent-toggle");
const toggleLabel = document.querySelector(".toggle-label");

// 무소음 토글 초기화 & 이벤트 등록
if (silentToggleInput && toggleLabel) {
  silentToggleInput.checked = !isSilentMode;
  toggleLabel.textContent = `소리 ${isSilentMode ? "OFF" : "ON"}`;

  silentToggleInput.addEventListener("change", () => {
    isSilentMode = !silentToggleInput.checked;
    localStorage.setItem(
      "pomodoro-silent-mode",
      isSilentMode ? "true" : "false",
    );

    toggleLabel.textContent = `소리 ${isSilentMode ? "OFF" : "ON"}`;
  });
}

/**
 * 무소음 모드일 때 시각 알림 (타이머 영역 깜빡임)
 * 3초 동안 배경색 깜빡임
 */
function showVisualAlert() {
  if (!pomodoroTime) return;

  const originalColor = pomodoroTime.style.color || "white";
  const originalBg = pomodoroTime.style.backgroundColor || "transparent";

  let count = 0;
  const blinkInterval = setInterval(() => {
    count++;
    if (count % 2 === 0) {
      pomodoroTime.style.color = "white";
      pomodoroTime.style.backgroundColor = "rgba(255, 80, 80, 0.4)";
      pomodoroTime.style.borderRadius = "6px";
    } else {
      pomodoroTime.style.color = originalColor;
      pomodoroTime.style.backgroundColor = originalBg;
    }
    if (count >= 6) {
      clearInterval(blinkInterval);
      pomodoroTime.style.color = originalColor;
      pomodoroTime.style.backgroundColor = originalBg;
    }
  }, 500);
}

/**
 * 알람 재생 함수
 * - 무소음 모드 → 시각 알림만
 * - 소리 모드 → 8초 동안 알람 재생 후 자동 종료
 */
function playAlarm() {
  if (isSilentMode) {
    showVisualAlert();
    return;
  }

  alarmSound.currentTime = 0;
  alarmSound.loop = false;
  alarmSound.play().catch((err) => {
    console.warn("알람 재생 실패:", err);
  });

  setTimeout(() => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }, 8000);
}

/**
 * 현재 모드에 맞춰 남은 시간 표시 업데이트
 * - timerSeconds도 현재 모드 기준으로 재설정
 */
function updateDurationDisplay() {
  const currentMinutes = pomodoroMode === "focus" ? focusMinutes : restMinutes;
  timerSeconds = currentMinutes * 60;
  if (pomodoroTime) pomodoroTime.innerText = formatTime(timerSeconds);
}

/**
 * 모드 탭(집중/휴식) 비활성화/활성화
 * 타이머 실행 중일 때 탭 클릭 막음
 */
function togglePomodoroModeTabsDisabled(disabled) {
  pomodoroTabs.forEach((tab) => {
    tab.disabled = disabled;
    tab.classList.toggle("disabled", disabled);
  });
}

/**
 * 집중 ↔ 휴식 모드 전환
 * - active 클래스 토글
 * - timerSeconds 현재 모드 시간으로 재설정
 * - 화면 즉시 업데이트
 */
function setPomodoroMode(mode) {
  pomodoroMode = mode;
  pomodoroTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });
  timerSeconds = (mode === "focus" ? focusMinutes : restMinutes) * 60;
  updateDurationDisplay();
}

/**
 * Pomodoro 타이머 시작
 * - 시작 버튼 숨기고 일시정지 버튼 표시
 * - 1초마다 timerSeconds 감소
 * - 0초 되면 알람 재생 + 모드 전환
 */
function startPomodoro() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  if (pomodoroStart) pomodoroStart.style.display = "none";
  if (pomodoroPause) pomodoroPause.style.display = "inline-block";
  togglePomodoroModeTabsDisabled(true);

  timerInterval = setInterval(() => {
    timerSeconds -= 1;

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
      if (pomodoroStart) pomodoroStart.style.display = "inline-block";
      if (pomodoroPause) pomodoroPause.style.display = "none";
      togglePomodoroModeTabsDisabled(false);
      playAlarm();
      if (pomodoroMode === "focus") {
        setPomodoroMode("rest");
      } else {
        setPomodoroMode("focus");
      }

      return;
    }

    if (pomodoroTime) pomodoroTime.innerText = formatTime(timerSeconds);
  }, 1000);
}

/**
 * 타이머 일시정지
 * - 버튼 상태 복구
 * - interval 해제
 */
function pausePomodoro() {
  if (!isTimerRunning) return;
  isTimerRunning = false;
  if (pomodoroPause) pomodoroPause.style.display = "none";
  if (pomodoroStart) pomodoroStart.style.display = "inline-block";
  togglePomodoroModeTabsDisabled(false);
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/**
 * 타이머 리셋
 * - 일시정지 후 현재 모드의 원래 시간으로 복구
 */
function resetPomodoro() {
  pausePomodoro();
  timerSeconds = (pomodoroMode === "focus" ? focusMinutes : restMinutes) * 60;
  if (pomodoroTime) pomodoroTime.innerText = formatTime(timerSeconds);
}

/**
 * Pomodoro 모듈 초기화
 * - 기본 모드 설정
 * - 탭 클릭 이벤트
 * - 시간 조절 버튼 이벤트
 * - 시작/일시정지/리셋 버튼 이벤트
 * - 무소음 토글 초기화
 */
export function initPomodoro() {
  setPomodoroMode("focus");

  pomodoroTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (isTimerRunning) return;
      setPomodoroMode(tab.dataset.mode);
    });
  });

  document.querySelectorAll(".duration-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.change;

      let minutesToChange;

      if (pomodoroMode === "focus") {
        minutesToChange = focusMinutes;
      } else {
        minutesToChange = restMinutes;
      }

      if (action === "up" || action === "plus") {
        minutesToChange = Math.min(60, minutesToChange + 1);
      } else if (action === "down" || action === "minus") {
        minutesToChange = Math.max(1, minutesToChange - 1);
      }

      if (pomodoroMode === "focus") {
        focusMinutes = minutesToChange;
        localStorage.setItem("pomodoro-focusMinutes", focusMinutes.toString());
      } else {
        restMinutes = minutesToChange;
        localStorage.setItem("pomodoro-restMinutes", restMinutes.toString());
      }

      const currentMinutes =
        pomodoroMode === "focus" ? focusMinutes : restMinutes;
      timerSeconds = currentMinutes * 60;

      updateDurationDisplay();

      if (isTimerRunning) {
        clearInterval(timerInterval);
        startPomodoro();
      }
    });
  });

  pomodoroStart?.addEventListener("click", startPomodoro);
  pomodoroPause?.addEventListener("click", pausePomodoro);
  pomodoroReset?.addEventListener("click", resetPomodoro);
}
