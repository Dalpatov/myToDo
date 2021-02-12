//ToDOshnik
let mainArr = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = "";
let addTasks = null;
let indexEdit = -1;

window.onload = function init(){
    addTasks = document.getElementById('add-tasks');
    addTasks.addEventListener('change',updateValue);
    render();

 
}

onClick=()=>{
 mainArr.push({
    text: valueInput,
    isCheck: false
});
localStorage.setItem('tasks', JSON.stringify(mainArr));
  valueInput = "";
  addTasks.value = "";
 render();
}
updateValue = (event)=>{
    valueInput = event.target.value;  //то что нуходится в инпуте
}

render = () =>{
    let content = document.getElementById("content-page");       // компонент в который добавляеться все
      while(content.firstChild){                                   // что бы начать отрисовку всех элеементов необходима очистить все его старые данные
        content.removeChild(content.firstChild);                 //если есть хотя бы 1 дочерний элемент , ремувим его пока, чайлдов не останется
      }

    mainArr.map((item, index) => {
        let container = document.createElement("div");           //контейнер с нашим таском
        container.id = `task - ${index}`;                        //уникальный идентификатор и его индекс
        container.className = 'task-container';                  // добавляем контейнеру класс ,что бы чекбокс и текст стояли в 1 линии

        let checkbox = document.createElement('input');          // наш инпут чекбокс
        checkbox.type = 'checkbox';                              // тип чекбокса
        checkbox.checked = item.isCheck;                         // выполнен ли наш чек ,чи нет
        checkbox.onchange = function (){
            onChangeCheckbox(index);        // при нажатии на чек изменяем его свойство 
        }
        container.appendChild(checkbox);                         //добавляем наш чек в контаинер 

      if (indexEdit === index){
        let inp = document.createElement('input');
        inp.value = item.text;                                    //изначальное значение инпута ,будет равно значению из текста
        inp.addEventListener('change',updateTextTask);            //вешаем слушателя на инпут
        container.appendChild(inp);  
        content.appendChild(container);
             
      }else{
        let text = document.createElement('p');                 // сам наш текст
        text.innerText = item.text;  
        console.log();                           // добавляем в текст название нашей задачи
        text.className = item.isCheck ? 'text-task done-text': 'text-task';    //просматриваем таск и его чек 
        container.appendChild(text);     //добавляем полученный текст в контейнер
        content.appendChild(container);  // в главный компонент добавляет текст контэйнер
      }

      if(indexEdit === index){
        let imageSave = document.createElement('img');
        imageSave.src = "https://image.flaticon.com/icons/png/512/61/61807.png";
        imageSave.className = "but";
        container.appendChild(imageSave);
        imageSave.onclick = function(){
        saveOnClick(index);
      };
      
                
      }else{
        let imageEdit = document.createElement('img');
        imageEdit.src = "https://image.flaticon.com/icons/png/512/61/61456.png";
        imageEdit.className = "but";
        container.appendChild(imageEdit);
        imageEdit.onclick = function(){
        editOnClick(index);
      }

      }            
        let imageDelete = document.createElement('img');
        imageDelete.src = "https://image.flaticon.com/icons/png/512/61/61848.png";
        imageDelete.className = "but";
        container.appendChild(imageDelete);
        imageDelete.onclick = function(){
        delOnClick(index);
        }
       container.appendChild(imageDelete);
    });
}
onChangeCheckbox = (index) =>{
  mainArr[index].isCheck = !mainArr[index].isCheck;               //взяли текущее значение из(text:true) и изменили на противоположное
  localStorage.setItem('tasks', JSON.stringify(mainArr));
  render();
}

delOnClick = (index) =>{
  mainArr.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(mainArr)); 
  render(); 
}

editOnClick = (index) =>{
  indexEdit = index;
  localStorage.setItem('tasks', JSON.stringify(mainArr));
  render()
}

updateTextTask = (event)=>{
   mainArr[indexEdit].text = event.target.value; 
   localStorage.setItem('tasks', JSON.stringify(mainArr));
   render();
}

saveOnClick = () =>{
  indexEdit = -1;
  localStorage.setItem('tasks', JSON.stringify(mainArr));
  render()
}