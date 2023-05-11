let candynameInput=document.getElementById('candyname');
let descriptionInput=document.getElementById('description');
let priceInput=document.getElementById('price');
let quantityInput=document.getElementById('quantity');
let adddata=document.getElementById('adddata');

const saveData= async(e)=>{
    e.preventDefault();
    
    if( candynameInput.value=="" || descriptionInput.value ==""  || priceInput.value == "Choose Category" || quantityInput.value ==""   )
    {
        
        window.alert('Please Enter All fields');
    }

    else{

        let obj={
            candyname:candynameInput.value,
            description:descriptionInput.value,
            price:priceInput.value,
            quantity: quantityInput.value
    
        }
        try{

            let response= await axios.post('http://localhost:3000/add-candy',obj)
             
                 console.log(response);
               showDataOnScreen(response.data.newecandy);  
        }
        catch(err){
            console.log(err);
        }
        
    }
}

adddata.addEventListener('click',saveData);

window.addEventListener('DOMContentLoaded',async ()=>{

    try{

       let response= await axios.get('http://localhost:3000/candy/load-data')
       
            console.log(response);
            for(let i=0;i<response.data.allData.length;i++){
                showDataOnScreen(response.data.allData[i]);
            }
    }
    catch(err){
        console.log(err);
    }
    
})


function showDataOnScreen(obj){
    console.log(obj);
    let parent=document.getElementById('tablebody');
    let childHTML=` <tr  id=${obj.id}>
                 
    <td>${obj.candyname}</td>
    <td>${obj.description}</td>
    <td>${obj.price}</td>
    <td>${obj.quantity}</td>
    <td><button id='${obj.id}-buy1' class="editbtn">Buy1</button><button id='${obj.id}-buy2' class="editbtn">Buy2</button><button id='${obj.id}-buy3' class="editbtn">Buy3</button></td>
    
    </tr>`;
    parent.innerHTML+=childHTML;
    candynameInput.value="",
    descriptionInput.value="",
    priceInput.value="",
    quantityInput.value="";

    document.getElementById(`${obj.id}-buy1`).addEventListener('click', () => buyOne(obj.id));
    document.getElementById(`${obj.id}-buy2`).addEventListener('click', () => buyTwo(obj.id));
    document.getElementById(`${obj.id}-buy3`).addEventListener('click', () => buyThree(obj.id));
}


async function buyOne(id) {
    const candyRow = document.getElementById(id);
    const quantityCell = candyRow.children[3];
    const nameCell=candyRow.children[0];
    const descriptionCell=candyRow.children[1];
    const priceCell=candyRow.children[2];
    let quantity = Number(quantityCell.textContent);
    if (quantity > 0) {
      quantity -= 1;
      quantityCell.textContent = quantity;
      try {
        const response = await axios.put(`http://localhost:3000/candy/${id}`, { quantity });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      window.alert('This candy is out of stock.');
    }
  }
  
  async function buyTwo(id) {
    const candyRow = document.getElementById(id);
    const quantityCell = candyRow.children[3];
    let quantity = Number(quantityCell.textContent);
    if (quantity >= 2) {
      quantity -= 2;
      quantityCell.textContent = quantity;
    } else {
      window.alert('This candy is out of stock.');
    }
  }

  async function buyThree(id) {
    const candyRow = document.getElementById(id);
    const quantityCell = candyRow.children[3];
    let quantity = Number(quantityCell.textContent);
    if (quantity >= 3) {
      quantity -= 3;
      quantityCell.textContent = quantity;
    } else {
      window.alert('This candy is out of stock.');
    }
  }
  
  
  
  
  
  
  
  

