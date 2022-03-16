/*
    Omeration's Educational Castle | Open Exams Project
    ===================================================
    Created: 17:23 | 24 Jan 2022
    Open Exams Project : oec-project (github)
    programmedd by @EliasFaisal82 (fb)

*/

function $(s) {
    return document.querySelector(s);
}

function $$(s) {
    return document.querySelectorAll(s);
}

function _(t) {
    var tagName, id, classes = [];
    if (t.includes("#")) {
        t = t.split('#');
        tagName = t[0];
        var b = t[1];
        if (b.includes('.')) {
            b = b.split('.');
            id = b[0];
            for (var i = 1; i < b.length; i++) {
                classes.push(b[i]);
            }
        } else {
            id = b;
        }
        //console.log(tagName)
        //console.log(id)
        //console.log(classes)
    } else if (t.includes(".")) {
        t = t.split('.');
        tagName = t[0];
        for (var i = 1; i < t.length; i++) {
            classes.push(t[i]);
        }
        //console.log(tagName)
        //console.log(classes)
    } else {
        tagName = t;
    }

    var e = document.createElement(tagName);
    for (var i = 0; i < classes.length; i++) {
        e.classList.add(classes[i]);
    }
    if (id) {
        e.id = id
    }
    ;return e;
}

console.log("presets.js loaded.");
