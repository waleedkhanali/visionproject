// var main = () => {
//     var st = window.pageYOffset || document.documentElement.scrollTop;
//     var left_result = checkVisible(section3_right);
//     var right_result = checkVisible(section3_left);
//     var section4 = document.getElementById("section4");
//     var rect = section3_left.getBoundingClientRect();
//     var rect1 = section5.getBoundingClientRect()

//     //////////// section 2 ending scrolling////////////////////////
//     if(right_result && !left_result && st > lastScrollTop ){
        
//         section4.style.transform = "translateX(80vw) translateY(-50%)";
        
//         section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
//         // console.log(defValue)
//        MinScrolling = lastScrollTop;
    
//         if(defValue == 60 || defValue < 1){
//         }else{
//            defValue = defValue-1;
//         }
//         ////////////////////////////Section3 full scrolling////////////////
//     }else if(!right_result && !left_result &&  rect.top < 1 && st > lastScrollTop){
        
     
//         section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
//         // console.log(defValue)
//         if(defValue == 0 || defValue < 1){
//             section4_img_scale.style.scale = "0.9";
//             section4_img_scale.style.scale = "1";
//             if(section5_scrollVal == 10){

//             setTimeout(function(){
            
//                 section5_right.style.scale = 1;
//                 section5_scrollVal = 15
//             },2000)
//         }
//           else if(section5_scrollVal == 20){
          
//                 section5_left.style.transform = `translateX(${-section5_val}vw)`
//                 if(section5_val == 0){
//                    switch(section6_val){
//                     case 0: 

//                     section5_right.style.width = "40%";
//                     section5_left.style.width = "55%";
//                     section6_val++;
//                     break;
//                     case 30:
//                         ///////////Hiding Sction3 for get better results in  animations////////////////////////////
//                          section4.style.display = "none"

//                         section5_img.style.clipPath = "polygon(0% 0%, 100% 0%, 0% 100%)";
                        
//                         section5_alt_img.style.clipPath = "polygon(100% 100%, 0% 100%, 100% 0%)";
//                          section5_alt_img.style.display= "block";
                       
//                         section6_val++;

//                         break;
//                     case 40:
//               section6.style.opacity = 1;
//                         section5_img.style.transform = `translateX(-${section6_sec5_scroll}vw)translateY(-${section6_sec5_scroll}vw)`;
//                         section5_alt_img.style.transform = `translateX(${section6_sec5_scroll}vw)translateY(${section6_sec5_scroll}vw)`;
                        
//                         if(section6_sec5_scroll == 50){
//                              section6.style.zIndex = 1;
//                              if(scrollVal_section6 == 10){
                               
//                                 stop.innerHTML = "false";
//                              }else{
//                                 scrollVal_section6++;
//                                 scroll()
//                              }
//                         }else{
//                             section6_sec5_scroll= section6_sec5_scroll+0.5;
//                         }
//                         break;
//                     default: 
//                     section6_val++;
//                    } 

//                 }
          
//                  if(section5_val > 0){
//                     section5_val --;
           
//                 }
//             }else if(section5_scrollVal < 50){
//                 section5_scrollVal ++;
//             }
           
            
//         }else{
//            defValue = defValue-1;
//         }
      
//         hasRuned = true; 
       
//     }






















//     //////////////////////////////////////FOR SCROLLING DOWN/////////////////////////////////
//     // else if(!right_result && !left_result && st < lastScrollTop){
//     //     // section4.style.transform = "translateX(80vw) translateY(-50%)";
       
//     //     

      
//     //     section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
        
//     //    MinScrolling = lastScrollTop;
   
//     //     if(defValue == 60 || defValue > 100){
//     //     }else{
//     //        defValue = defValue+1;
//     //     }
//     // }
//     else if( st < lastScrollTop){
//           alert("hello")
//         ///////////////////SECTION 5 WORK////////////////////////////////////////
//         // console.log(section5_scrollVal)
//         //      console.log(section6_val)  
            
//         // if(section5_val == 0){
            
//         //     switch(section6_val){
//         //         case 40:
       
//         //         section5_img.style.transform = `translateX(-${section6_sec5_scroll}vw)translateY(-${section6_sec5_scroll}vw)`;
//         //         section5_alt_img.style.transform = `translateX(${section6_sec5_scroll}vw)translateY(${section6_sec5_scroll}vw)`;
                
//         //         section6.style.display = "none"
//         //         if(section6_sec5_scroll == 50){
//         //              section6.style.zIndex = 1;
//         //              if(scrollVal_section6 == 10){
                       
//         //                 // stop.innerHTML = "false";
//         //              }else{
//         //                 scrollVal_section6--;
//         //                 scroll()
//         //              }
//         //         }else{
//         //             section6_sec5_scroll= section6_sec5_scroll-0.5;
//         //         }
//         //         break;
//             //  case 0: 
//             //  section5_right.style.width = "40%";
//             //  section5_left.style.width = "55%";
//             //  section6_val++;
//             //  break;
//             //  case 30:
//             //      ///////////Hiding Sction3 for get better results in  animations////////////////////////////
//             //      section4.style.display = "none"

//             //      section5_img.style.clipPath = "polygon(0% 0%, 100% 0%, 0% 100%)";
//             //      section5_alt_img.style.display= "block";
//             //      section5_alt_img.style.clipPath = "polygon(100% 100%, 0% 100%, 100% 0%)";
                
//             //      section6_val++;

//             //      break;
           
//             //  default: 
//             //  section6_val--;
//             // } 

//          if(section5_scrollVal == 10){

//             setTimeout(function(){
            
//                 section5_right.style.scale = 0;
//                 section5_scrollVal = 5
//             },2000)
//         }
//           else if(section5_scrollVal == 20){
//             section5_right.style.width = "50%";
//                     section5_left.style.width = "45%";
//                 section5_left.style.transform = `translateX(${section5_val}vw)`;
        
//                 if(section5_val == -50){
//                     section5_scrollVal = 15;
//                 }else{
//                     section5_val --;
//                 }
//             }else if(section5_scrollVal > 0){
//                 section5_scrollVal --;
//             }
//             if(section5_scrollVal == 0){

           

//         section4_img_scale.style.scale = "0.9";
//         section4_img_scale.style.scale = "0.8";
//         setTimeout(function(){
//         section4.style.transform = `translateX(${defValue}vw) translateY(-50%)`;
//     },2000)
//         if(defValue == 100 || defValue > 100){
//             section4.style.scale = "0.9";
//             section4.style.scale = "1";
            
            

//         }else{
//            defValue = defValue+1;
//         }
//             }

//     }else{
//         section4.style.transform = "translateX(100vw) translateY(-50%)";
//         defValue = 100;
//     }
//     // console.log(lastScrollTop)
//     //  <= 0 ? 0 : st; // For Mobile or negative scrolling
   
//     (function(){
//     if( st < lastScrollTop){
//         console.log(st < lastScrollTop);
//         console.log(hasRuned)
//     }
//    console.log(hasRuned)
//     if(hasRuned == true){
//         lastScrollTop = st;
       
//     }
//     hasRuned = false;
// })()

//   }