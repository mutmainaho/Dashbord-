console.log('hello')

const table = document.querySelector("tbody")



const addrow = () =>{
    const rows = table.querySelectorAll('tr')
    const lastRow = rows[rows.length -1]
    table.innerHTML += lastRow.innerHTML
}


function init() {
    document.getElementById('add-icon-svg').addEventListener("click", function(event) {
        console.log('clicked');
        addrow();
    });
  }

  init()