console.log('hello')

const table = document.querySelector("tbody")

const validateAll = () =>{
    allRow = document.getElementsByClassName('badge warning valid')
    if (allRow.length){
        return (allRow[0].id)
    }
    return true

}

const getData = () => {
    const row = validateAll()
    const div = document.createElement('div')

    
    if ( row == 'true' ){
        alert(`invalid data at row ${row}`)
        return
    }
    
    div.innerHTML = document.getElementById('table')
    export_table_to_csv(div, "table.csv");
}

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}

function export_table_to_csv(html, filename) {
	var csv = [];
	var rows = document.querySelectorAll("table tr");
	
    for (var i = 1; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length -2; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}

    // Download CSV
    download_csv(csv.join("\n"), filename);
}




const deleteRow = (row) => {
    console.log(row)
    document.getElementById('table').deleteRow(row)    
}

const addRow = () =>{
    var newRow = table.insertRow();
    const id = newRow.rowIndex
    for (let i =0; i<=11; i++){
        const newCell = newRow.insertCell();
        newCell.innerHTML = `<div  id = ${id}0${i} class="input badge box warning" contenteditable='true'></div>`
    }
    const newCell = newRow.insertCell();
    newCell.innerHTML = `<span id=${id} class="badge warning valid"><span class="ti-close"></span></span> ` 
    
    newRow.insertCell().innerHTML = `<span id=${id} class="bin"><span id="trash" class="ti-trash"></span></span>` 
}


const validateFedderBand = (band) =>{
    const bands = ['A','B','C','D','E']
    console.log(band.innerText)
    if (isNaN(band.innerText) && bands.includes(band.innerText)){
        band.className = "input badge box success"
        return
    }
    band.className = "input badge box warning"
}

const validateFirstThreeColumns = (band) =>{

    if (isNaN(band.innerText) && band.innerText){
        band.className = "input badge box success"
        return
    }
    band.className = "input badge box warning"
}
const validateRow = (row) => {
    const row_num = document.getElementById(row).querySelectorAll("td")
    const last =  row_num[row_num.length - 2]
    for (let i=0; i<row_num.length-2; i++){
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
const validateOthers = (band)=>{
    if (isNaN(band.innerText) || !band.innerText){
        band.className = "input badge box warning"
        return
    }
    band.className = "input badge box success"
}

function init() {
    document.addEventListener("click", function(event) {
        if (event.target.id === "add-icon-svg"){
            addRow();
            event.stopPropagation()
        }
        else if (event.target.id === "trash"){
            deleteRow(event.target.parentNode.parentNode.parentNode.rowIndex)
        }
        else if (event.target.id === "export"){
            getData()
        }
    });
    document.addEventListener('keyup', function(event){
        if (event.target.classList.item(0) === 'input'){
            const value = event.target.id
            const id = parseInt(value.slice(-2,value.length+1))
            
          if (id <3 ){
            validateFirstThreeColumns(event.target)
          }
          else if (id == 3){
            validateFedderBand(event.target)     
          }
          else{
              validateOthers(event.target)
          }
          event.stopPropagation()
        //   console.log()
          validateRow(event.target.id.slice(0,-2))
        }
    })
  }

  init()