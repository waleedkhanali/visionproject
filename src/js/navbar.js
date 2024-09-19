var body = document.getElementById("body");
var hasRun = false;
var button = document.getElementById("showInfo");
let hasClicked = false;
var main = document.getElementById("main");
function anim(ele){
    
   if(hasClicked == false){
    ele.classList.add("search-btn");
    setTimeout(function(){
        ele.classList.remove("search-btn");
    },1000)
   }

}
function anim1(ele){
    if(hasClicked == false){
        body.style.overflow = "hidden";
    ele.classList.add("active_search");
    main.children[0].style.animation =  "4s searchbar";
    main.style.animation = "2s searchbar_open";
    main.style.animationFillMode = "forwards";
    main.children[0].style.animationFillMode = "forwards";
    }else{
         body.style.overflow = "visible";
        ele.classList.remove("active_search"); 
        main.children[0].style.animation =  "2s searchbar1";
    main.style.animation = "4s searchbar_open1";
    main.style.animationFillMode = "forwards";
    main.children[0].style.animationFillMode = "forwards";
    }
    hasClicked = !hasClicked;
}
var nav1 = document.getElementById("nav1");
var nav2 = document.getElementById("nav2");
window.addEventListener("scroll", (event) => {
 
let scroll = this.scrollY;


if(scroll > 300 && hasRun == false){
    nav2.style.display = "flex"
    nav2.style.position = "sticky";
    nav2.style.top = "0px"
     nav2.style.animation = "4s shuffle_nav";
     nav2.style.animation.animationFillMode = "forwards";
     setTimeout(function(){
        nav2.style.zIndex = "2";
     },2000)
    setTimeout(function(){
        nav1.style.zIndex = "-1";
        // nav2.style.animation = "4s shuffle_nav";
        // nav2.style.animation.animationFillMode = "forwards";
        nav1.style.animation = "none";
        nav1.style.animation.animationFillMode = "none"    
        hasRun = true;
        
    },4000)
}
if(scroll < 300 && hasRun == true) {
   
    nav1.style.display = "flex";
    nav1.style.animation = "4s shuffle_nav1";
    nav1.style.animation.animationFillMode = "forwards"
    setTimeout(function(){
        nav2.style.opacity = "0";
    },2000)
    setTimeout(function(){
        nav2.style.zIndex = "-1";
        nav1.style.zIndex = "2";
        nav2.style.opacity = "1";
        nav2.style.animation = "none";
        nav2.style.animation.animationFillMode = "none";
      
    },4000)
    hasRun = false;
}

});
