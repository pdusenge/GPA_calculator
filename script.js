const assignmentName = document.getElementById("assignmentName");
const assignmentGrade = document.getElementById("assignmentGrade");
const addButton = document.getElementById("addButton");
const gpaDisplay = document.getElementById("gpa");
const assignmentList = document.getElementById("assignmentList");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

function updateGPA() {
  const total = entries.reduce((sum, item) => sum + item.grade, 0);
  const gpa = entries.length ? (total / entries.length).toFixed(2) : "0.00";
  gpaDisplay.textContent = gpa;
}

function renderList() {
  assignmentList.innerHTML = "";
  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.grade}/5`;
    assignmentList.appendChild(li);
  });
}

function saveToLocalStorage() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

addButton.addEventListener("click", () => {
  const name = assignmentName.value.trim();
  const grade = parseFloat(assignmentGrade.value);

  if (!name || isNaN(grade) || grade < 0 || grade > 5) {
    alert("Enter valid name and grade (0–5).");
    return;
  }

  entries.push({ name, grade });
  updateGPA();
  renderList();
  saveToLocalStorage();

  assignmentName.value = "";
  assignmentGrade.value = "";
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === 's') {
    console.log(entries);
  }
});


updateGPA();
renderList();
