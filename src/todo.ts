// 유저가 값을 입력한다 x
//  + 버튼을 클릭하면, 할일이 추가된다.x
// delete btn 을 누르면 할일이 삭제된다.x
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.x
// check 버튼을 클릭하는순간 true false x
// true 이면 끝난걸로 간주하고 밑줄보여주기 x
// false 이면 안끝난걸로 간주하고 그대로드기 x
// 진행중 끝남 탭을 누르면, 언더바가 이동한다 x
// 끝남탭은, 끝난 아이템만, 진행중탱은 진행중만 x
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴. x

const addBtn = document.getElementById("addBtn")! as HTMLButtonElement;
const inputT = document.getElementById("input")! as HTMLInputElement;
const board = document.getElementById("task-board")! as HTMLDivElement;
const allDiv = document.querySelectorAll(".task-taps div");
const line = document.getElementById("line")! as HTMLDivElement;

addBtn.addEventListener("click", addTask);
for (let i = 0; i < allDiv.length; i++) {
  allDiv[i].addEventListener("click", pressTabs);
}

interface objList {
  id: string;
  todo: string;
  isComplete: boolean;
}

let todoList: objList[] = [];
let filterTodo: objList[] = [];
let selectTag: string = "all";

function addTask(e: Event) {
  const inputValue = inputT.value;
  let listObj: objList = {
    id: randomId(),
    todo: inputValue,
    isComplete: false,
  };
  todoList.push(listObj);
  console.log(todoList);
  render();
}

function render() {
  let HTMLTask: string = "";
  let list: objList[] = [];
  if (selectTag === "all") {
    list = todoList;
  } else {
    list = filterTodo;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      HTMLTask += `<div class="task">
   <div class="task-done">${list[i].todo}</div>
   <div class="btns">
<button onclick="toggleCheck('${list[i].id}')" >check</button>
<button onclick="deleteBtn('${list[i].id}')">delete</button>

 </div>
 </div>`;
    } else {
      HTMLTask += `<div class="task">
   <div>${list[i].todo}</div>
   <div class="btns">
<button onclick="toggleCheck('${list[i].id}')" >check</button>
<button onclick="deleteBtn('${list[i].id}')">delete</button>

 </div>
 </div>`;
    }
  }
  board.innerHTML = HTMLTask;
}

function deleteBtn(id: string) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList.splice(i, 1);
      break;
    }
  }

  render();
}

function toggleCheck(id: string) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList[i].isComplete = !todoList[i].isComplete;

      break;
    }
  }

  render();
}

function pressTabs(e: Event) {
  const eventT = e.target as HTMLElement;
  const currentT = e.currentTarget as HTMLElement;
  line.style.left = currentT.offsetLeft + "px";
  line.style.width = currentT.offsetWidth + "px";
  line.style.top = currentT.offsetTop + currentT.offsetHeight + "px";
  console.log(eventT.id);
  filterTodo = [];
  if (eventT.id === "all") {
    selectTag = "all";
  } else if (eventT.id === "notDone") {
    selectTag = "notDone";
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].isComplete === false) {
        filterTodo.push(todoList[i]);
      }
    }
  } else if (eventT.id === "done") {
    selectTag = "done";
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].isComplete === true) {
        filterTodo.push(todoList[i]);
      }
    }
  }
  render();
}

function randomId(): string {
  return "_" + Math.random().toString(36).substring(2, 9);
}
