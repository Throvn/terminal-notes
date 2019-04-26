const fs = require('fs')
var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString)
    } catch (e) {
        return []

    }
}

var addNote = (title, body) => {
    var notes = fetchNotes()
    var note = {
        title,
        body
    }

    var duplicateNotes = notes.filter((note) => note.title === title )
    if (duplicateNotes.length === 0) {
        notes.push(note)
        saveNotes(notes)
        return note
    }

    
}
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}


var getAll = () => {
    return fetchNotes()
}
var getNote = (title) => {
    var notes = fetchNotes()
    const newNote = notes.filter((note) => note.title === title)
    return newNote
}
var removeNote = (title) => {
    var notes = fetchNotes()
    const newNotes = notes.filter((note) => note.title.toLowerCase() !== title.toLowerCase())
    saveNotes(notes.filter((note) => note.title !== title))
    return notes.length !== newNotes.length
}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}