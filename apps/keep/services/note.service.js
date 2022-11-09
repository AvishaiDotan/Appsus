import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNextNoteId,
}

function query() {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = "note-txt", isPinned = false, info = { txt: "Fullstack Me Baby!" }, style = null) {
    return { id: '', type, isPinned, info }
}


function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            var idx = notes.findIndex(note => note.id === noteId)
            if (idx === notes.length - 1) idx = -1
            return notes[idx + 1].id
        })
}

function _createNotes() {
    console.log('hi');
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote("note-txt", false, { txt: "Fullstack Me Baby!" }))

        notes.push(_createNote("note-img", false, { url: "http://some-img/me", title: "Bobi and Me" }, { backgroundColor: "#00d" }))

        notes.push(_createNote("note-txt", false, {
            label: "Get my stuff together",
            todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
        }))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}

function _createNote(type, isPinned, info, style = null) {
    const note = getEmptyNote(type, isPinned, info, style)
    note.id = utilService.makeId()
    return note
}

