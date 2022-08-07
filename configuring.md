## Configuring 

note : `config.json` is located at `/subjects/`, in case of editing the default folder name or location,</br> you must edit the scripts files too.</br> in the `main.js` change the value of the constant `SUBJECTS_LOCATION` to your desired path. and don't end the path with slash `/`.

- first copy your folder with the files you want, move it to `/subjects/semester-#number#-sujects/` and edit the `config.json` file with the pattern:

```javascript
// proper patteren
{
	"Semester 1": {
			// folder's location is in /subjects/
	        "folder": "#folder name#",
	        // any subject is defined here
	        "subjects": {
	            "#subject's folder name#": {
	                "name": "subject's name",
	                // files list in the folder
	                "files": [
	                    "file1.pdf",
	                    "file2.zip"
	                    //...
	                ]
	            },
	        }
	    }
	    //......
}
```

- in `index.html` edit the `selected-semester-control` element, by adding your desired number of children",</br>
the `selected` attibute is optional if u don't want a semester to be default. the 1st element will be selected.</br>
rename the `text` element above it with the default selected semester text e.g `Semester 1`.

```html
<div class="text">Semester 3</div>
<!--  -->
<select class="custom-select-cont" id="selected-semester-control">
	<option>Semester 1</option>
	<option>Semester 2</option>
	<option selected>Semester 3</option>
	<!-- and so on -->
</select>
``` 