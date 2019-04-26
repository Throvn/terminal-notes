const fs = require('fs');
const chalk = require('chalk');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const yargsTitle = {
        title:{
        describe: 'Title of note',
        demand: true,
        alias: 't'
    }}
const argv = yargs.command(
    'add','add a new note', {
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
    }
)
.command(
    'list', 'list all notes'
).command(
    'read', 'Read the note',
    yargsTitle
).command(
    'remove', 'Remove Note by Title',
    yargsTitle
).help().argv
const command = argv._[0]

if (command === 'list') {
    var allNotes = notes.getAll();
    console.log('Printing ',chalk.green.bold(notes.getAll().length), ' note(s)')
    allNotes.forEach((note) => {
        console.log(chalk.black.bold('------'));
        console.log(chalk.bold('Title: ')+ note.title);
        console.log(chalk.bold('Body: ') + note.body);
        
    });
} else if (command === 'add') {
    if(argv.title === true || argv.body === true) return console.log(chalk.bold.yellow('Note:')+' you have to write e.g. '+chalk.italic('-b=\"Example text\"'));
    var note = notes.addNote(argv.title, argv.body)
    if (note === undefined) {
        console.log(chalk.bold.yellow('Note:')+' Title already '+chalk.red('exists'));
        
    } else {
        console.log('Note created:'+note.title+', '+note.body);
        
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title)
    var message = noteRemoved ? chalk.yellow.bold('Note: ')+chalk.bold( argv.title)+ chalk.red(' removed') : chalk.red('Note not found.')
    console.log(message);
} else if (command === 'read') {
    var note = notes.getNote(argv.title)
    
    if (note[0] === undefined) {
        console.log(chalk.bold.red('Note not found'));
        
    } else {
        console.log(chalk.bold('Note: ') + note[0].title + ', ' + note[0].body);
    }
} else {
    console.log(chalk.bold.yellow('NOTES:')+' command not found');
}