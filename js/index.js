console.log('hello')

const table = document.querySelector("tbody")

const bands = ['A','B','C','D','E']


const set_id = (row) =>{
    const id = row.id
    const columns = row.querySelectorAll('td')
    for (let i=0; i<columns.length-1;i++){
        columns[i].querySelector('div').id = id + i
    }
}

const addrow = () =>{
    let rows = table.querySelectorAll('tr')
    let lastRow = rows[rows.length -1]
    const id = lastRow.id
    
    console.log(lastRow.id)
    // temp.id = parseInt(new_id)+1
    table.innerHTML += lastRow.innerHTML

    rows = table.querySelectorAll('tr')
    lastRow = rows[rows.length -1]
    lastRow.id = parseInt(id) + 1
    set_id(lastRow)
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
    document.getElementById('add-icon-svg').addEventListener("click", function(event) {
        // console.log('clicked');
        addrow();
    });
    document.querySelectorAll('td').forEach(e => e.addEventListener('keyup', function(event){
        const value = event.target.id
      const id = parseInt(value.slice(-2,value.length+1))
    
      if (id <3 ){
        validate_first_3(event.target)
      }
      else if (id == 3){
        validate_band(event.target)     
      }
    //   else if (id>=4 && id<=11){
            
    //   }
    }))
  }

  init()