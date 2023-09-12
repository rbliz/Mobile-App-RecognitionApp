import{ initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{ getDatabase, push, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://recognition-realtime-db-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "Endorsements")

const commentInputEl = document.getElementById("comment-input")
const fromInputEl = document.getElementById("from-input")
const toInputEl = document.getElementById("to-input")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementsListEl = document.getElementById("endorsements-list")


publishBtnEl.addEventListener("click", function(){
    let commentInputValue = commentInputEl.value 
    let fromInputValue = fromInputEl.value 
    let toInputValue = toInputEl.value 
    
    let endorsementValue = 
        [`${toInputValue}`,`${commentInputValue}`,`${fromInputValue}`]
    if(commentInputValue != "" && fromInputValue != "" && toInputValue != ""){
    
    push(endorsementsListInDB, endorsementValue)
   
    }
    clearInputs()
    
})

onValue(endorsementsListInDB, function(snapshot){
    if(snapshot.exists()){
     let itemsArray = Object.values(snapshot.val())
     
     clearEndorsementsListEl()
     
       for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemToValue = currentItem[0]
            let currentItemCommentValue = currentItem[1]
            let currentItemFromValue = currentItem[2]
            
            appendItemsToEndorsementsListEl(currentItem)
     
    }
    }
    else{
        endorsementsListEl.innerHTML = ""
    }
})


function clearEndorsementsListEl(){
    endorsementsListEl.innerHTML = ""
    
}



function clearInputs(){
commentInputEl.value = ""
fromInputEl.value = ""
toInputEl.value = ""
}

function appendItemsToEndorsementsListEl(item){
       let itemTotal = item
       let itemValueZero = item[0]
       let itemValueOne = item[1]
       let itemValueTwo = item[2]
       
      
       
       let newHeading = document.createElement("h2")
       let newListEl = document.createElement("li")
       let newFooter = document.createElement("h3")
        
        newHeading.textContent = "To" + " " + itemValueZero 
       newListEl.textContent = itemValueOne
       newFooter.textContent = "From" + " " + itemValueTwo
       
       endorsementsListEl.append(newHeading)
       endorsementsListEl.append(newListEl)
       endorsementsListEl.append(newFooter)
       
       
       
}




// let arrayLikes = []
// function addLike(){
    // push 1 more like to onclick
    
//}

