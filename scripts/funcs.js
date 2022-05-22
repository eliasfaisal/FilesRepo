/*
    Created: 18 Feb 2022
    Author : Elias Faisal
             http://github.com/eliasfaisal/
    License: CC0-1.0 license
*/

maps = {};
function loadMaps() {
    let f = ["professions", "semester-1-subjects", "semester-2-subjects"];
    //
    for (let e of f) {
        let reg = new XMLHttpRequest;
        reg.open('get', `subjects/${e}.json?r=${Math.random()}`);
        reg.nnn = e;
        reg.onload = (e)=>{
            window.maps[e.target.nnn] = JSON.parse(e.target.responseText);
        }
        reg.onerror = (e)=>{
            clearInterval(mapsIntervalID);

            for (let digit of $$(".digit")) {
                digit.innerHTML = "";
            }
            $$(".digit")[0].innerHTML = "NET_ERR";
            console.log("NET_ERR");
        }
        reg.send()
    }

}

function hideLoading() {
    $("main").style.transition = "300ms cubic-bezier(0.18, 0.89, 0.32, 1.28)";
    $("main").style.opacity = "1";
    $("main").style.transform = "scale(1)";
    $("#loading_widget").style.transform = "scale(1.1)";
    $("#loading_widget").style.opacity = "0";
    setTimeout(()=>{
        $("#loading_widget").style.display = "none";
        setTimeout(()=>{
            $('body').removeAttribute('style');
        }
        , 100);
    }
    , 300);
}

//

activeSemester = "semester-2-subjects";

function showSubs() {
    let index = $('.department').selectedIndex;
    let pro_name = $('.department').children[index].getAttribute('name');
    let available_subs = maps["professions"][activeSemester][pro_name];

    let sub_elem_out = "";
    for (let sub_name of available_subs) {
        sub_elem_out += `<option name="${sub_name}">${maps[activeSemester][sub_name].name}</option>`;
    }

    $('.subjects').innerHTML = `<option default>Subject</option>` + sub_elem_out;
    $('.subjects').disabled = false;
}

//
//get any file extension
function getExt(text) {
    text = text.split('.');
    return text[1].toUpperCase();
}

//get file size 

function getFileSize(link, timeID) {
    let reg = new XMLHttpRequest;
    reg.open("head", link);
    reg.timeID = timeID;
    reg.onload = (e)=>{
        let me = e.target;
        let size = parseInt(me.getResponseHeader('content-length'));
        size = (size / 1024 / 1024).toFixed(1) + " MB";
        let elem = $(`div[timeID='${me.timeID}']`);
        elem.innerHTML = elem.innerHTML.replace("N/A", ` ${size} `);
    }
    reg.send();
}

//append elements in the files area with the downloadable file
function appendFiles(semester, subname) {
    let sb = maps[semester][subname];
    let files = sb.files;
    let out = "";
    for (let file of files) {
        let name = file.split(".");
        name.pop();
        name = name.join('');

        let timeID = Math.random();
        let link = `subjects/${activeSemester}/${subname}/${file}`;
        //?random to pass the cache

        out += `<a href="${link}" download target="_blank" class="file">
                        <div class="file-title">
                            <!-- <div class="dnd-icon"></div> -->
                            <div>${name}</div>
                        </div>
                        <div class="title-sep"></div>
                        <div class="details">
                            <div timeID="${timeID}" class="size">${"N/A"}</div>•
                            <div class="ext">${getExt(file)}</div>
                        </div>
                    </a>`;
        //fetch the size
        getFileSize(link, timeID);
    }
    $(".files").innerHTML = out;
}

//

function showMsg(ms=3000) {
    $("#msg").style.display = "block";
    setTimeout(()=>{
        $("#msg").style.opacity = "1";
    }
    , 0)
    setTimeout((mss=ms)=>{
        $("#msg").style.opacity = "0";
        setTimeout(()=>{
            $("#msg").style.display = "none";
        }
        , mss);
    }
    , ms);

}
