function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener("click", () => {deleteEmployee(item.id)})
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => alert(error))
}

function createEmployee(e) {
  e.preventDefault();

  let name = document.getElementById("name");
  let id = document.getElementById("id");

  if (!name.value || !id.value) {
    alert("Please fill in both name and ID fields");
    return;
  }

  let params = { name: name.value, id: id.value };

  fetch("http://localhost:3000/api/v1/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {throw err;})
      }
      return response.json();
    })
    .then(fetchEmployees)
    .catch(error => alert(error.detail || "Could not create employee."));

  name.value = "";
  id.value = "";
}

function deleteEmployee(id){
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {throw err;})
    }
    return response.json();
  })
  .then(fetchEmployees)
  .catch(error => alert(error.detail || "Could not create employee."));
}

document.addEventListener("DOMContentLoaded", () => {
    let submitButton = document.getElementById("addEmployee");
    submitButton.addEventListener("click", createEmployee);
})


fetchEmployees()
