"use strict";
navAcitive();

// lấy Dom element
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");

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
const tableBodyEl = document.getElementById("tbody");

const rows = document.querySelector("tr");
//add cell BMI
const bmiCell = rows.insertCell(11);
bmiCell.scope = "col";
bmiCell.textContent = "BMI";
var newTh = document.createElement("th");
// Copy nội dung của thẻ td cũ vào thẻ th mới
newTh.innerHTML = bmiCell.innerHTML;
// Thay thế thẻ td cũ bằng thẻ th mới
bmiCell.replaceWith(newTh);

//add button calc bmi
var bmiBtn = document.createElement("button");
bmiBtn.innerHTML = "Calculate BMI";
bmiBtn.className = "btn btn-warning";
bmiBtn.type = "button";
bmiBtn.style.marginLeft = "4px";
// console.log(bmiBtn)
// Tìm button cần chèn vào sau
var btnHealthy = document.getElementById("healthy-btn");
btnHealthy.style.width = "170px";
// Chèn button mới vào sau button1
btnHealthy.parentNode.insertBefore(bmiBtn, btnHealthy.nextSibling);

let petArr = [];
let healthyPetArr = [];
let healthyCheck = false;
// let petArrUpLoad = [];

// //get data form localStorage
// if (JSON.parse(getFromStorage("uploadFile")) !== null) {
//   petArrUpLoad = JSON.parse(getFromStorage("uploadFile"));
// }
// console.log(petArrUpLoad);

if (JSON.parse(getFromStorage("KEY")) !== null) {
  petArr = JSON.parse(getFromStorage("KEY"));
}

// const nonDuplicatePetArr = petArr.filter(
//   (item1) => !petArrUpLoad.find((item2) => item2.id === item1.id)
// );
// // output: object array no Duplicate

// petArr = [...petArrUpLoad, ...nonDuplicatePetArr];
// console.log(petArr)
// // save data after filter Duplicate
// saveToStorage("KEY", JSON.stringify(petArr));

// choose breed with type
let breedArr;
if (JSON.parse(getFromStorage("breedArr")) !== null) {
  breedArr = JSON.parse(getFromStorage("breedArr"));
}
let typePet;
// if type pet change => breed pet load
typeInput.addEventListener("change", function () {
  // Xử lý khi giá trị của select thay đổi
  typePet = typeInput.value;
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.text = `Select Breed`;
  breedInput.appendChild(option);
  const renderBreed = (breedArr) => {
    breedArr = breedArr
      //filter follow with type onchange
      .filter((breed) => breed.type === `${typePet}`)
      .forEach((element) => {
        const option = document.createElement("option");
        option.text = element.name;
        breedInput.appendChild(option);
      });
  };
  renderBreed(breedArr);
});

// console.log(petArr);
//
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  // let lastElement = petArr[petArr.length - 1]

  // tung phan tu trong mang petArrm
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

    // // add BMI
    const bmiCell = document.createElement("td");

    if (petArr[i].bmiValue === undefined) {
      bmiCell.textContent = `?`;
    } else {
      bmiCell.textContent = petArr[i].bmiValue;
    }

    row.appendChild(bmiCell);

    // date added
    const dateCell = document.createElement("td");
    dateCell.textContent = `${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}`;
    row.appendChild(dateCell);

    //button delete
    const deleteCell = document.createElement("td");
    const btnDeleteElement = document.createElement("button");
    btnDeleteElement.className = `btn btn-danger`;
    btnDeleteElement.addEventListener("click", function () {
      deletePet(`${petArr[i].id}`);
    });
    btnDeleteElement.textContent = `Delete`;
    deleteCell.appendChild(btnDeleteElement);
    row.appendChild(deleteCell);
    //
    tableBodyEl.appendChild(row);
  }
  ////////////////////////////////////////////////////////////////////////
  //   saveToStorage('data', petArr)
}
renderTableData(petArr);

const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    // console.log(petArr[i].id, petId)
    // console.log(petArr[i], 'phan tu petArr')
    // petArr = petArr.filter(item => item !== petArr[i]);
    petArr = petArr.filter(function (element) {
      return element.id !== petId;
    });
    saveToStorage("KEY", JSON.stringify(petArr));
    // console.log(healthyCheck)//true render healthy
    if (healthyCheck === false) {
      renderTableData(petArr);
    } else {
      healthyPetArr = healthyPetArr.filter(function (element) {
        return element.id !== petId;
      });
      renderTableData(healthyPetArr);
    }
  }
};

// const timeSubmit = () => {
//   const curDay = new Date();
//   const timeSubmit = `${curDay.getDate()}/${
//     curDay.getMonth() + 1
//   }/${curDay.getFullYear()}`;
//   return timeSubmit;
// };

// function calc BMI
const bmi = (petArr) => {
  var x = 0;
  // lặp array chứa pet return type pet => type bmi
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      x = 703;
    } else {
      x = 886;
    }
    // them  bmiValue vao object petArr
    petArr[i].bmiValue = (
      (petArr[i].weight * x) /
      petArr[i].length ** 2
    ).toFixed(2);
    console.log(petArr);
  }
};

// function reset input
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

// click btn submit => get value input form
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
    date: new Date(),
    // date: new Date,
  };

  //function validateData kiem tra input
  const validateData = (data, petArr) => {
    // console.log(petArr.length, 'length petArr in f')
    const self = data; // gan object data qua bien self

    let checkIdUnique = true;

    //check id empty
    if (self.id === "") {
      alert("Please input ID Form!");
    }
    //no empty => check unique
    if (self.id !== "") {
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id === self.id) {
          checkIdUnique = false;
          break;
        }
      }
      if (checkIdUnique == false) {
        alert("Please input another Pet ID!");
      }
    }
    if (self.id !== "" && checkIdUnique == true) {
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
      // check type | output true or false
      let checkType = false;
      if (self.type === "Select Type") {
        alert(`Please select Type!`);
      } else {
        checkType = true;
      }
      //output true or false
      let checkWeight = false;
      if (self.weight >= 1 && self.weight <= 15) {
        checkWeight = true;
      } else {
        alert(`Please input Weight Form! \nWeight must be between 1 and 15!`);
        checkWeight = false;
      }
      //output true or false
      let checkLength = false;
      if (self.length >= 1 && self.length <= 100) {
        checkLength = true;
      } else {
        alert(`Please input Length Form! \nLength must be between 1 and 100!`);
        checkLength = false;
      }
      //output true or false
      let checkBreed = false;
      if (self.breed === "Select Breed") {
        alert(`Please select Breed!`);
      } else {
        checkBreed = true;
      }
      // check true => input value validate => push data to petArr
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
    }
  };
  // xoa truong bmi value khi click submit
  // for (let i = 0; i < petArr.length; i++) {
  //     delete petArr[i].bmiValue;
  // }

  const validate = validateData(data, petArr); //output true or false
  // check true => input value validate => push data to petArr
  if (validate) {
    petArr.push(data);
    saveToStorage("KEY", JSON.stringify(petArr));

    // console.log('pushed data');
    clearInput();
    renderTableData(petArr);

    // moi lan render se hien thanh show healthy pet
    healthyCheck = false;
    healthyBtn.textContent = "Show Healthy Pet";
  }
};

// bat su kien click button submit
submitBtn.addEventListener("click", () => {
  clickBtnSubmit();
  // console.log(petArr);
});

// bat su kien click button show Healthy Pet
healthyBtn.addEventListener("click", function (e) {
  if (healthyCheck) {
    healthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
    healthyCheck = false;
    // console.log('hihi')
  } else {
    //false
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
    // console.log('haha')
    //filter pet in petArr when vaccinated dewormed sterilized true
    healthyPetArr = petArr.filter(function (element) {
      return (
        element.vaccinated === true &&
        element.dewormed === true &&
        element.sterilized === true
      );
    });
    renderTableData(healthyPetArr);
  }
});

// bat su kien click button calc BMI
bmiBtn.addEventListener("click", function () {
  bmi(petArr);
  // console.log(healthyCheck)
  if (healthyCheck === false) {
    renderTableData(petArr);
  } else renderTableData(healthyPetArr);
});

////////////////////////////////////////////////////////////////////////
