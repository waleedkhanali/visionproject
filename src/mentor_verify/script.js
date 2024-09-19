function change_name(ele)
{
var fi = document.getElementById('file'); // GET THE FILE INPUT AS VARIABLE.

var totalFileSize = 0;

// VALIDATE OR CHECK IF ANY FILE IS SELECTED.
if (fi.files.length > 0)
{
    // RUN A LOOP TO CHECK EACH SELECTED FILE.
    for (var i = 0; i <= fi.files.length - 1; i++)
    {
        //ACCESS THE SIZE PROPERTY OF THE ITEM OBJECT IN FILES COLLECTION. IN THIS WAY ALSO GET OTHER PROPERTIES LIKE FILENAME AND FILETYPE
        var fsize = fi.files.item(i).size;
        totalFileSize = totalFileSize + fsize;
        document.getElementById('fp').innerHTML =
       
        '<div>  <b><span class="name">' + fi.files.item(i).name
        +
        '</span></b><b><span class="size">' + Math.round((fsize / 1024)) //DEFAULT SIZE IS IN BYTES SO WE DIVIDING BY 1024 TO CONVERT IT IN KB
        +
        'KB</span></b>  <i class="fa-solid fa-x" onclick="remove_file(this)"></i></div>'
    }
}
document.getElementById('divTotalSize').innerHTML = "Total File(s) Size is " + Math.round(totalFileSize / 1024) +"KB";
}
function remove_file(ele){
    var parent = ele.parentElement;

    parent.remove();

}
function showattachment(ele){
    if(  ele.classList == "fa-solid fa-caret-down show"){
        ele.classList = "fa-solid fa-caret-up show";
      document.querySelectorAll("#fp > div").forEach(elem => {
            elem.style.display = "none"
        })
    }else{
    ele.classList = "fa-solid fa-caret-down show"
        document.querySelectorAll("#fp > div").forEach(elem => {
            elem.style.display = "block"
        })
    }
}