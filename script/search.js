"use strict";
// animation navbar
navAcitive();

const findBtn = document.getElementById("find-btn");

const tableBodyEl = document.getElementById("tbody");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

//get data petArr from local storage
let petArr;
if (JSON.parse(getFromStorage("KEY")) !== null) {
  petArr = JSON.parse(getFromStorage("KEY"));
}
// console.log(petArr);
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  // let lastElement = petArr[petArr.length - 1]
  // tung phan tu trong mang petArr
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");

    const idCell = document.createElement("th");
    idCell.textContent = petArr[i].id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = petArr[i].name;
    row.appendChild(nameCell);

    const ageCell = document.createElement("td");
    ageCell.textContent = petArr[i].age;
    row.appendChild(ageCell);

    const typeCell = document.createElement("td");
    typeCell.textContent = petArr[i].type;
    row.appendChild(typeCell);

    const weightCell = document.createElement("td");
    weightCell.textContent = `${petArr[i].weight} kg`;
    row.appendChild(weightCell);

    const lengthCell = document.createElement("td");
    lengthCell.textContent = `${petArr[i].length} cm`;
    row.appendChild(lengthCell);

    const breedCell = document.createElement("td");
    breedCell.textContent = petArr[i].breed;
    row.appendChild(breedCell);

    //color
    const colorCell = document.createElement("td");
    // breedCell.textContent = lastElement.color;
    const iColor = document.createElement("i");
    iColor.className = `bi bi-square-fill`; // set class cho element i
    iColor.style.color = `${petArr[i].color}`;

    colorCell.appendChild(iColor);
    row.appendChild(colorCell);

    //vaccine
    const vaccineCell = document.createElement("td");
    const iVaccine = document.createElement("i");
    iVaccine.className = petArr[i].vaccinated
      ? `bi bi-check-circle-fill`
      : `bi bi-x-circle-fill`;

    vaccineCell.appendChild(iVaccine);
    row.appendChild(vaccineCell);

    //Dewormed
    const dwormedCell = document.createElement("td");
    const iDewormed = document.createElement("i");
    iDewormed.className = petArr[i].dewormed
      ? `bi bi-check-circle-fill`
      : `bi bi-x-circle-fill`;

    dwormedCell.appendChild(iDewormed);
    row.appendChild(dwormedCell);

    //Sterilized
    const sterilizeCell = document.createElement("td");
    const iSterileze = document.createElement("i");
    iSterileze.className = petArr[i].sterilized
      ? `bi bi-check-circle-fill`
      : `bi bi-x-circle-fill`;

    sterilizeCell.appendChild(iSterileze);
    row.appendChild(sterilizeCell);

    // date added
    const dateCell = document.createElement("td");
    dateCell.textContent = `${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}`;
    row.appendChild(dateCell);

    tableBodyEl.appendChild(row);
  }
  ////////////////////////////////////////////////////////////////////////
  //   saveToStorage('data', petArr)
}
renderTableData(petArr);
//get data breed pet from local storage
let breedArr = [];
if (JSON.parse(getFromStorage("breedArr")) !== null) {
  breedArr = JSON.parse(getFromStorage("breedArr"));
}

// get data breed pet from local storage => breed search
const selectBreed = () => {
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.text = `Select Breed`;
  breedInput.appendChild(option);
  const renderBreed = (breedArr) => {
    breedArr = breedArr.forEach((element) => {
      const option = document.createElement("option");
      option.text = element.name;
      breedInput.appendChild(option);
    });
  };
  renderBreed(breedArr);
};
selectBreed();

const finding = (data) => {
  let searchPet = petArr; // copy petArr to searchPet => searchPet in searchPet in searchPet...

  if (data.id !== "") {
    searchPet = searchPet.filter((item) => item.id.includes(data.id));
  }

  if (data.name !== "") {
    searchPet = searchPet.filter((item) => item.name.includes(data.name));
  }

  if (data.id !== "" && data.name !== "") {
    searchPet = searchPet.filter((item) => {
      return item.name.includes(data.name) && item.id.includes(data.id);
    });
  }

  if (data.type !== "Select Type") {
    searchPet = searchPet.filter((item) => item.type === data.type);
  }

  if (data.breed !== "Select Breed") {
    searchPet = searchPet.filter((item) => item.breed === data.breed);
  }

  //tick
  if (
    data.vaccinated === true &&
    data.dewormed === false &&
    data.sterilized === false
  ) {
    searchPet = searchPet.filter((item) => item.vaccinated === data.vaccinated);
  } else if (
    data.vaccinated === true &&
    data.dewormed === true &&
    data.sterilized === false
  ) {
    searchPet = searchPet.filter(
      (item) =>
        item.vaccinated === data.vaccinated && item.dewormed === data.dewormed
    );
  } else if (
    data.vaccinated === true &&
    data.dewormed === false &&
    data.sterilized === true
  ) {
    searchPet = searchPet.filter(
      (item) =>
        item.vaccinated === data.vaccinated &&
        item.sterilized === data.sterilized
    );
  } else if (
    data.vaccinated === true &&
    data.dewormed === true &&
    data.sterilized === true
  ) {
    searchPet = searchPet.filter(
      (item) =>
        item.vaccinated === data.vaccinated &&
        item.dewormed === data.dewormed &&
        item.sterilized === data.sterilized
    );
  } else if (
    data.vaccinated === false &&
    data.dewormed === true &&
    data.sterilized === true
  ) {
    searchPet = searchPet.filter(
      (item) =>
        item.dewormed === data.dewormed && item.sterilized === data.sterilized
    );
  } else if (
    data.vaccinated === false &&
    data.dewormed === false &&
    data.sterilized === true
  ) {
    searchPet = searchPet.filter((item) => item.sterilized === data.sterilized);
  } else if (
    data.vaccinated === false &&
    data.dewormed === true &&
    data.sterilized === false
  ) {
    searchPet = searchPet.filter((item) => item.dewormed === data.dewormed);
  } else if (
    data.vaccinated === true &&
    data.dewormed === true &&
    data.sterilized === false
  ) {
    searchPet = searchPet.filter(
      (item) =>
        item.vaccinated === data.vaccinated && item.dewormed === data.dewormed
    );
  }

  // console.log(searchPet.length);
  if (searchPet.length === petArr.length) {
    // console.log(searchPet);
    renderTableData(petArr);
  } else{
    renderTableData(searchPet);
  }
};

findBtn.addEventListener("click", function (e) {
  const dataFind = {
    id: idInput.value, //p001
    name: nameInput.value, // Tom
    type: typeInput.value, // Cat or Dog

    breed: breedInput.value, // Tabby ...
    vaccinated: vaccinatedInput.checked, // true or false
    dewormed: dewormedInput.checked, // true or false
    sterilized: sterilizedInput.checked, // true or false
  };
  finding(dataFind);
});
