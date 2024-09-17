
let crytoListItemsEl=document.getElementById("crytoListItems");
let spinnerEl=document.getElementById("spinner");
let bgColorButtonEl=document.getElementById("bgColorButton"); 
let bgContainerEl=document.getElementById("bgContainer");


function onChangeButtonsStyles(){
    bgColorButtonEl.classList.toggle("light-button");
    bgColorButtonEl.textContent="Dark"
}

bgColorButtonEl.addEventListener("click",function(){
    bgContainerEl.classList.toggle("light-bg-container"); 
    onChangeButtonsStyles()
      state=false;

})


function onDisplayCryptoLists(data,count){

     const {name, last, buy, sell}=data 

    let listItem=document.createElement("li");
    listItem.classList.add("list-item","value-list-item");
    crytoListItemsEl.appendChild(listItem);

    let displayId=document.createElement("span");
    displayId.classList.add("list-display-id","list-value-each");
    displayId.innerHTML=count;
    listItem.appendChild(displayId);

    let platform=document.createElement("span");
    platform.classList.add("list-platform","list-value-each");
    platform.textContent=name;
    listItem.appendChild(platform);

    let lastTradedPrice=document.createElement("span");
    lastTradedPrice.classList.add("list-traded-price","list-value-each");
    lastTradedPrice.textContent=last;
    listItem.appendChild(lastTradedPrice); 

    let buySellPrice=document.createElement("span");
    buySellPrice.classList.add("list-buy-sell-price","list-value-each");
    buySellPrice.textContent= `${buy} / ${sell}`;
    listItem.appendChild(buySellPrice);

    let diff=document.createElement("span");
    diff.classList.add("list-diff","list-value-each");
    diff.textContent=`${buy-sell}`;
    listItem.appendChild(diff);

    let saving=document.createElement("span");
    saving.classList.add("list-saving","list-value-each");
    saving.textContent=1000;
    listItem.appendChild(saving); 

}







function onAddToDisplay(data){
    spinnerEl.classList.toggle("d-none")
    crytoListItemsEl.classList.toggle("d-none")
    count=1
    if (count<=10){
        for (let key in data){
            onDisplayCryptoLists(data[key],count);
            count++ 
        }
    }
    

}










function getCryptoDataFromDatabase(){

    const url="https://hodlinfobackend.onrender.com/api/getTop10";
    const options={
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    }
}

fetch(url, options).then(function(response){
    return response.json()
}).then(function(jsonData){

    //console.log(jsonData)
    // add your code here to process the fetched data 
    onAddToDisplay(jsonData)
})
}


function onAddDataBase(data){
    const {name, last, buy, sell, volume,base_unit,open,low,high,at,type}=data 
    const newData={
        base_unit,
        buy,
        last,
        name,
        volume,
        sell,
        at,
        type,
        low,
        high,
        open,
    }
    const url="https://hodlinfobackend.onrender.com/api/add-data";
    const options={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(newData)
}

fetch(url, options).then(function(response){
    //console.log(response)
})
   
}


function resultData(data) {
        for (let key in data){
            onAddDataBase(data[key]) 
        }
        getCryptoDataFromDatabase()
       
    
}


function onDeleteAllData(){
    const url="https://hodlinfobackend.onrender.com/api/delete-all";
    const options={
    method:'DELETE',
    headers:{
        'Content-Type':'application/json'
    }
}

fetch(url, options).then(function(response){
    //console.log(response)
})


}


function getSourceData(){
    crytoListItemsEl.classList.toggle("d-none")
    spinnerEl.classList.toggle("d-none")

    

    onDeleteAllData()
    const url="https://api.wazirx.com/api/v2/tickers";
    const options={
    method:'GET',
    headers:{
        'Content-Type':'application/json'
    }
}
fetch(url, options).then(function(response){
    return response.json()
}).then(function(jsonData){
    //console.log(jsonData)
    // add your code here to process the fetched data 
    resultData(jsonData)
})

 
}

getSourceData()

let timerCountEl=document.getElementById("timerCount");

let seconds=1
const cancelUniqueId=setInterval(function(){
        if (seconds<=9){
            timerCountEl.textContent="0"+seconds
        }else if (seconds<60){
            timerCountEl.textContent=seconds
        }else{
            timerCountEl.textContent=seconds
            seconds=0 
            getSourceData()
            console.log("timerCountEl")

        }
    seconds++ 
},1000)



