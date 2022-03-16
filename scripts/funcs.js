/*
    Created: 19 Feb 2022
    by @EliasFaisal82 (fb)
*/

maps = {};
function loadMaps() {
    let f = ["professions", "semester-1-subjects", "semester-2-subjects"];
    //
    for (let e of f) {
        let reg = new XMLHttpRequest;
        reg.open('get', 'subjects/' + e + ".json");
        reg.nnn = e;
        reg.onload = (e)=>{
            window.maps[e.target.nnn] = JSON.parse(e.target.responseText);
        }
        reg.onerror = (e)=>{
            clearInterval(loading_ani_interval);
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

function loading_ani() {
    let digits = [];
    for (let i = 0; i < 12; i++) {
        digits.push(((Math.random() * 2) + '').slice(0, 1));
    }
    for (let i = 0; i < digits.length; i++) {
        $$('.digit')[i].innerHTML = digits[i];
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

activeSemester = "semester-1-subjects";

function showSubs() {
    let index = $('.profession').selectedIndex;
    let pro_name = $('.profession').children[index].getAttribute('name');
    let available_subs = maps["professions"][pro_name];

    let sub_elem_out = "";
    for (let sub_name of available_subs) {
        sub_elem_out += `<option name="${sub_name}">${maps[activeSemester][sub_name].name}</option>`;
    }

    $('.subjects').innerHTML = `<option default>المادة</option>` + sub_elem_out;
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
        size = (size / 1024 / 1024).toFixed(1) + "Mb";
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
        let link = `subjects/semester-1-subjects/${subname}/${file}`;
        //?random to pass the cache

        out += `<a href="${link}" download target="_blank" class="file">
                        <div class="file-title">
                            <div class="dnd-icon"></div>
                            <div>${name}</div>
                        </div>
                        <div class="title-sep"></div>
                        <div class="details">
                            <div timeID="${timeID}" class="size">الحجم : ${"N/A"}</div>
                            <div class="ext">الصيغة : ${getExt(file)}</div>
                        </div>
                    </a>`;
        //fetch the size
        getFileSize(link, timeID);
    }
    $(".files").innerHTML = out;
}
