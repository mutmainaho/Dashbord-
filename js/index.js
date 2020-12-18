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
        const newCell = newRow.insertCell();
        newCell.innerHTML = `<div  id = ${id}0${i} class="input badge box warning" contenteditable='true'></div>`
    }
    const newCell = newRow.insertCell();
        newCell.innerHTML = `<span class="badge warning"><span class="ti-close"></span></span> ` 
    
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
const validate_row = (row) => {
    const row_num = document.getElementById(row).querySelectorAll("td")
    const last =  row_num[row_num.length - 1]
    for (let i=0; i<row_num.length-1; i++){
        const div = row_num[i].querySelector('div')
        // console.log(div.classList.item(3))
        if (div.classList.item(3) === "warning"){

           last.querySelector('span').className = "badge warning"
           last.querySelector('span').innerHTML = `<span class="ti-close"></span>`
           return
        }
        last.querySelector('span').className = "badge success"
        last.querySelector('span').innerHTML = `<span class="ti-check"></span>`
    }
}
const validate_rest = (band)=>{
    if (isNaN(band.innerText) || !band.innerText){
        band.className = "input badge box warning"
        return
    }
    band.className = "input badge box success"
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
          else{
              validate_rest(event.target)
          }
          event.stopPropagation()
        //   console.log()
          validate_row(event.target.id.slice(0,-2))
        }
    })
  }

  init()