const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const toDoToggle = document.getElementById("todo-toggle");
const openToDoToggle = document.getElementById("checked");
const closeToDoToggle = document.getElementById("unchecked");

const TODOS_KEY = "todos";
const IS_SHOW_TODOLIST_KEY = "isShowToDoList";

let toDos = [];

let isOpen = localStorage.getItem(IS_SHOW_TODOLIST_KEY) !== "false";

/**
 * 오늘 날짜 문자열 반환 (YYYY-MM-DD 형식)
 * localStorage 필터링 및 저장 시 사용
 */
function todayKey() {
  return new Date().toISOString().split("T")[0];
}

/**
 * toDos 배열을 localStorage에 JSON으로 저장
 */
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

/**
 * 할 일 목록 전체 다시 렌더링
 * - 목록이 비었으면 "할 일이 없습니다." 메시지 표시
 * - 아니면 각 할 일 paintToDo() 호출
 */
function renderTodos() {
  toDoList.innerHTML = "";

  if (toDos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "할 일이 없습니다.";
    li.style.color = "#9f9fa9";
    li.style.width = "100%";
    toDoList.appendChild(li);
    return;
  }

  toDos.forEach(paintToDo);
}

/**
 * 할 일 목록 보이기/숨기기 UI 동기화
 * - isOpen 상태에 따라 아이콘 및 display 변경
 * - 토글 버튼 클릭 시 호출됨
 */
function syncTodoListVisibility() {
  if (isOpen) {
    openToDoToggle.classList.remove("hidden");
    closeToDoToggle.classList.add("hidden");
    toDoList.style.display = "block";
  } else {
    openToDoToggle.classList.add("hidden");
    closeToDoToggle.classList.remove("hidden");
    toDoList.style.display = "none";
  }
}

/**
 * ID로 할 일 삭제
 * - toDos 배열에서 제거
 * - DOM에서 li 삭제
 * - 저장 후 목록 다시 렌더링
 */
function deleteToDoById(id) {
  toDos = toDos.filter((toDo) => toDo.id !== id);
  saveToDos();
  renderTodos();
}

/**
 * 삭제 버튼 클릭 이벤트 핸들러
 * - li 요소 찾아서 ID로 삭제
 */
function deleteToDo(event) {
  event.preventDefault();
  const li = event.target.closest("li");
  if (!li) return;
  deleteToDoById(parseInt(li.id));
}

/**
 * 체크박스 변경 시 완료 상태 토글
 * - todo.done 값 변경
 * - 저장 후 목록 다시 렌더링
 */
function toggleToDoDone(event) {
  const li = event.target.closest("li");
  if (!li) return;
  const id = parseInt(li.id);
  const todo = toDos.find((item) => item.id === id);
  if (!todo) return;

  todo.done = event.target.checked;
  saveToDos();
  renderTodos();
}

/**
 * 할 일 텍스트 더블클릭 시 편집 모드 진입
 * - span → input으로 교체
 * - Enter/Escape/Blur로 편집 완료
 */
function startTodoEdit(todo, li, span) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  input.className = "todo-edit-input";
  input.style.width = "100%";
  input.style.marginLeft = "0.3rem";
  input.style.border = "1px solid rgba(255,255,255,0.3)";
  input.style.borderRadius = "4px";
  input.style.background = "rgba(255,255,255,0.1)";
  input.style.color = "white";
  input.style.padding = "0.2rem";

  const label = span.closest("label");
  if (!label) return;

  label.replaceChild(input, span);
  input.focus();
  input.select();

  function finishEdit() {
    const updated = input.value.trim();
    if (updated && updated !== todo.text) {
      todo.text = updated;
      saveToDos();
      renderTodos();
    } else {
      if (label.contains(input)) label.replaceChild(span, input);
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishEdit();
    else if (e.key === "Escape") {
      if (label.contains(input)) label.replaceChild(span, input);
    }
  });

  input.addEventListener("blur", finishEdit);
}

/**
 * 하나의 할 일 항목을 DOM으로 생성 & 렌더링
 */
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  li.className = newTodo.done ? "done" : "";

  const label = document.createElement("label");
  label.className = "todo-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = newTodo.done;
  checkbox.addEventListener("change", toggleToDoDone);

  const span = document.createElement("span");
  span.innerText = newTodo.text;

  span.addEventListener("dblclick", () => startTodoEdit(newTodo, li, span));

  label.appendChild(checkbox);
  label.appendChild(span);

  const actionWrapper = document.createElement("div");
  actionWrapper.className = "todo-actions-wrapper";
  actionWrapper.style.position = "relative";

  const button = document.createElement("button");
  button.innerText = "···";
  button.title = "더 보기";
  button.className = "todo-action-btn";

  const actionMenu = document.createElement("div");
  actionMenu.className = "todo-action-menu hidden";
  actionMenu.innerHTML = `
    <button class="menu-item" data-action="edit">수정</button>
    <button class="menu-item" data-action="delete">삭제</button>
  `;

  actionMenu.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (action === "edit") {
      startTodoEdit(newTodo, li, span);
    } else if (action === "delete") {
      deleteToDoById(newTodo.id);
    }
    actionMenu.classList.add("hidden");
  });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".todo-action-menu").forEach(m => {
      if (m !== actionMenu) m.classList.add("hidden");
    });
    actionMenu.classList.toggle("hidden");
  });

  actionWrapper.appendChild(button);
  actionWrapper.appendChild(actionMenu);

  li.appendChild(label);
  li.appendChild(actionWrapper);
  toDoList.appendChild(li);
}

/**
 * 페이지 전체 클릭 시 열려있는 모든 액션 메뉴 닫기
 */
document.addEventListener("click", () => {
  document.querySelectorAll(".todo-action-menu").forEach(m => m.classList.add("hidden"));
});

/**
 * 할 일 입력 폼 제출 처리
 * - 입력값 검증
 * - 새 할 일 객체 생성
 * - 배열 추가 → 저장 → 렌더링
 */
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodoText = toDoInput.value.trim();
  if (!newTodoText) return;

  const newTodoObj = {
    text: newTodoText,
    id: Date.now(),
    date: todayKey(),
    done: false,
  };

  toDos.push(newTodoObj);
  saveToDos();
  renderTodos();
  toDoInput.value = "";
}

toDoForm.addEventListener("submit", handleToDoSubmit);

/**
 * 오늘 할 일만 불러와서 상태 초기화
 * - localStorage에서 전체 할 일 불러오기
 * - 오늘 날짜 것만 필터링
 * - 저장 후 렌더링 + 토글 UI 동기화
 */
function loadTodayTodos() {
  const saved = localStorage.getItem(TODOS_KEY);
  const allTodos = saved ? JSON.parse(saved) : [];

  const today = todayKey();
  toDos = allTodos.filter(todo => todo.date === today);

  saveToDos();
  renderTodos();
  syncTodoListVisibility();
}

loadTodayTodos();

toDoToggle.addEventListener("click", () => {
  isOpen = !isOpen;
  localStorage.setItem(IS_SHOW_TODOLIST_KEY, isOpen);
  syncTodoListVisibility();
});