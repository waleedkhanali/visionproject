var section3_right = document.getElementById("section3-right");
var section3_left = document.getElementById("section3-left");
var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
var section5 = document.getElementById("section5");
var section5_right = document.getElementById("section5-right");
var section5_left = document.getElementById("section5-left");
var section5_alt_img = document.getElementById("section5-alt-main");
var section5_img = document.getElementById("section5_main");
var stop = document.getElementById("stop");
function getTransitionEndEventName() {
  var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
   }
  let bodyStyle = document.body.style;
  for(let transition in transitions) {
      if(bodyStyle[transition] != undefined) {
          return transitions[transition];
      } 
  }
}
let transitionEndEventName = getTransitionEndEventName();

function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }
  var defValue = 80;
  var lastScrollTop = 0;
  var MinScrolling = 0;
  var defaultHieght = 300;
  var section4_img_scale = document.getElementById("section4-img-scale");
  var section5_val = 50;
  var section5_scrollVal = 0;
  var section6_val = 0;
  var section6_sec5_scroll = 0;
  var section6 =  document.getElementById("section6-top");
  var scrollVal_section6 = 0;
  var transitionEnd;

  window.addEventListener("scroll",function(){

   
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var left_result = checkVisible(section3_right);
    var right_result = checkVisible(section3_left);
    var section4 = document.getElementById("section4");
    var rect = section3_left.getBoundingClientRect();
    var rect1 = section5.getBoundingClientRect();
      
    //////////// section 2 ending scrolling////////////////////////
    if(!left_result){
      
    
    if(right_result && !left_result && st > lastScrollTop ){
      
        section4.style.transform = "translateX(80vw) translateY(-50%)";
        
        section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
        // console.log(defValue)
       MinScrolling = lastScrollTop;
    
        if(defValue == 60 || defValue < 1){
        }else{
           defValue = defValue-1;
        }
        ////////////////////////////Section3 full scrolling////////////////
    }else if(!right_result && !left_result &&  rect.top < 1 && st > lastScrollTop){





//////////////////////////////////////////////////////////////
      
  
        section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
       
        // console.log(defValue)
        if(defValue == 0 || defValue < 1){
         
            section4_img_scale.style.scale = "0.9";
            section4_img_scale.style.scale = "1";
            if(section5_scrollVal == 10){
              $(".section5").css("z-index",0);
              
            setTimeout(function(){
                section5_right.style.scale = 1;
                section5_scrollVal = 15
            },2000)
        }
          else if(section5_scrollVal == 20){
            //////////////////THIS IS DONE AFTER IMAGE IS BEING TARNSITTIPNED 
                section5_left.style.transform = `translateX(${-section5_val}vw)`;
               
                
                section5_left.addEventListener(transitionEndEventName, function(){transitionEnd = true});
                  if(section5_val == 0 && transitionEnd == true){
                    switch(section6_val){
                     case 0: 
               
                   
                     section5_right.style.width = "40%";
                     section5_left.style.width = "55%";
                     section6_val++;
                     break;
                     case 30:
                         ///////////Hiding Sction3 for get better results in  animations////////////////////////////
                        
                         section6.style.opacity = 1;
                         
                         section5_img.style.clipPath = "polygon(0% 0%, 100% 0%, 0% 100%)";
                          section5_alt_img.style.display= "block";
                         section5_alt_img.style.clipPath = "polygon(100% 100%, 0% 100%, 100% 0%)";
                        
                         section6_val++;
 
                         break;
                     case 40:
                     
                     section6.style.zIndex = 0;
                     section4.style.display = "none";
                       stop.innerHTML = "true";
                         section5_img.style.transform = `translateX( -${section6_sec5_scroll}vw)translateY(-${section6_sec5_scroll}vw)`;
                         section5_alt_img.style.transform = `translateX(${section6_sec5_scroll}vw)translateY(${section6_sec5_scroll}vw)`;
                       
                        
 
                         if(section6_sec5_scroll == 50){
                          
                              section6.style.zIndex = 1;
                              if(scrollVal_section6 == 10){
                                
                                 stop.innerHTML = "false";
                              }else{
                                 scrollVal_section6++;
                                 scroll()
                              }
                         }else{
                         
                             section6_sec5_scroll= section6_sec5_scroll+0.5;
                         }
                         break;
                     default: 
                     section6_val++;
                    } 
 
                 }
           
                
               
                if(section5_val > 0){
                    section5_val --;
          
              }
              
                
            }else if(section5_scrollVal < 50){
                section5_scrollVal ++;
            }
           
            
        }else{
           defValue = defValue-1;
        }
      
        hasRuned = true; 
       
       
    }






















    //////////////////////////////////////FOR SCROLLING DOWN/////////////////////////////////
    // else if(!right_result && !left_result && st < lastScrollTop){
    //     // section4.style.transform = "translateX(80vw) translateY(-50%)";
       
    //     

      
    //     section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
        
    //    MinScrolling = lastScrollTop;
   
    //     if(defValue == 60 || defValue > 100){
    //     }else{
    //        defValue = defValue+1;
    //     }
    // }
    else if( st < lastScrollTop ){
  //    console.log({
      
  //  defValue : defValue,
  //  lastScrollTop : lastScrollTop,
  //  MinScrolling : MinScrolling,
  //  defaultHieght : defaultHieght,
  //  section5_val : section5_val,
  //  section5_scrollVal : section5_scrollVal,
  //  section6_val : section6_val,
  //  section6_sec5_scroll : section6_sec5_scroll,
  //  scrollVal_section6 : scrollVal_section6,

  //    })
    
      var footer = document.getElementById("section6-top");
        var footer_pos =Number(footer.style.top.replace("px",""));
       
        /////////////////SECTION 5 WORK////////////////////////////////////////
        // console.log(section5_val)
        //      console.log(section6_val)  
            
        if(footer_pos > $(window).scrollTop()){
          
            switch(section6_val){

                case 40:  
       
                section5_img.style.transform = `translateX(-${section6_sec5_scroll}vw)translateY(-${section6_sec5_scroll}vw)`;
                section5_alt_img.style.transform = `translateX(${section6_sec5_scroll}vw)translateY(${section6_sec5_scroll}vw)`;
                section5_right.style.scale = 1;
                 section6.style.zIndex = 0;
                if(section6_sec5_scroll == 0){
                  section6_val--;
                     if(scrollVal_section6 == 10){
                     
                        //  stop.innerHTML = "false";
                     }else{
                        scrollVal_section6--;
                        scroll()
                     }
                }else{
                    section6_sec5_scroll= section6_sec5_scroll-0.5;
                  
                }
                break;
             case 20: 
             section5_right.style.width = "50%";
             section5_left.style.width = "45%";
             section6_val--;
                
            //  section5_left.style.width = "55%";
             break;
             case 30:
                 ///////////Hiding Sction3 for get better results in  animations////////////////////////////
                //  section4.style.display = "none"

                 section5_img.style.clipPath = "none";
                 section5_alt_img.style.display= "none";
                 section5_alt_img.style.clipPath = "none";
             section6_val --;
                 

                 break;
           case 10:
           
             section4.style.display = "block"
             section5_left.style.transform = `translateX(${-section5_val}vw)`
             if(section5_val == 50){
              section5_right.style.scale = 0;
//////////////////////////Main work//////////////////////
              
             
                section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
                if(defValue == 100 || defValue == 99){
                  clearScrolling();
                  console.log("clearesd successull");
                  defValue = defValue+5;
                }else if(defValue <  100){
                  console.log(defValue)
                  defValue++;
                }
                //      section4_img_scale.style.scale = "0.9";
                //      section4_img_scale.style.scale = "0.8";
                //      setTimeout(function(){
                //      section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
                // },2000)
                    // if(defValue == 100 || defValue > 100){
                    //     section4.style.scale = "0.9";
                    //     section4.style.scale = "1";
                        
                        
            
                    // }else{
                    //    defValue = defValue+1;
                    // }
             
             }else{
              section5_val++;
             }
            
            break;
             default: 
             section6_val--;
            } 
          
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
///////////////////////FOR MIDDLE WORK/////////////////////////////////////////////        
        else{
          
        //  if(section5_scrollVal == 20){
        //   if(section5_val == 0){
        //     switch(section6_val){
              // case 10: 
              //   section5_right.style.width = "50%";
              //   section5_left.style.width = "45%";
              //   section6_val--;
              //   break;
              //   case 30:
              //       ///////////Hiding Sction3 for get better results in  animations////////////////////////////
              //       section4.style.display = "none"

              //       section5_img.style.clipPath = "polygon(0% 0%, 100% 0%, 0% 100%)";
              //       section5_alt_img.style.display= "block";
              //       section5_alt_img.style.clipPath = "polygon(100% 100%, 0% 100%, 100% 0%)";
                   
              //       section6_val--;

              //       break;
          //       case 40:
          // console.log(section6_sec5_scroll)
        //             section5_img.style.transform = `translateX(-${section6_sec5_scroll}vw)translateY(-${section6_sec5_scroll}vw)`;
        //             section5_alt_img.style.transform = `translateX(${section6_sec5_scroll}vw)translateY(${section6_sec5_scroll}vw)`;
                    
        //             section6.style.display = "block"
        //             if(section6_sec5_scroll == 50){
        //                  section6.style.zIndex = 1;
        //                  if(scrollVal_section6 == 10){
                           
        //                     stop.innerHTML = "false";
        //                  }else{
        //                     scrollVal_section6++;
        //                     scroll()
        //                  }
        //             }else{
        //                 section6_sec5_scroll= section6_sec5_scroll-0.5;
        //             }
        //             break;
        //         default: 
        //         section6_val--;
        //     }
        //   }
        
           if(section5_val !== 50 && section5_val !== 0){
             section5_right.style.width = "50%";
             section5_left.style.width = "45%";
            section5_left.style.transform = `translateX(${-section5_val}vw)`;
            section5_left.addEventListener(transitionEndEventName, function(){transitionEnd = false});
              section5_val++;
             
          
             
          }
        
        else if(section5_scrollVal <= 20 &&section5_scrollVal > 0 && transitionEnd == false){
           section6.style.zIndex = -1;
           section6.style.opacity = 0;
         if(section5_scrollVal == 5){
          section5_right.style.scale = 0;
          section5_scrollVal--;
         }else{
          section5_scrollVal--;
          }
        }
          else if(defValue !== 100 && section5_scrollVal != 0 ){
          
          section4.style.transform = `translateX(0vw) translateY(-50%)`;
         
          
           
          
        }
        ///////////////////CHECKING IS IT GOING UP OR DOWN/////////////
        if(st > lastScrollTop){
          stop.innerHTML = "true";
        }
        
      }

       
        //   if(section5_scrollVal == 20){
          
        //     section5_left.style.transform = `translateX(${-section5_val}vw)`
        //     if(section5_val == 50){
        //        switch(section6_val){
        //         case 40: 
        //         section5_right.style.width = "50%";
        //         section5_left.style.width = "45%";
        //         section6_val--;
        //         break;
        //         case 30:
        //             ///////////Hiding Sction3 for get better results in  animations////////////////////////////
        //             section4.style.display = "none"

        //             section5_img.style.clipPath = "polygon(0% 0%, 100% 0%, 0% 100%)";
        //             section5_alt_img.style.display= "block";
        //             section5_alt_img.style.clipPath = "polygon(100% 100%, 0% 100%, 100% 0%)";
                   
        //             section6_val--;

        //             break;
        //         case 0:
          
        //             section5_img.style.transform = `translateX(-${section6_sec5_scroll}vw)translateY(-${section6_sec5_scroll}vw)`;
        //             section5_alt_img.style.transform = `translateX(${section6_sec5_scroll}vw)translateY(${section6_sec5_scroll}vw)`;
                    
        //             section6.style.display = "block"
        //             if(section6_sec5_scroll == 50){
        //                  section6.style.zIndex = 1;
        //                  if(scrollVal_section6 == 10){
                           
        //                     stop.innerHTML = "false";
        //                  }else{
        //                     scrollVal_section6++;
        //                     scroll()
        //                  }
        //             }else{
        //                 section6_sec5_scroll= section6_sec5_scroll-0.5;
        //             }
        //             break;
        //         default: 
        //         section6_val--;
        //        } 

        //     }
      
        //      if(section5_val > 0){
        //         section5_val ++;
       
        //     }
        // }else if(section5_scrollVal > 0){
        //     section5_scrollVal ++;
        // }
        ////////////////////FOR END WORK////////////////////
        
    //      if(section5_scrollVal == 10){

    //         setTimeout(function(){
            
    //             section5_right.style.scale = 0;
    //             section5_scrollVal = 5
    //         },2000)
    //     }
    //       else if(section5_scrollVal == 20){
    //         section5_right.style.width = "50%";
    //                 section5_left.style.width = "45%";
    //             section5_left.style.transform = `translateX(${section5_val}vw)`;
        
    //             if(section5_val == -50){
    //                 section5_scrollVal = 15;
    //             }else{
    //                 section5_val --;
    //             }
    //         }else if(section5_scrollVal > 0){
    //             section5_scrollVal --;
    //         }
    //         if(section5_scrollVal == 0){

           

    //     section4_img_scale.style.scale = "0.9";
    //     section4_img_scale.style.scale = "0.8";
    //     setTimeout(function(){
    //     section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
    // },2000)
    //     if(defValue == 100 || defValue > 100){
    //         section4.style.scale = "0.9";
    //         section4.style.scale = "1";
            
            

    //     }else{
    //        defValue = defValue+1;
    //     }
            //}

    }else{
     
    }
    // console.log(lastScrollTop)
    //  <= 0 ? 0 : st; // For Mobile or negative scrolling
    lastScrollTop = st;
  }else{
    section4.style.transform = "translateX(100vw) translateY(-50%)";
    console.log("entering in else mode");
    var section_video = document.getElementById("section_video");
    var section2 = document.getElementById("section2");
    var checkpos = checkVisible(section2);
    var checkpos_video = checkVisible(section_video);
    if(checkpos){
      console.log("error found successfully")
      clearAll();
    }else if(checkpos_video){
      clearAll();
    }
    
  }

  })













































































//   var spanWord = "";
//   var span1 = document.querySelector("#span1");
//   span1.innerHTML.split(" ").forEach(word => {
//     spanWord += " "+`<span>${word}</span>`+" "
//   });
//   span1.innerHTML = spanWord;
let h1 = document.getElementById("span1");
  function updateText(){

   
    
       
        var text = h1.innerHTML;
        h1.innerHTML = "";
          h1.innerHTML = text
            .split("")
            .map(letter => {
             
              return `<span>` + letter + `</span>`;
            })
            .join("");
    
    }
    updateText()
    var hasRunFirst = false;
 window.addEventListener("scroll", function(){
    if(checkVisible(span1)){
        if( hasRunFirst == false){
        let delay = 100;
        var children = Array.prototype.slice.call(span1.children);
        Array.from(h1.children).forEach((span, index) => {
            setTimeout(() => {
              span.classList.add("wavy");
            }, index * 60 + delay);
          });
          setTimeout(function(){
            Array.from(h1.children).forEach((span, index) => {

                setTimeout(() => {
                  span.classList.remove("wavy");
                }, index * 60 + delay);
              });
          },3000)
          hasRunFirst = !hasRunFirst;
        }
      
        }
        else{
            hasRunFirst = false;
        }
 })
 function clearAll(){
//   let links = document.getElementById("animated_elem"); 
//   let href = links.getAttribute('href') 
//   .split('?')[0]; 

// let newHref = href + '?version='  
// + new Date().getMilliseconds(); 

// links.setAttribute('href', newHref); 
 }
 function clearScrolling(){
  var body = document.getElementById("body");
  var section3 = document.getElementById("section3-main");
  var pos_section3 = section3.getBoundingClientRect();
  window.scrollBy(0, (pos_section3.bottom));
 console.log("cleared scrolling");
 }
