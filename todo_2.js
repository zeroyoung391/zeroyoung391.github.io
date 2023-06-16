const colors = [
  "#b3e0ff",
  "#a3daff",
  "#94d4ff",
  "#85ceff",
  "#75c8ff",
  "#66c2ff",
  "#89edff",
  "#6edef1",
  "#49c8df",
  "#4ecdff",
  "#3abbee",
];

let dragTarget = {};
let colorIndex = 0;

// 색상 배열
function 색추출기(colors) {
  const 랜덤값 = colorIndex % colors.length;
  colorIndex++;
  return colors[랜덤값];
}

// 버튼 클릭
document.querySelector("button").addEventListener("click", (e) => {
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const url = document.querySelector("#url").value;

  // 새로운 todo 객체 생성
  const todo = {
    category: "todo",
    color: 색추출기(colors),
    content: content,
    id: Date.now(),
    title: title,
    url: url,
  };

  // todo 객체를 로컬스토리지에 저장
  localStorage.setItem(todo.id, JSON.stringify(todo));

  const newTag = createTag(todo);
  document.querySelector(".todo").appendChild(newTag);

  // input창 초기화
  document.querySelector("#title").value = "";
  document.querySelector("#content").value = "";
  document.querySelector("#url").value = "";
});

function createTag(todo) {
  const { title, content, url, id, color } = todo;

  const newTag = document.createElement("div");
  newTag.classList.add("todo-card");

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  newTag.appendChild(titleElement);

  const contentElement = document.createElement("p");
  contentElement.textContent = content;
  newTag.appendChild(contentElement);

  if (url) {
    const urlElement = document.createElement("a");
    urlElement.href = url;
    urlElement.target = "_blank";
    urlElement.textContent = url;
    newTag.appendChild(urlElement);
  }

  const timestamp = new Date(id);
  const timestampElement = document.createElement("p");
  timestampElement.textContent = timestamp.toLocaleString();
  timestampElement.classList.add("timestamp");
  newTag.appendChild(timestampElement);

  // 삭제버튼
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-button");
  deleteBtn.addEventListener("click", () => {
    newTag.remove();
    localStorage.removeItem(id);
  });
  newTag.appendChild(deleteBtn);

  newTag.style.backgroundColor = color;

  newTag.draggable = true;

  newTag.addEventListener("dragstart", (e) => {
    dragTarget = e.target;
    newTag.classList.add("dragging");
    e.dataTransfer.setData("text/plain", "dragging");
  });

  newTag.addEventListener("dragend", (e) => {
    newTag.classList.remove("dragging");
  });

  return newTag;
}

// 박스 드래그 앤 드롭
const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  box.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedCard = document.querySelector(".dragging");
    if (draggedCard) {
      e.currentTarget.appendChild(draggedCard);
      const todo = JSON.parse(
        localStorage.getItem(draggedCard.getAttribute("key"))
      );
      todo.category = e.currentTarget.getAttribute("category");
      localStorage.setItem(todo.id, JSON.stringify(todo));
    }
  });
});

function display() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const todo = JSON.parse(localStorage.getItem(key));
    if (todo.category === "todo") {
      const newTag = createTag(todo);
      document.querySelector(".todo").appendChild(newTag);
    }
  }
}

display();
