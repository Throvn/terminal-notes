# terminal-notes
Pure JS commandline-app for taking, listing and removing simple notes.

**To run:** Simply navigate to the directory and run ``node app.js``

The notes are saved on your local machine in a file called ``notes-data.json`` in the same directory.

### Possible commands:

_Before every command you have to write ``node app.js``_

* list
  * lists all notes
  
* add
  * requires: ``--title="Your Title"`` and ``--body="Your body"``
  * alternatively: ``-t="Your Title"`` and ``-b="Your body"``
  
* remove
  * requires: ``--title="Exact title of the note you want to remove", or ``-t="Exact Title"``
  * If the title is not spelled exactly as the title of the note you want to remove, it wont work. Capitalisation however can be ignored.
