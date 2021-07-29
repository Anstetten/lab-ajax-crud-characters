const charactersAPI = new APIHandler('http://localhost:8000');

const characterTest={
  "id": 5,
  "name": "Superman",
  "occupation": "saves lives",
  "weapon": "Gotham",
  "cartoon": true
}

const characterCardTemplate = document.getElementById("character-card");
const charContainer= document.getElementsByClassName("characters-container")[0];
const inputId = document.querySelector(".operation>input");

const inputIdDelete = document.querySelector(".operation.delete>input");
const deleteButton = document.getElementById("delete-one");
const creationForm = document.getElementById("new-character-form");
const createButton = creationForm.querySelector("button");

const updateForm = document.getElementById("edit-character-form");
const updateButton = updateForm.querySelector("button");

//To fill up a character Card with the info of the character
//Would have been easier with template
function fillCharacterCard(character){
  let characterInfo = document.createElement("div");
  characterInfo.classList.add("character-info");

  
  let id = document.createElement("div");
  id.classList.add("id");
  id.innerHTML = `Character ID <span>${character.id}</span>`;

  let name = document.createElement("div");
  name.classList.add("name");
  name.innerHTML = `Character Name <span>${character.name}</span>`;


  let occupation = document.createElement("div");
  occupation.classList.add("occupation");
  occupation.innerHTML = `Character Occupation <span>${character.occupation}</span>`;

  let cartoon = document.createElement("div");
  cartoon.classList.add("cartoon");
  cartoon.innerHTML = `Is a Cartoon? <span>${character.cartoon}</span>`;

  let weapon = document.createElement("div");
  weapon.classList.add("weapon");
  weapon.innerHTML = `Character Weapon <span>${character.weapon}</span>`;

  characterInfo.appendChild(id);
  characterInfo.appendChild(name);
  characterInfo.appendChild(occupation);
  characterInfo.appendChild(cartoon);
  characterInfo.appendChild(weapon);

  return characterInfo;
  
}

//Update characterList
function updateCharacterList(){
  charactersAPI.getFullList()
  .then((characterList)=>{
    charContainer.innerHTML="";
    characterList.data.forEach((character)=>{
      charContainer.appendChild(fillCharacterCard(character));
    });
  })
  .catch ((error)=> console.log(error));
}

window.addEventListener('load', () => {

//Fetch all
document.getElementById('fetch-all').addEventListener('click', function (event) {
  updateCharacterList();
});


//Fetch one
document.getElementById('fetch-one').addEventListener('click', function (event) {
    let fetchID=inputId.value;
    charactersAPI.getOneRegister(fetchID)
      .then((fetchedChar)=>{
        charContainer.innerHTML="";
        charContainer.appendChild(fillCharacterCard(fetchedChar.data));
      })
      .catch((error)=>{console.log(error)});
});



//delete One
  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault();
    let deleteID=inputIdDelete.value;
    charactersAPI.deleteOneRegister(deleteID)
      .then(()=>{
        updateCharacterList();
        deleteButton.style.backgroundColor='green';
      })
      .catch((error)=>{
        console.log(error);
        deleteButton.style.backgroundColor='red';
        
      });

  });

//Edit character
  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let idInput = updateForm.querySelector("input[name='chr-id']");
    let nameInput = updateForm.querySelector("input[name='name']");
    let occupationInput = updateForm.querySelector("input[name='occupation']")
    let weaponInput = updateForm.querySelector("input[name='weapon']")
    let cartoonInput = updateForm.querySelector("input[name='cartoon']")

    let id = idInput.value
    let name = nameInput.value;
    let occupation = occupationInput.value;
    let weapon = weaponInput.value;
    let cartoon = cartoonInput.checked;

    let updatedCharacter= {name,occupation,weapon,cartoon};

    charactersAPI.updateOneRegister(id, updatedCharacter)
      .then(()=>{
        updateButton.style.backgroundColor='green';
        updateCharacterList();
    })
      .catch((error)=>{
        console.log(error);
        updateButton.style.backgroundColor='red';
      })

  });

  //create character
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(creationForm);

    let nameInput = creationForm.querySelector("input[name='name']");
    let occupationInput = creationForm.querySelector("input[name='occupation']")
    let weaponInput = creationForm.querySelector("input[name='weapon']")
    let cartoonInput = creationForm.querySelector("input[name='cartoon']")

    let name = nameInput.value;
    let occupation = occupationInput.value;
    let weapon = weaponInput.value;
    let cartoon = cartoonInput.checked;

    let newCharacter= {name,occupation,weapon,cartoon};

    charactersAPI.createOneRegister(newCharacter)
      .then(()=>{
        createButton.style.backgroundColor='green';
        updateCharacterList();
    })
      .catch((error)=>{
        console.log(error);
        createButton.style.backgroundColor='red';
      });

  });
});
