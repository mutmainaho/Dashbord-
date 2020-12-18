console.log('hello')

const table = document.querySelector("tbody")

const bands = ['A','B','C','D','E']


const set_id = (row) =>{
    const id = row.id
    const columns = row.querySelectorAll('td')
    for (let i=0; i<columns.length-1;i++){
        columns[i].querySelector('div').id = id +'0' +i
    }
}

const addrow = () =>{

    var div = document.createElement('div')
    div.className = 'input'
    div.contenteditable = "true"
    let id = table.querySelectorAll('tr').length 
    

    var newRow = table.insertRow();
    newRow.id = id 
    for (let i =0; i<=11; i++){
        var newCell = newRow.insertCell();
        newCell.innerHTML = `<div  id = ${id}0${i} class='input' contenteditable='true'></div>`
    }
    
    
}


const validate_band = (band) =>{
    console.log(band.innerText)
    if (isNaN(band.innerText) && bands.includes(band.innerText)){
        band.className = "input badge box success"
        return
    }
    band.className = "input badge box warning"
}

const validate_first_3 = (band) =>{

    if (isNaN(band.innerText) && band.innerText){
        band.className = "input badge box success"
        return
    }
    band.className = "input badge box warning"
}

function init() {
    document.addEventListener("click", function(event) {
        if (event.target.id === "add-icon-svg"){
            addrow();
            event.stopPropagation()
        }
    });
    document.addEventListener('keyup', function(event){
        if (event.target.classList.item(0) === 'input'){
            const value = event.target.id
            const id = parseInt(value.slice(-2,value.length+1))
            
          if (id <3 ){
            validate_first_3(event.target)
          }
          else if (id == 3){
            validate_band(event.target)     
          }
          event.stopPropagation()
        }
    })
  }

  init()