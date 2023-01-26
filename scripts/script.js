/* 
    Created: 18 Feb 2022
    Updated:  2 Jul 2022
    Author : Elias Faisal
             http://github.com/eliasfaisal/
    License: CC0-1.0 license
 */

 onresize = ()=>{
	$("#content").style.height = innerHeight - $("#bar").offsetHeight + 'px';
	$("#filesContainer").style.height = innerHeight - $("#bar").offsetHeight - $("#header").offsetHeight + "px";
}
onresize();

onload = ()=>{
	$("#header").scroll(1,0);
	loadConfig();
}

function getDate(str, joiner = " / ") {
	let conv = {
		"jan":1,
		"feb":2,
		"mar":3,
		"apr":4,
		"may":5,
		"jun":6,
		"jul":7,
		"aug":8,
		"sep":9,
		"oct":10,
		"nov":11,
		"dec":12
	};

	str = str.split(",")[1].split(" ");
	str.splice(0,1);
	str.splice(4,1);
	str.splice(3,1);
	str[1] = [conv[str[1].toLowerCase()]];
	return str.join(joiner);
}

function fetchSize(id,url) {
	let xhr = new XMLHttpRequest;
	xhr.open("head",url);
	xhr.id = id;
	xhr.onload = (e)=>{
		let me = e.target;
		let date = getDate(me.getResponseHeader("last-modified"))
		let size = Number(me.getResponseHeader('content-length'));
		size = (size / 1024 /1024).toFixed(1);
		$(`div[timeID='${me.id}']`).querySelector(".size").innerHTML = `${date} • ${size} MB`;
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
	let semester = $("#semester").value;
	$("#current-content").innerHTML = "<option>Subject</option><option>All</option>";

	for(let sub in config[semester].subjects){
		$("#current-content").innerHTML += `<option value="${sub}">${config[semester].subjects[sub].name}</option>`;
	}
	$("#loading").style.display = "none";
}

function parseContent() {
	let semester = $("#semester").value;
	let sub = $("#current-content").value;
	let files = [];
	if(sub == "Subject"){
		return 0;
	}
	if(sub == "All"){
		for(let s in config[semester].subjects){
			files = [...files, [config[semester].subjects[s].files, s]];
		}
		let out = "";
		let fetchStack = [];
		for(let g of files){
			for(let file of g[0]){
                                let exts = file.split(".");
				let ext = exts[exts.length-1];
				exts.pop();
				let name = exts.join(".");
                                delete(exts);
				let link = `subjects/${config[semester].folder}/${g[1]}/${file}`;
				let tID = Math.random();
				out += `<div timeID="${tID}" class="link-holder">
						<a title="${name}" class="file" target="_blank" href="${link}">
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
		$("#filesContainer").innerHTML = out;
		for(let ff of fetchStack){
			fetchSize(ff[1], ff[0]);
		}
		return 0;
	}else{
		files = config[semester].subjects[sub].files;
	}

	let out = "";
	let fetchStack = [];

	for(let file of files){
		let exts = file.split(".");
		let ext = exts[exts.length-1];
		exts.pop();
		let name = exts.join(".");
                delete(exts);
		let link = `subjects/${config[semester].folder}/${sub}/${file}`;
		let tID = Math.random();
		out += `<div timeID="${tID}" class="link-holder">
				<a title="${name}" class="file" target="_blank" href="${link}">
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
	$("#filesContainer").innerHTML = out;
	for(let ff of fetchStack){
		fetchSize(ff[1], ff[0]);
	}
}

// Events

$("#semester").onchange = ()=>{
	parseData();
}

$("#current-content").onchange = ()=>{
	parseContent();
}

$("#search").onchange = (e)=>{
	let me = e.target;
	if(me.value == ""){
		//show all
		for(let file of $$("div[timeID]")){
			file.style.display = "";
		}
	}else{
		let inputs = $$("a.file .name");
		for(let inp of inputs){
			if(inp.value.toLowerCase().includes( me.value.toLowerCase() ) == false){
				inp.parentElement.parentElement.parentElement.parentElement.style.display = "none";
			}else{
				inp.parentElement.parentElement.parentElement.parentElement.style.display = "";
			}
		}
	}
}

$("#header").onscroll = (e)=>{
	let me = e.target;
	let out = "";
	if(me.scrollLeft <= 5){
		out += `#header::after{
			content:"";
			left: 0px;
			display:none;
		}`;
	}else{
		out+= `#header::after{
			content: '';
			left: ${me.scrollLeft}px;
		}`;
	}

	if(me.scrollLeft + me.offsetWidth >= me.scrollWidth-5){
		out += `#header::before{
			content:"";
			display:none;
		}`;
	}else{
		out+= `#header::before{
			content: '';
			left: ${me.scrollLeft + me.offsetWidth - 30}px;
		}`;
	}
	$("#headerStyler").innerHTML = out;
}
