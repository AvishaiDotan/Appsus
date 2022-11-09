import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteDetails from "./note-detalis.cmp.js"

export default {
    template: `
    <section class="add-note">
        <div class="add-input-container">
            <input v-if="!isTodo" type="text" :placeholder="placeholder" v-model="txt"/>
            <div v-else class="todo-input-container">
                <input v-for="todo in newNote.info.todos" type="text" :placeholder="placeholder" v-model="todo.txt"/>
                <span @click="addTodo">+</span>
            </div>
        </div>
        <div class="add-actions">
            <span @click="addNote('txt')"><i class="fa-solid fa-font"></i></span>
            <span @click="addNote('img')"><i class="fa-solid fa-image"></i></span>
            <span @click="addNote('todo')"><i class="fa-sharp fa-solid fa-book-open"></i></span>
            <span @click="save"><i class="fa-solid fa-floppy-disk"></i></span>
        </div>





        <!-- <note-detalis v-if="isAdd" class="note-details" :note="newNote" @save="save(note)"/> -->
        <!-- <note-add-form v-if="isAdd" :newNote="newNote" @save="save"/> -->
        

        <!-- <p>{{ newNote }}</p> -->
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
            }
        },
        save() {
            if (this.newNote.type === 'note-img') this.newNote.info.url = this.txt
            else if(this.newNote.type === 'note-txt' && this.newNote.info.todos?.label) {
                this.newNote.info.todos = this.todos
                console.log(this.newNote.info.todos);
            }
            else this.newNote.info.txt = this.txt
            noteService.save(this.newNote).then((note) => {
                showSuccessMsg(`Note ${note.id} Added...`)

                this.txt = ''
                this.$emit('add', note)
            })
        },
        addTodo(){
            this.newNote.info.todos.push({ txt: "", doneAt: null })
        }
    },
    computed: {

    },
    components: {
        noteDetails
    }

}