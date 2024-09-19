const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
       
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                    `;
                    if(note.connected == "none"){
                    liTag+= `<li onclick="connect(${id})"><i class="fa-brands fa-connectdevelop"></i>connect</li>
                        </ul>
                    </div>
                </div>
            </li>`

        }else{
            liTag += `<li onclick="openNotebook(${id})"><i class="fa-solid fa-book"></i>open</li>
            </ul>
        </div>
    </div>
</li>`
        }
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let noteInfo = {title, description, date: `${month} ${day}, ${year}`,connected:'none'};
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});
function connect(noteId) {
    var connect = document.getElementById("connect");
    connect.style.scale = 1;
    connect.setAttribute("noteId",noteId)
    
   
}
var selectedNotebook = "";
var last_id = 0;
function create_notebook(){
    var item_notebook = document.getElementById("item_notebook");
    var li = document.createElement("li");
    var save = document.createElement("i");
    var remove = document.createElement("i");
    save.className = "fa-regular fa-floppy-disk";
    remove.className = "fa-solid fa-trash";
    li.innerHTML = "NOTEBOOK NAME"
    li.contentEditable = "true";
 
    save.addEventListener("click",function(){
        var list =  localStorage.getItem("list");
        console.log(list)
        var li_data = li.innerHTML.replaceAll('<i class="fa-solid fa-trash"></i><i class="fa-regular fa-floppy-disk"></i>','');
        if(list == null){
            
            var new_list = {
                list:[
                    {
                        id: 1,
                       connect:"none",
                        list_name:li_data
                    }
            

                
            ]
            };
          
            localStorage.setItem("list",JSON.stringify(new_list))
        }else{
            var parseList = JSON.parse(list);

            
            var new_list = parseList.list;
            var data = {
                id: parseList.list.length+1,
               connect:"none",
                list_name:li_data
            };
            var list = new_list.concat(data);
             localStorage.setItem("list",JSON.stringify({
                list
            }))

        }

    })
    remove.addEventListener("click",function(){
        li.remove();
    })
    item_notebook.appendChild(li);
    li.appendChild(remove);
    li.appendChild(save);
   
    li.addEventListener("click",function(){
        if(selectedNotebook == li){
            li.style.background = "white";
            selectedNotebook = "";
        }else{
            document.querySelectorAll("#item_notebook li").forEach((elem) => {
                elem.style.background = "white"
            })
            li.style.background = "red";
            selectedNotebook = li;
        }
    })
}
function getList(){
    var item_notebook = document.getElementById("item_notebook");
    var list =  localStorage.getItem("list");
    var parseList = JSON.parse(list);
    console.log(parseList)
    var data = parseList.list;
    data.forEach(elem => {
        var li = document.createElement("li");
    var remove = document.createElement("i");
    remove.className = "fa-solid fa-trash";
    li.innerHTML = elem.list_name;
   item_notebook.appendChild(li);
   li.appendChild(remove);
   li.id = "list_"+elem.id;
   li.addEventListener("click",function(){
    if(selectedNotebook == li){
        li.style.background = "white";
        selectedNotebook = "";
    }else{
        document.querySelectorAll("#item_notebook li").forEach((elem) => {
            elem.style.background = "white"
        })
        li.style.background = "red";
        selectedNotebook = li;
    }
})
   remove.addEventListener("click",function(){
    li.remove();
    var new_data = {
        list:[]
    };
    data.forEach((elem) => {
        if("list_"+elem.id == li.id){

        }else{
            new_data.list+=elem;
        }
    });
    localStorage.setItem("list",JSON.stringify(new_data));
    console.log(JSON.stringify(new_data))
})
    })
    
}
getList();
function connectItem(){
    var connect = document.getElementById("connect");
    var id = connect.getAttribute("noteId");
   
    if(selectedNotebook != ""){
        var selected_Id = selectedNotebook.id.replaceAll("list_","");
        var list = JSON.parse(localStorage.getItem("list"));
        var notes = JSON.parse(localStorage.getItem("notes"));
        list.list[selected_Id-1].connect = id;
        localStorage.setItem("list",JSON.stringify(list));
        console.log(notes)
        console.log(notes[id].connected = selected_Id);
        localStorage.setItem("notes",JSON.stringify(notes));
        alert("connected successfully")
        //  console.log(id+"notes");/////NOTE
        //  console.log(selected_Id+"list");///////LISTS
    }

}










function openNotebook(noteId){
    var notes = document.getElementById("note");
    var note_nav = document.getElementById("note-nav");
    note_nav.style.display = "BLOCK"
    notes.style.scale = 1;
    console.log(noteId);
    notes.setAttribute("list_id",noteId);
    const list = JSON.parse(localStorage.getItem("list"));
    if(list.list[noteId].data == undefined || list.list[noteId].data == null || list.list[noteId].data == ""){

    }else{
        var notebook_right_section = document.getElementById("notebook_right_section");
        notebook_right_section.innerHTML = "";
       
      
        list.list[noteId].data.forEach(elem => {
            var header = elem.header;
            var hipsum = elem.hipsum;
            console.log(elem)
          
            add_note(header,hipsum)
        })
    }
}
var lastScroll = 0;
function add_note(header_inner = "Header",p_inner = "WRITE SOMETHING..."){
    var notes = document.getElementById("note");
    var notebook_right_section = document.getElementById("notebook_right_section");
    var notebook_paper = document.createElement("div");
    notebook_paper.className = "notebook-paper"
    var header = document.createElement("header");
    
    var h1 = document.createElement("h1");
    var p = document.createElement("p");
    p.innerHTML = p_inner;
    h1.contentEditable = true;
    h1.innerHTML = header_inner
    var content = document.createElement("div");
    content.id = "content";
    var hipsum = document.createElement("div");
    hipsum.contentEditable = true;
    hipsum.appendChild(p);
    hipsum.className = "hipsum";
    notebook_paper.appendChild(header);
    header.appendChild(h1);
    content.appendChild(hipsum);
    notebook_paper.appendChild(content);
    notebook_right_section.appendChild(notebook_paper);
    var length = notebook_right_section.children.length;
    notebook_right_section.style.width = ((length * 80)+20)+"vw";

}
function scroll_right_col(){
    var notes = document.getElementById("note");
    notes.scrollLeft += (80*window.innerWidth/100);
  
    
 
    
}
function scroll_left_col(){
    var notes = document.getElementById("note");
   

    if(notes.scrollLeft <= 0){

    }else{
        notes.scrollLeft -= (80*window.innerWidth/100*window.innerWidth/100);
    }
    
 
    
}
function delete_note(){
    var notes = document.getElementById("note");
    var value = Math.round(notes.scrollLeft/window.innerWidth*100)/80;
    var notebook_right_section = document.getElementById("notebook_right_section");
    var elem = notebook_right_section.children[value];
    elem.remove()
    console.log(value)
    notes.scrollLeft -= (80*window.innerWidth/100*window.innerWidth/100);

}
var header_h1 = document.getElementById("header_h1");
header_h1.contentEditable = true;
var hipsum = document.getElementById("hipsum");
hipsum.contentEditable = true;
function save_note(){
    var notes = document.getElementById("note");
    var id = notes.getAttribute("list_id");
    var data_reset = JSON.parse(localStorage.getItem("list"));
    
    var notebook_right_section = document.getElementById("notebook_right_section");
    data_reset.list[id].data = "";
    localStorage.setItem("list",JSON.stringify(data_reset));
    var childrens = Array.prototype.slice.call(notebook_right_section.children);

    ////////////FOR EACH WORK HERE//////////////////
    childrens.forEach(elem =>{
       
          var header = elem.children[0].children[0].innerHTML;
         var hipsum =  elem.children[1].children[0].children[0].innerHTML;
      
         console.log(header)
        var data = JSON.parse(localStorage.getItem("list"));
       
       
        if(typeof(data.list[id].data) == "string"){
            data.list[id].data = [{
                header:header,
                hipsum:hipsum
            }]
        }else{
            data.list[id].data.push({
                header:header,
                hipsum:hipsum
            })
        }
        console.log(data.list[id].data)
          localStorage.setItem("list",JSON.stringify(data));
     }) 
}