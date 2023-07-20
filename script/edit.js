"use strict";
//animation navbar
navAcitive();

const tableBodyEl = document.getElementById("tbody");
const submitBtn = document.getElementById("submit-btn");
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

// document.getElementById("container-form").classList.remove("hide");

let petArr;
if (JSON.parse(getFromStorage("KEY")) !== null) {
  petArr = JSON.parse(getFromStorage("KEY"));
}
renderTableData(petArr); //render table before get data from local storage

const clearInput = () => {
  idInput.value = ""; //p001
  nameInput.value = ""; // Tom
  ageInput.value = ""; //3
  typeInput.value = "Select Type"; // Cat or Dog
  weightInput.value = ""; // 1 or 2... + 'kg'
  lengthInput.value = ""; // 50 or 60 ... + 'cm'
  breedInput.value = "Select Breed"; // Tabby ...
  colorInput.value = "#000000"; // ????
  vaccinatedInput.checked = false; // true or false
  dewormedInput.checked = false; // true or false
  sterilizedInput.checked = false; // true or false
};

//get databreed from local storage
let breedArr = [];
if (JSON.parse(getFromStorage("breedArr")) !== null) {
  breedArr = JSON.parse(getFromStorage("breedArr"));
}

// render breed before get data from local storage
// breedInput.innerHTML = "";
// const option = document.createElement("option");
// option.text = `Select Breed`;
// breedInput.appendChild(option);
// const renderBreed = (breedArr) => {
//   breedArr = breedArr.forEach((element) => {
//     const option = document.createElement("option");
//     option.text = element.name;
//     breedInput.appendChild(option);
//   });
// };
// renderBreed(breedArr);

//render table petArr
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

    //button EDIT
    const deleteCell = document.createElement("td");
    const btnElement = document.createElement("button");
    btnElement.className = `btn btn-warning`;
    // when click btn EDIT =>> edit and display form input
    btnElement.addEventListener("click", function () {
      if (confirm("Are you sure?")) {
        editPet(`${petArr[i].id}`);
      }
    });
    btnElement.textContent = `Edit`;
    deleteCell.appendChild(btnElement);
    row.appendChild(deleteCell);

    //
    tableBodyEl.appendChild(row);
  }
  ////////////////////////////////////////////////////////////////////////
  //   saveToStorage('data', petArr)
}

const editPet = (petId) => {
  // Confirm before deletePet
  // if (confirm("Are you sure?")) {
  let petEdit;
  petEdit = petArr.filter((item) => item.id === petId); //get pet EDIT in petArr

  // display input form
  document.getElementById("container-form").classList.remove("hide");

  //render breed follow type of petEdit output: type Cat=> breed Cat | type Dog => breed Dog
  let breedArr = [];
  if (JSON.parse(getFromStorage("breedArr")) !== null) {
    breedArr = JSON.parse(getFromStorage("breedArr"));
  }
  // console.log(petEdit[0].type)
  let typePet = petEdit[0].type;
  breedInput.innerHTML = "";

  const option = document.createElement("option");
  option.text = `Select Breed`;
  breedInput.appendChild(option);
  //type breed change for type pet
  const renderBreed = (breedArr) => {
    breedArr = breedArr
      .filter((breed) => breed.type === `${typePet}`)
      .forEach((element) => {
        const option = document.createElement("option");
        option.text = element.name;
        breedInput.appendChild(option);
      });
  };
  renderBreed(breedArr); //

  //display value for input form
  idInput.value = petEdit[0].id;
  nameInput.value = petEdit[0].name;
  ageInput.value = petEdit[0].age;
  typeInput.value = petEdit[0].type;
  weightInput.value = petEdit[0].weight;
  lengthInput.value = petEdit[0].length;
  breedInput.value = petEdit[0].breed;
  // console.log(typeof (petEdit[0].breed))
  if (petEdit[0].vaccinated) vaccinatedInput.checked = true;
  else vaccinatedInput.checked = false;
  if (petEdit[0].dewormed) dewormedInput.checked = true;
  else dewormedInput.checked = false;
  if (petEdit[0].sterilized) sterilizedInput.checked = true;
  else sterilizedInput.checked = false;

  // breed pet change when type pet change
  typeInput.addEventListener("change", function () {
    // Xử lý khi giá trị của select thay đổi
    typePet = typeInput.value;
    breedInput.innerHTML = "";
    const option = document.createElement("option");
    option.text = `Select Breed`;
    breedInput.appendChild(option);
    //type breed change for type pet
    const renderBreed = (breedArr) => {
      breedArr = breedArr
        .filter((breed) => breed.type === `${typePet}`)
        .forEach((element) => {
          const option = document.createElement("option");
          option.text = element.name;
          breedInput.appendChild(option);
        });
    };
    renderBreed(breedArr);
  });
};

//get data when click submit input form
const clickBtnSubmit = () => {
  const data = {
    id: idInput.value, //p001
    name: nameInput.value, // Tom
    age: parseInt(ageInput.value), //3
    type: typeInput.value, // Cat or Dog
    weight: weightInput.value, // 1 or 2... + 'kg'
    length: lengthInput.value, // 50 or 60 ... + 'cm'

    breed: breedInput.value, // Tabby ...
    color: colorInput.value, // ????
    vaccinated: vaccinatedInput.checked, // true or false
    dewormed: dewormedInput.checked, // true or false
    sterilized: sterilizedInput.checked, // true or false
    // date: timeSubmit(),
    date: new Date(),
  };

  //function validateData kiem tra input
  const validateData = (data, petArr) => {
    const self = data; // gan object data qua bien self

    //Check Name
    let checkName = false;
    if (self.name === "") {
      alert("Please input Name Form!");
    } else {
      checkName = true;
    }

    // check Age
    let checkAge = false;
    if (self.age >= 1 && self.age <= 15) {
      checkAge = true;
    } else {
      alert(`Please input Age Form! \nAge must be between 1 and 15!`);
      checkAge = false;
    }
    //
    let checkType = false;
    if (self.type === "Select Type") {
      alert(`Please select Type!`);
    } else {
      checkType = true;
    }
    //
    let checkWeight = false;
    if (self.weight >= 1 && self.weight <= 15) {
      checkWeight = true;
    } else {
      alert(`Please input Weight Form! \nWeight must be between 1 and 15!`);
      checkWeight = false;
    }
    //
    let checkLength = false;
    if (self.length >= 1 && self.length <= 100) {
      checkLength = true;
    } else {
      alert(`Please input Length Form! \nLength must be between 1 and 100!`);
      checkLength = false;
    }
    //
    let checkBreed = false;
    if (self.breed === "Select Breed") {
      alert(`Please select Breed!`);
    } else if (self.breed === "") {
      alert(`Please select Breed!`);
    } else {
      checkBreed = true;
    }

    if (
      checkName &&
      checkAge &&
      checkType &&
      checkWeight &&
      checkLength &&
      checkBreed
    ) {
      return true;
    } else {
      return false;
    }
    //Giá trị ID không được trùng với các thú cưng còn lại.
  };
  const validate = validateData(data, petArr);

  if (validate) {
    const index = petArr.findIndex((element) => element.id === data.id);
    if (index !== -1) {
      petArr[index] = data;
    }
    // click submit and validate success => edit success => hide input form
    document.getElementById("container-form").classList.add("hide");
    alert("Edit Success!");
    saveToStorage("KEY", JSON.stringify(petArr));

    clearInput();
    renderTableData(petArr);
  }
};
submitBtn.addEventListener("click", () => {
  clickBtnSubmit();
  saveToStorage("KEY", JSON.stringify(petArr));
});
////
