"use strict";
navAcitive();

const btnSubmit = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBreed = document.getElementById("tbody");
let breedArr = [];
if (JSON.parse(getFromStorage("breedArr")) !== null) {
  breedArr = JSON.parse(getFromStorage("breedArr"));
}
const idBreed = (breedArr) => {
  for (let i = 0; i < breedArr.length; i++) {
    breedArr[i].id = i.toString();
  }
};
idBreed(breedArr);

const renderBreedTable = (breedArr) => {
  tableBreed.innerHTML = "";

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");

    const sttCell = document.createElement("td");
    sttCell.textContent = i + 1;
    row.appendChild(sttCell);

    const breedCell = document.createElement("td");
    breedCell.textContent = breedArr[i].name;
    row.appendChild(breedCell);

    const typeCell = document.createElement("td");
    typeCell.textContent = breedArr[i].type;
    row.appendChild(typeCell);

    const deleteCell = document.createElement("td");
    const btnElement = document.createElement("button");
    btnElement.className = `btn btn-danger`;
    btnElement.addEventListener("click", function () {
      deleteBreed(`${breedArr[i].id}`);
    });
    btnElement.textContent = `Delete`;
    deleteCell.appendChild(btnElement);
    row.appendChild(deleteCell);

    tableBreed.appendChild(row);
  }
};
renderBreedTable(breedArr);

const deleteBreed = (idBreed) => {
  console.log(idBreed);
  if (confirm("Are you sure?")) {
    breedArr = breedArr.filter(function (element) {
      return element.id !== idBreed;
    });
    console.log(breedArr);
    saveToStorage("breedArr", JSON.stringify(breedArr));
  }
  renderBreedTable(breedArr);
};

const checkData = (data) => {
  let nameCheck = false;
  if (data.name === "") {
    alert("Please enter input Breed!");
  } else {
    nameCheck = true;
  }
  let typeCheck = false;
  if (data.type === "Select Type") {
    alert("Please select Type!");
  } else {
    typeCheck = true;
  }
  if (nameCheck && typeCheck) return true;
  else return false;
};

const clearInput = () => {
  breedInput.value = ""; // Tabby ...
  typeInput.value = "Select Type"; // Cat or Dog
};
btnSubmit.addEventListener("click", () => {
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };
  if (checkData(data)) {
    breedArr.push(data);
  } // check Data true-> add data\
  idBreed(breedArr);

  console.log(breedArr);
  clearInput();
  saveToStorage("breedArr", JSON.stringify(breedArr));

  renderBreedTable(breedArr);
});
