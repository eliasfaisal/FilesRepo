## Config.json Pattern

`config.json` is located at `/subjects/`, in case of editing the default folder name,</br> must edit the scripts files too.

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
}
```