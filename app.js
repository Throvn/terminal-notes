const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')
const yargsTitle = {title:{
    describe: 'Title of note',
    demand: true,
    alias: 't'
    }}
const argv = yargs.command('add','add a new note', {
    title: {
        describe: 'Title of note',
        demand: true,
        alias: 't'
    },
    body: {
        describe: 'Body of note',
        demand: true,
        alias: 'b'
    }
})
.command(
    'list', 'list all notes',
    yargsTitle
).command('read', 'Read the note', yargsTitle).command(
    'remove', 'Remove Note by Title', yargsTitle
).help().argv
const command = argv._[0]

if (command === 'list') {
    var allNotes = notes.getAll();
    console.log('Printing ',notes.getAll().length, ' note(s)')
    allNotes.forEach((note) => {
        console.log('----');
        console.log('Title: '+ note.title);
        console.log('Body: ' + note.body);
        
    });
} else if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body)
    if (note === undefined) {
        console.log('Note Title already exists');
        
    } else {
        console.log('Note created:'+note.title+', '+note.body);
        
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title)
    var message = noteRemoved ? 'Note: '+ argv.title+ ' removed' : 'Note not found.'
    console.log(message);
    
} else if (command === 'read') {
    var note = notes.getNote(argv.title)
    
    if (note[0] === undefined) {
        console.log('Note not found');
        
    } else {
        
        console.log('Note: ' + note[0].title + ', ' + note[0].body);
    }
} else {
    console.log('command not found');
}