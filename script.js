// IEFE
(() => { 
  
  // state variables
  var displayedItem = [];
  let toDoListArray = [];
  var savedObject = localStorage.getItem('saved');
  if(savedObject)
    toDoListArray = JSON.parse(savedObject);

  // ui variables
  const form  = document.querySelector("#formAll"); 
  const input = form.querySelector(".form__input");
  // const button = form.querySelector('.button')
  // const ul    = document.querySelector(".toDoList"); 
  const bring = document.querySelector("#bringItOnList");
  // const bul   = document.querySelector("#bringItOnList")
  const listItem = document.querySelector("#listItemContainer");
  const listItem2 = document.querySelector("#listItemContainer2");
  const heading   = document.querySelector('.heading')

  
  populateToDoList();


    // event listeners
  bring.addEventListener('click', e=> {
        // prevent default behaviour - Page reload
    e.preventDefault();

    var d           = new Date();
    let currentDate = (d.getTime()/(1000));
    const timeDiff  = 5; //in miliseconds

    toDoListArray.forEach(item=> {
        if( currentDate - item.createdDate >= timeDiff && !displayedItem.includes(item.itemId)){
          addItemToBringItOnList(item.itemId, item.toDoItem, item.createdDateString);
          displayedItem.push(item.itemId);
          // removeItemFromArray(item.itemId);
        }
    });
    console.log("saved");
    localStorage.setItem('saved', JSON.stringify(toDoListArray));
    
  })

  form.addEventListener('submit', e => {
    console.log("form was submitted")
    // prevent default behaviour - Page reload
    e.preventDefault();
    // give item a unique ID
    let itemId      = String(Date.now());
    var d           = new Date();
    let createdDate = (d.getTime()/(1000));
    let createdDateString = currentDate();


    // get/assign input value
    let toDoItem    = input.value;
    //pass ID and item into functions
    addItemToDOM(itemId , toDoItem, createdDateString);
    addItemToArray(itemId, toDoItem, createdDate, createdDateString);
    // clear the input box. (this is default behaviour but we got rid of that)
    input.value = '';

    console.log("saved");
    localStorage.setItem('saved', JSON.stringify(toDoListArray));


  });
  

  listItem.addEventListener('click', e => {
    e = e.path[1];
    let id = e.getAttribute('data-id')
    if (!id) return // user clicked in something else      
    //pass id through to functions
    console.log(id);
    console.log("bul event listener")

    // removeItemFromBring(id);
    // removeItemFromDOM(id);
    removeItemFromArray(id);

    // console.log("saved");
    localStorage.setItem('saved', JSON.stringify(toDoListArray));

  });

  
  listItem2.addEventListener('click', e => {
    e = e.path[1];
    // f = e.querySelector('data_id')
    // console.log(f);
    let id = e.getAttribute('data-id')
    if (!id) return // user clicked in something else      
    //pass id through to functions
    setTimeout(function(){
      removeItemFromDOM(id);
      removeItemFromArray(id);
      localStorage.setItem('saved', JSON.stringify(toDoListArray));
    },800);


  });





  // functions 
  function populateToDoList(){
      toDoListArray.forEach(item=> {
        addItemToDOM(item.itemId, item.toDoItem, item.createdDateString);
    });
    console.log("populated")
  }
  
  function currentDate(){
    var d           = new Date();
    let day         = d.getDate();
    let month       = d.getMonth() + 1;
    let year        = d.getFullYear();
    let date        = String(day);
    date = date + "/";
    date = date + String(month);
    date = date + "/" ;
    date = date + String(year);
    
    return String(date);
  }
  
  function addItemToDOM(itemId, toDoItem, createdDateString) { 
    
    htmlCode = "<label class='todo' data-id=" + itemId + "><input class='todo__state' type='checkbox' /><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 200 25' class='todo__icon'><use xlink:href='#todo__line' class='todo__line'></use><use xlink:href='#todo__box' class='todo__box'></use><use xlink:href='#todo__check' class='todo__check'></use> <use xlink:href='#todo__circle' class='todo__circle'></use></svg><div class='todo__text'>" + toDoItem +"</div></label>"
    listItem2.insertAdjacentHTML('beforeend', htmlCode);
  }


  function addItemToBringItOnList(itemId, toDoItem, createdDateString) {    

    htmlCode = "<label class='todo' data-id=" + itemId + "><input class='todo__state' type='checkbox' /><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 200 25' class='todo__icon'><use xlink:href='#todo__line' class='todo__line'></use><use xlink:href='#todo__box' class='todo__box'></use><use xlink:href='#todo__check' class='todo__check'></use> <use xlink:href='#todo__circle' class='todo__circle'></use></svg><div class='todo__text'>" + toDoItem +"</div></label>"
    listItem.insertAdjacentHTML('beforeend', htmlCode);
  }
  
  function addItemToArray(itemId, toDoItem, createdDate, createdDateString) {
    // add item to array as an object with an ID so we can find and delete it later
    toDoListArray.push({ itemId, toDoItem, createdDate, createdDateString});
    console.log(toDoListArray)
  }
  
  function removeItemFromDOM(id) {
    // get the list item by data ID
    var li = document.querySelector('[data-id="' + id + '"]');
    // remove list item
    li.remove();
  }

  function removeItemFromBring(id) {
    // get the list item by data ID
    var li = document.querySelector('[data-id="' + id + '"]');
    // remove list item
    li.remove()
  }

  function removeItemFromArray(id) {
    // create a new toDoListArray with all li's that don't match the ID
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
  }
  
  localStorage.setItem('saved', JSON.stringify(toDoListArray));

})();

