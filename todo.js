const colors = [
  //18
  "#42d4bc",
  "#429ed4",
  "#4264d4",
  "#4c42d4",
  "#542aca",
  "#7e4bdd",
  "#1e82a0",
  "#1e4ba0",
  "#311ea0",
  //
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34",
];

// const add = document.querySelector("input");
// const btn = document.querySelector("button");
// const box = document.querySelector(".box1");

// document.querySelector("button").addEventListener("click", (e) => {
//   let newTag = document.createElement("p");
//   newTag.textContent = add.value;

//   const randomColor = colors[Math.floor(Math.random() * colors.length)];
//   newTag.style.backgroundColor = randomColor;

//   box.appendChild(newTag);
//   // console.log(newTag);
// });

let dragTarget = {};

// display();

function 색추출기(colors) {
  const 랜덤값 = Math.floor(Math.random() * colors.length); // 0 ~ 17
  return colors[랜덤값];
}

document.querySelector("button").addEventListener("click", (e) => {
  const text = document.querySelector("input").value;

  // local storage 저장
  const todo객체 = {};
  todo객체.text = document.querySelector("input").value;
  todo객체.category = "todo";
  todo객체.id = Date.now();
  localStorage.setItem(todo객체.id, JSON.stringify(todo객체));

  // 새로운 태그 생성
  const newTag = createTag(text, todo객체.id);
  document.querySelector(".todo").appendChild(newTag);

  // input 값 삭제 (초기화)
  document.querySelector("input").value = "";
});

const boxes = document.querySelectorAll(".box");
// console.log(boxes);
boxes.forEach((box, i) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  box.addEventListener("drop", (e) => {
    // console.log(e.currentTarget);
    e.currentTarget.appendChild(dragTarget);
    const todo = JSON.parse(
      localStorage.getItem(dragTarget.getAttribute("key"))
    );
    todo.category = e.currentTarget.getAttribute("category");
    localStorage.setItem(todo.id, JSON.stringify(todo));
  });
});

function createTag(text, key) {
  // 새로운 p 태그 요소를 생성
  const newTag = document.createElement("p");
  newTag.innerHTML = text;
  newTag.style.backgroundColor = 색추출기(colors);
  newTag.setAttribute("draggable", "true");
  // p태그요소의 dragstart 이벤트 함수
  newTag.addEventListener("dragstart", (e) => {
    dragTarget = e.currentTarget;
  });

  /**** / 삭제버튼 생성코드 - 시작  */
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = "  X";
  // 삭제버튼의 클릭 이벤트 함수
  deleteBtn.addEventListener("click", (e) => {
    e.currentTarget.parentElement.remove();
    const key = e.currentTarget.parentElement.getAttribute("key");
    localStorage.removeItem(key);
  });
  newTag.appendChild(deleteBtn);
  /**** / 삭제버튼 생성코드 - 끝  */

  newTag.setAttribute("key", key);
  return newTag;
}

// 화면 로딩 시 딱 한 번 호출되서 저장되었던 데이터를 화면에 표시해줌
function display() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const todo = JSON.parse(localStorage.getItem(key));
    const color = 색추출기(colors);
    const newTag = createTag(todo.text, todo.id);
    document.querySelector(`.${todo.category}`).appendChild(newTag);
  }
}

display();

//

/* 

1) 드래거블 속성 추가
<p draggable = "true">자바스크립트</p>
setAttribute 필요

2) box1, boz2, box3, 에 드래그 관련 이벤트 추가
 : "drop", "dragover"
 : "gragover" 이벤트는 e.preventDefault( ) 적용
 : "drop 이벤트는" <p draggable = "true"> 자바스크립트</p> 요소를 옮기는데 필요
 : "drop" 이벤트가 발생한 e.currentTarget에 appendChild( ) 해야함 

 3) 현재 드래그되고 있는 태그 요소를 찾아야함
 "dragstart"

 <p draggable="true">자바스트립트
 <span class="delete">X</span>
 </p>


 객체 상태로 저장...
 1) text : 할 일 텍스트,, 사용자 인풋에 적은 내용

 2) category : todo, doing, done

 3) id : 중복되지 않는 유니크한 값 (현재시간)




Todo 프로젝트 남은 기능

1) 카테고리의 변화 저장 기능
(todo <-> doing <-> done)
==> drop 이벤트 함수에 추가!

2) todo 할 일 삭제 시 저장 데이터도 삭제
==> 삭제 버튼 클릭 이벤트 함수에 추가!
localstorage.removeItem(key) 이용

3) 페이지 로딩 시 저장 데이터를 화면에 출력
==> 페이지 로딩 시 화면 출력 기능 새로 추가!
: 페이지 로딩 시 화면을 출력하는 함수를 만듦 (display 함수)
: display 함수는 로딩할 때 딱 한 번!! 호출됨 
  > 1. for loop 를 돌면서 local storage의 저장 데이터를 읽음
    2. 저장 데이터(=todo데이터)의 정보를 이용하여 새로운 p tag를 만듦
       creatTag(text, key)
    3. new p tag를 category에 따라 나눠서 appendChild 해줌

 */
