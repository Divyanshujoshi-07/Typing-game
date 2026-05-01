const textEl = document.getElementById("text");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");
const levelEl = document.getElementById("level");
const timeSelect = document.getElementById("timeSelect");

let text = "";
let time = 60;
let totalTime = 60;
let timer;
let correct = 0;
let total = 0;

/* BASE PARAGRAPHS */
const baseTexts = {
  easy: "Typing improves speed and accuracy. Practice daily to build strong typing habits.",
  medium: "Frontend development requires understanding HTML CSS and JavaScript to build responsive and interactive user interfaces.",
  hard: "Advanced JavaScript concepts such as closures asynchronous programming and event delegation play a crucial role in building scalable web applications."
};

/* GENERATE PARAGRAPH BASED ON TIME */
function generateParagraph(base, seconds){
  let wordsNeeded = Math.floor((seconds / 60) * 120); // avg 120 wpm
  let words = base.split(" ");
  let result = [];

  while(result.length < wordsNeeded){
    result = result.concat(words);
  }

  return result.slice(0, wordsNeeded).join(" ");
}

function startGame(){
  clearInterval(timer);

  totalTime = parseInt(timeSelect.value);
  time = totalTime;

  let base = baseTexts[levelEl.value];
  text = generateParagraph(base, totalTime);

  inputEl.value = "";
  inputEl.disabled = false;
  correct = 0;
  total = 0;

  renderText();
  startTimer();
}

function renderText(){
  textEl.innerHTML = "";
  text.split("").forEach(char=>{
    let span = document.createElement("span");
    span.innerText = char;
    textEl.appendChild(span);
  });
}

inputEl.addEventListener("input", ()=>{
  const chars = textEl.querySelectorAll("span");
  const input = inputEl.value.split("");

  correct = 0;
  total = input.length;

  input.forEach((char,i)=>{
    if(chars[i]){
      if(char === chars[i].innerText){
        chars[i].classList.add("correct");
        chars[i].classList.remove("wrong");
        correct++;
      } else {
        chars[i].classList.add("wrong");
        chars[i].classList.remove("correct");
      }
    }
  });

  updateStats();
});

function startTimer(){
  timeEl.innerText = time;

  timer = setInterval(()=>{
    time--;
    timeEl.innerText = time;

    if(time <= 0){
      clearInterval(timer);
      inputEl.disabled = true;
      alert("Test Completed!");
    }
  },1000);
}

function updateStats(){
  let words = inputEl.value.trim().split(/\s+/).length;
  let elapsed = totalTime - time;

  let wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
  let accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  wpmEl.innerText = wpm;
  accEl.innerText = accuracy;
}