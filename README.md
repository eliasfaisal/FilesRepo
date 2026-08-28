<img align="right" height="177px" src="assets/icon.svg" /> Files Repository
====
This is the official repository of academic materials for `Software Engineering - Batch 11 (2021)`, College of Computer Science and Information Technology, Karary University, it containing files (`docx`,`pptx`,`pdf`,`zip`, and others) for the `sheets`, `papers`, `lectures`, `references` and `notes` taken by different contributors.<br/><br/>
[Visit Site ↗️](https://eliasfaisal.github.io/FilesRepo/)

### Related Sites
<img height="26px" src="https://altneene.github.io/Sadaga/vite.svg"/> [Sadaga](https://altneene.github.io/Sadaga/) <br/>
<img height="26px" src="https://railway.com/favicons/favicon-dark.ico"/> [منصة الدفعة 12](https://web-production-23394.up.railway.app/)


### Brief of How Content Updating Works
This repository is using on a workflow that runs a python script `setup.py` when triggered by a push request.
the script centers inside the folder `setup`, reads the file `init.setup`, opens and updates the file `config.json` that contains map of all files in all semesters then copies of the files to their specified destination.
if you're adding files to non-existing `semester` folder, you will need to update select tag inside `index.html` manually.
#### The Setup File `init.setup`
This file contains the information about where to the put the files uploaded by which `semester` and which `material/subject` folder,
and consists of 3 lines:
```
Subject Name (optional if folder exists)
subject folder
semester number
```
<i/>More details on [`configuring.md`](https://github.com/eliasfaisal/FilesRepo/blob/main/configuring.md) on branch [prototype](https://github.com/eliasfaisal/FilesRepo/tree/prototype), if you're planning to clone/build your own repo.</i>
