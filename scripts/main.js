/* 
    Author : Elias Faisal
             http://github.com/eliasfaisal/
    License: CC0-1.0 license

    B64-Message(3): aHVtYW4gbXVzdCB1c2UgaGlzIGJyYWluIHRoZSBwcm9wZXIgd2F5LiB0aGFua3MgZm9yIHlvdXIgdGltZSByZWFkaW5nIHRoaXM=
 */

console.log(`gotcha, trying to inspect the code 😶️,
better see the github repo: http://github.com/eliasfaisal/
you may find more details or maybe not 👀️
have a nice day 👋️😶️`);

onload = ()=>{
    onresize();
    loadConfig();
}

//menu btn
$("#menu-btn").onclick = ()=>{
    if($("#about-widget").style.top == "-100%"){
        $("#about-widget").style.top = "0";
        $("#menu-btn >.icon").style.transform = "rotateZ(90deg)";
    }else{
        $("#about-widget").style.top = "-100%";
        $("#menu-btn >.icon").style.transform = "rotateZ(0deg)";
    }
}


// search
$("#search-btn").onclick = ()=>{
    $("#menu-btn").style.right = "-37px";
    $("#search-bar").style.top = "0px";
    $("#search-input").focus();
}

$("#run-search-btn").onclick = ()=>{
    searchFile($("#search-input").value);
}

$("#close-search-btn").onclick = ()=>{
    $("#menu-btn").style.right = "10px";
    $("#search-bar").style.top = "-50px";
    $("#search-input").value = "";
    //show all
    for(let file of $$("div[timeID]")){
        file.style.display = "";
    }
}

$("#search-input").onchange = (e)=>{
    searchFile(e.target.value);
}

//select input
$("#selected-subject-control").onchange = (e)=>{
    $("#selected-subject > .text").innerHTML = e.target.selectedOptions[0].innerText;
    parseContent();
}
$("#selected-semester-control").onchange = (e)=>{
    $("#selected-semester > .text").innerHTML = e.target.selectedOptions[0].innerText;
    parseData();
}



// functions

function searchFile(text){
    if(text == ""){
        return false;
    }else{
        let inputs = $$("a.file .name");
        for(let inp of inputs){
            if(inp.value.toLowerCase().includes( text.toLowerCase() ) == false){
                inp.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            }else{
                inp.parentElement.parentElement.parentElement.parentElement.style.display = "";
            }
        }
    }
}

function fetchSize(id,url) {
    let xhr = new XMLHttpRequest;
    xhr.open("head",url);
    xhr.id = id;
    xhr.onload = (e)=>{
        let me = e.target;
        let size = Number(me.getResponseHeader('content-length'));
        size = (size / 1024 /1024).toFixed(1);
        $(`div[timeID='${me.id}']`).querySelector(".size").innerHTML = `${size} MB`;
    }
    xhr.send();
}

function loadConfig() {
    let xhr = new XMLHttpRequest;
    xhr.open("get","subjects/config.json");
    xhr.onload = (e)=>{
        window.config = JSON.parse( e.target.responseText );
        parseData();
    }
    xhr.send();
}

function parseData() {
    let semester = $("#selected-semester-control").value;
    $("#selected-subject-control").innerHTML = "<option>Subject</option><option>All</option>";

    for(let sub in config[semester].subjects){
        $("#selected-subject-control").innerHTML += `<option value="${sub}">${config[semester].subjects[sub].name}</option>`;
        $("#selected-subject > .text").innerHTML = $("#selected-subject-control").selectedOptions[0].innerText;
    }
    $("#loading-widget").style.display = "none";
}

function parseContent() {
    let semester = $("#selected-semester-control").value;
    let sub = $("#selected-subject-control").value;
    let files = [];
    if(sub == "Subject"){
        return 0;
    }

    // when "All" option is selected

    if(sub == "All"){
        for(let s in config[semester].subjects){
            files = [...files, [config[semester].subjects[s].files, s]];
        }
        let out = "";
        let fetchStack = [];
        let fcount = 0;
        for(let g of files){
            fcount += g[0].length;
            for(let file of g[0]){
                let name = file.split(".")[0];
                let ext = file.split(".")[1];
                let link = `subjects/${config[semester].folder}/${g[1]}/${file}`;
                let tID = Math.random();
                out += `<div timeID="${tID}" class="link-holder">
                        <a title="${name}" class="file" href="${link}">
                            <div class="ext">${ext}</div>
                            <div class="details">
                                <div class="overlay">
                                    <input disabled value="${name}" class="name" />
                                </div>
                                <div class="size">....</div>
                            </div>
                        </a>
                    </div>`;
                fetchStack.push([link,tID]);
            }
        }
        if(fcount > 1){
            $(".count").innerHTML = fcount + " Files";
        }else{
            $(".count").innerHTML = "1 File";
        }
        $("#files-conainer").innerHTML = out;
        for(let ff of fetchStack){
            fetchSize(ff[1], ff[0]);
        }
        return 0;
    }else{
        files = config[semester].subjects[sub].files;
    }

    // when a subject is selected

    let out = "";
    let fetchStack = [];

    for(let file of files){
        let name = file.split(".")[0];
        let ext = file.split(".")[1];
        let link = `subjects/${config[semester].folder}/${sub}/${file}`;
        let tID = Math.random();
        out += `<div timeID="${tID}" class="link-holder">
                <a title="${name}" class="file" href="${link}">
                    <div class="ext">${ext}</div>
                    <div class="details">
                        <div class="overlay">
                            <input disabled value="${name}" class="name" />
                        </div>
                        <div class="size">....</div>
                    </div>
                </a>
            </div>`;
        fetchStack.push([link,tID]);
    }
    if(files.length > 1){
        $(".count").innerHTML = files.length + " Files";
    }else{
        $(".count").innerHTML = "1 File";
    }
    $("#files-conainer").innerHTML = out;
    for(let ff of fetchStack){
        fetchSize(ff[1], ff[0]);
    }
}