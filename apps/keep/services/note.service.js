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
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote("note-txt", false, { txt: "Fullstack Me Baby!" }))
        notes.push(_createNote("note-img", false, { url: "https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", title: "Bobi and Me" }, { backgroundColor: "#00d" }))
        notes.push(_createNote("note-todo", false, {
            label: "Get my stuff together",
            todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: null }]
        }))
        notes.push(_createNote("note-txt", false, { txt: "Hey" }))
        notes.push(_createNote("note-txt", false, { txt: "Remember!" }))
        notes.push(_createNote("note-todo", false, {
            label: "Shopping List",
            todos: [{ txt: "Milk", doneAt: null }, { txt: "Eggs", doneAt: null }, { txt: "Bread", doneAt: null },]
        }))
        notes.push(_createNote("note-img", false, { url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", title: "Bobi and Me" }, { backgroundColor: "#00d" }))
        notes.push(_createNote("note-img", false, { url: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80", title: "Bobi and Me" }, { backgroundColor: "#00d" }))
        // notes.push(_createNote('note-video', false, { url: 'https://www.youtube.com/watch?v=qZXt1Aom3Cs&ab_channel=TraversyMedia', title: 'Vue' }, null))
        // notes.push(_createNote('note-video', false, { url: 'https://www.youtube.com/watch?v=dCYDZDlcO6g&ab_channel=TaylorTries', title: 'Jugling' }, null))



        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}

function _createNote(type, isPinned, info, style = null) {
    const note = getEmptyNote(type, isPinned, info, style)
    note.id = utilService.makeId()
    return note
}

