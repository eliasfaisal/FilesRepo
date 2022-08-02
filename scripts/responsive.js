/* 
    Created: 18 Feb 2022
    Updated:  2 Jul 2022
    Author : Elias Faisal
             http://github.com/eliasfaisal/
    License: CC0-1.0 license
 */

onresize = ()=>{
    $("#main-widget > .content").style.height = innerHeight - 50 + "px";
    $("#search-input").style.width = innerWidth - 104 + "px";
    //
    let w = parseInt(innerWidth / 346) * 346;
    if(w == 0 || w < 346 || innerWidth < 346){
        $("#files-conainer").style.marginLeft = "0px";
        $("#files-conainer").style.marginRight = "0px";
    }else{
        let margin = (innerWidth - w)/2 - 20;
        $("#files-conainer").style.marginLeft = margin + "px";
        $("#files-conainer").style.marginRight = margin + "px";
    }
    
}
onresize();