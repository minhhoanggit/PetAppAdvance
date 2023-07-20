"use strict";

navAcitive();

const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");

let petArr = [];
if (JSON.parse(getFromStorage("KEY")) !== null) {
  petArr = JSON.parse(getFromStorage("KEY"));
}
let breedArr = [];
if (JSON.parse(getFromStorage("breedArr")) !== null) {
  breedArr = JSON.parse(getFromStorage("breedArr"));
}
// console.log(petArr);

function saveStaticDataToFile() {
  var blob = new Blob([JSON.stringify(petArr)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "petArr.json");
}
exportBtn.addEventListener("click", () => {
  saveStaticDataToFile();
});

const readFile = () => {
  var file = document.getElementById("input-file").files[0];
  console.log(file)
  // console.log(file)
  if (file.name.includes(".json")) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      saveToStorage("uploadFile", evt.target.result);
      alert("Import success!");
      document.getElementById("input-file").value = "";
    };
  }else{
    alert("Import file JSON! please..");

  }
};
var isChecked = false;
importBtn.addEventListener("click", () => {
  readFile();
  isChecked = true
});
importBtn.addEventListener("click", () => {
  if (isChecked) {
    setTimeout(() => {
      location.reload();
      isChecked = false
    }, 1000);
  }
});
if (JSON.parse(getFromStorage("KEY")) !== null) {
  petArr = JSON.parse(getFromStorage("KEY"));
}
saveToStorage("KEY", JSON.stringify(petArr));

let petArrUpLoad = [];

if (JSON.parse(getFromStorage("uploadFile"))) {
  petArrUpLoad = JSON.parse(getFromStorage("uploadFile"));
}
let nonDuplicatePetArr = petArr.filter(
  (item1) => !petArrUpLoad.find((item2) => item2.id === item1.id)
);
petArr = [...petArrUpLoad, ...nonDuplicatePetArr];

saveToStorage("KEY", JSON.stringify(petArr));