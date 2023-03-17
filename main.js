  const todosArray = JSON.parse(localStorage.getItem('todos')) || [];
  let input = document.getElementById('task-input');
  let addButton = document.getElementById('add-button');
  console.log(todosArray)

  addButton.addEventListener('click', () => {
    addItem(input);

    const task = input.value;
      if (!task) {
        alert('Please fill in the space')
      return;
    }

  })
  
  function displayItems() {
    let items = ''
    for(let i = 0; i < todosArray.length; i++){
      items +=   `<div id="tasks">
                  <div class="task">
                      <div class="content">
                          <textarea disabled>${todosArray[i]}</textarea> 
                      </div>
                      <div class="action">
                          <button class="edit">Edit</button>
                          <button class="delete">Delete</button>
                      </div>
                      <div class="update">
                          <button class="save">Save</button>
                          <button class="cancel">Cancel</button>
                      </div>
                  </div> 
                  </div>`
                  
    }
    document.getElementById('to-do-list').innerHTML = items 
    startDeleteListenters()
    startEditListenters()
    startSaveListenters()
    startCancelListenters()
  }

  function startDeleteListenters(){
    let deleteBtn = document.querySelectorAll('.delete');
    deleteBtn.forEach((db, i) => {
      db.addEventListener('click', () => { deleteItem(i)})
    })
  }

  function startEditListenters(){
    const editBtn = document.querySelectorAll(".edit")
    const updateTab = document.querySelectorAll(".update")
    const inputs = document.querySelectorAll(".content textarea")
    editBtn.forEach((eB, i) => {
      eB.addEventListener("click", () => { 
        updateTab[i].style.display = "block"
        inputs[i].disabled = false })
        
    })
  }

  function startSaveListenters(){
    const saveBtn = document.querySelectorAll('.save')
    const inputs = document.querySelectorAll(".content textarea")
    saveBtn.forEach((sB, i) => {
      sB.addEventListener('click', () => {
        updateItem(inputs[i].value, i)
      })
    })
  }

  function startCancelListenters(){
    const cancleBtn = document.querySelectorAll('.cancel')
    const updateTab = document.querySelectorAll(".update")
    const inputs = document.querySelectorAll(".content textarea")
    cancleBtn.forEach((cb, i) => {
      cb.addEventListener('click', () => {
        updateTab[i].style.display = 'none'
        inputs[i].disabled = true;
      })
    })
  }

  function updateItem(text, i){
    todosArray[i] = text
    localStorage.setItem('todos', JSON.stringify(todosArray))
    location.reload();
  }

  function deleteItem(i){
    todosArray.splice(i, 1)
    localStorage.setItem('todos', JSON.stringify(todosArray))
    location.reload()
  }

  function addItem(item){
    todosArray.push(item.value)
    localStorage.setItem('todos', JSON.stringify(todosArray))
    location.reload()
  }



  todosArray.splice(0, todosArray.length, ...todosArray.reverse());

  window.onload = function(){
    displayItems()
  }

