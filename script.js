let root = document.getElementById("root");
root.className = "container-md";

let heading = document.createElement("h1");
heading.textContent = "English Dictionary";
heading.classList.add("m-2","p-2","text-center")

let form = document.createElement("form");
form.classList.add("row","g-3","mt-3","p-3");
form.id="dict_form";

let rowDiv = document.createElement("div");
rowDiv.classList.add("row","justify-content-center","align-items-center");

let inputDiv = document.createElement("div");
inputDiv.className= "col-auto";
let input = document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("name","input");
input.setAttribute("placeholder","Search a word ...");
input.id = "searchWord";
input.classList.add("form-control","mb-3");
inputDiv.appendChild(input);

let btnDiv = document.createElement("div");
btnDiv.className= "col-auto";
let button = document.createElement("button");
button.setAttribute("type","submit");
button.classList.add("btn", "btn-primary", "mb-3");
button.textContent = "Search";
button.id = "submit";
btnDiv.appendChild(button);

rowDiv.appendChild(inputDiv);
rowDiv.appendChild(btnDiv);

form.appendChild(rowDiv);

root.appendChild(heading);
root.appendChild(form);

let cardDiv = document.createElement("div");
cardDiv.classList.add("card");
cardDiv.id = "resultDiv";

let ul = document.createElement("ul");
ul.classList.add("list-group","list-group-flush");

let li1 = document.createElement("li");
li1.classList.add("list-group-item");
li1.innerHTML = `<p>Word: <span id="title"></span></p>`;
let li2 = document.createElement("li");
li2.classList.add("list-group-item");
li2.innerHTML = `<p>Meaning: <span id="meaning"></span></p>`;
let li3 = document.createElement("li");
li3.classList.add("list-group-item");
li3.innerHTML = `<audio src="" id="audio" controls></audio>`;

ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);

cardDiv.appendChild(ul);

root.appendChild(cardDiv);

// fetch

const inputWord = document.getElementById("searchWord");
const submitBtn = document.getElementById("submit");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const result = await fetch(url).then((res) => res.json());
      // console.log(result);

      if (result.title) {
        alert("Word not found.Try later");
      } else {  
        titleEl.innerText = result[0].word;
        meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
        if(result[0].phonetics[0]){
          if(result[0].phonetics[0].audio) {
            audioEl.src = result[0].phonetics[0].audio;
          } else if (result[0].phonetics[1].audio){
            audioEl.src = result[0].phonetics[1].audio;
          } else {
            audioEl.src="";
          }
        }
      }
   } catch (error) {
      console.log(error);
      alert("Please try again later");      
    }
  }
  
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();      
    const word = inputWord.value;
    fetchAPI(word);
    document.getElementById("dict_form").reset();  
});
  





