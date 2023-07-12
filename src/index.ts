// 랜덤번호 지정 x
// 유져가 번호를 입력한다 그리고 go 라는 버튼 을누름 x
// 만약에 유져가 랜덤번호를 맟추면, 맞쳤습니다! x
// 랜덤번호가 크면 down x
// 랜덤번호가 작으면 up x
// reset 버튼x
// 5번 기회 다쓰면 게임끝 x
// 유저가 1-100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다x
// 유져가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.x

const playBtn = document.getElementById("play_btn")! as HTMLButtonElement;
const input = document.getElementById("input")! as HTMLInputElement;
const result = document.getElementById("result")! as HTMLDivElement;
const reset = document.getElementById("reset_btn")! as HTMLButtonElement;
const chances = document.getElementById("chance")! as HTMLDivElement;

let answer = randomNum();
let chance = 5;
let gameOver = false;
let historyArr: number[] = [];

playBtn.addEventListener("click", play);
reset.addEventListener("click", reSet);

function randomNum(): number {
  const randomResult = Math.floor(Math.random() * 100) + 1;

  return randomResult;
}

console.log(answer, "answer");

function play(e: Event) {
  e.preventDefault();
  let userValue: number = Number(input.value);
  chances.textContent = `남은횟수:${chance}`;

  if (userValue > 100 || userValue < 1) {
    return (result.textContent = "You should guess between 1 to 100");
  } else if (historyArr.includes(userValue)) {
    return (result.textContent = "duplicate Number");
  } else {
    historyArr.push(userValue);
  }

  chance--;

  if (userValue < answer) {
    result.textContent = "UP";
  } else if (userValue > answer) {
    result.textContent = "DOWN";
  } else {
    result.textContent = "YOU WON!!";

    gameOver = true;
  }

  if (chance < 0) {
    result.textContent = "Game Over";
    return (gameOver = true);
  }

  if (gameOver === true) {
    return (playBtn.disabled = true);
  } else {
    return (playBtn.disabled = false);
  }
}

function reSet(e: Event) {
  e.preventDefault();

  randomNum();
  console.log(randomNum());
  chance = 5;
  chances.textContent = `남은횟수:${chance}`;
  result.textContent = "";
  input.value = "";
  gameOver = false;
}
