import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteDetails from "./note-detalis.cmp.js"

export default {
    template: `
    <section class="add-note-container">
        <section class="add-note">
            <div class="add-input-container">
                <input v-if="!isTodo" type="text" :placeholder="placeholder" v-model="txt"/>
                <div v-else class="todo-input-container">
                    <input v-for="todo in newNote.info.todos" type="text" :placeholder="placeholder" v-model="todo.txt"/>
                    <span @click="addTodo">+</span>
                </div>
            </div>
            <div class="add-actions">
                <span @click="addNote('txt')" title="Add Text"><i class="fa-solid fa-font"></i></span>
                <span @click="addNote('img')" title="Add Img"><i class="fa-solid fa-image"></i></span>
                <span @click="addNote('todo')" title="Add Todos"><i class="fa-sharp fa-solid fa-book-open"></i></span>
                <span @click="addNote('video')" title="Add Video"><i class="fa-solid fa-video"></i></span>
                <span @click="save" title="Save note"><i class="fa-solid fa-floppy-disk"></i></span>
            </div>
        </section>
    </section>
    `,
    data() {
        return {
            newNote: noteService.getEmptyNote('note-txt', false, { txt: this.txt }, null),
            txt: '',
            isAdd: false,
            placeholder: 'Write Note...',
            isTodo: false,
            todos: []
        }
    },
    created() {

    },
    methods: {
        addNote(type) {
            switch (type) {
                case 'txt':
                    this.isTodo = false
                    this.placeholder = 'Write Note...'
                    this.newNote = noteService.getEmptyNote('note-txt', false, { txt: '' }, null)
                    break
                case 'img':
                    this.isTodo = false
                    this.placeholder = 'Enter Image Url'
                    this.newNote = noteService.getEmptyNote('note-img', false, { url: '', title: '' }, null)
                    break
                case 'todo':
                    this.isTodo = true
                    this.placeholder = 'Write Note...'
                    this.newNote = noteService.getEmptyNote("note-txt", false, {
                        label: "Label",
                        todos: [{ txt: "", doneAt: null }]
                    })
                    break
                case 'video':
                    this.isTodo = false
                    this.placeholder = 'Enter Video Url'
                    this.newNote = noteService.getEmptyNote('note-video', false, { url: '', title: '' }, null)
                    break
            }
        },
        save() {
            if (this.newNote.type === 'note-img' || this.newNote.type ==='note-video') this.newNote.info.url = this.txt
            else if (this.newNote.type === 'note-txt' && this.newNote.info.todos?.label) {
                this.newNote.info.todos = this.todos
                console.log(this.newNote.info.todos);
            }
            else this.newNote.info.txt = this.txt
            noteService.save(this.newNote).then((note) => {
                showSuccessMsg(`Note ${note.id} Added...`)

                this.txt = ''
                this.$emit('add', note)
            })
            this.newNote = noteService.getEmptyNote('note-txt', false, { txt: this.txt }, null)
        },
        addTodo() {
            this.newNote.info.todos.push({ txt: "", doneAt: null })
        }
    },
    computed: {

    },
    components: {
        noteDetails
    }

}