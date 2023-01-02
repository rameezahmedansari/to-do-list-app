// getting element by dom
const addTaskBtn = document.getElementById("addTask");
const btnText = addTaskBtn.innerText;
const tasksTextField = document.getElementById("tasks");
const displayRecords = document.getElementById("records");

// declaring empty array for tasks
let tasksArray = [];

// setting id to null
let edit_id = null;

// for getting data from local storage
let objStr = localStorage.getItem("tasks");
if (objStr != null) {
  // if data get from local storage is not null then parse the json file and save it to array
  tasksArray = JSON.parse(objStr);
}

DisplayInfo(); // function to diaplay all the tasks

addTaskBtn.onclick = () => {
  const task = tasksTextField.value;

  if (edit_id != null) {
    // for edit

    tasksArray.splice(edit_id, 1, { task: task });
    // setting edit_id to null because if we not set it to null it will add new task to the array
    edit_id = null;
  } else {
    // for insert
    tasksArray.push({ task: task });
  }

  SaveInfo(tasksArray); // again saving data to array
  tasksTextField.value = ""; // after adding to clear the input field
  addTaskBtn.innerText = btnText; // again set add button text to default
};

function SaveInfo(tasksArray) {
  let str = JSON.stringify(tasksArray); // making our array in string form and saving it to str.
  localStorage.setItem("tasks", str); // writing data to local storage
  DisplayInfo();
}

function DisplayInfo() {
  let statement = "";
  tasksArray.forEach((task, i) => {
    // i is the index, and task is key .
    statement += `<tr>
         <th scope="row">${i + 1}</th>
         <td>${task.task}</td>
         <td><i class="btn text-white btn-info fa fa-edit mx-2" onclick="EditInfo(${i})"></i><i
                 class="btn   text-white btn-danger fa fa-trash" onclick="DeleteInfo(${i})"></i></td>
     </tr>`;
  });
  displayRecords.innerHTML = statement; // setting innerHTML for displaying records
}

function EditInfo(id) {
  edit_id = id;
  tasksTextField.value = tasksArray[id].task;
  addTaskBtn.innerText = "Save Changes";
}

function DeleteInfo(id) {
  tasksArray.splice(id, 1); // it will delete 1 item at or from the given index.
  SaveInfo(tasksArray);
}
