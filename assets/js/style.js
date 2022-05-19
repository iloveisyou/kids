"use strict";

//주소 파라미터
let getUrlParam = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//파라미터를 아이프레임으로
if(getUrlParam("iframeId")){
    if(getUrlParam("iframeId")=="curriculum_form" || getUrlParam("iframeId")=="curriculum_setting" || getUrlParam("iframeId")=="parents_info" || getUrlParam("iframeId")=="parents_banner" || getUrlParam("iframeId")=="pet_setting" || getUrlParam("iframeId")=="pet_list" || getUrlParam("iframeId")=="phrase_setting"){
        //let wrapContainer = document.querySelectorAll("#wrap_container")[0];
        //document.querySelectorAll("#wrap_container")[0].setAttribute("src", "./html/lms/" + getUrlParam("iframeId") + ".html");
        document.querySelectorAll("#wrap_container")[0].setAttribute("src", getUrlParam("iframeId") + ".html");
    }   
}

//로컬 파비콘
if(location.host.indexOf("localhost") > -1){
    document.querySelectorAll("link[rel*='icon")[0].setAttribute("href", document.querySelectorAll("link[rel*='icon")[0].getAttribute("href").slice(0,-4) + "_local" + document.querySelectorAll("link[rel*='icon")[0].getAttribute("href").slice(-4));
}

let inputFile = (obj, iv) => {
    let iFile = obj.previousElementSibling.previousElementSibling;
    iFile.click();
    iFile.onchange = function(event){
        iFile.nextElementSibling.value = this.value;
        if(iv = "imgView" && (iFile.files && iFile.files[0])){
            const reader = new FileReader();
            reader.readAsDataURL(iFile.files[0]);
            reader.onload = function(e) {
                const imgTag = document.createElement("img");
                imgTag.setAttribute("src", e.target.result);
                iFile.previousElementSibling.appendChild(imgTag);
            }
            reader.onerror = function() {
                console.log("file img load error");
            }
        }
    };
}
