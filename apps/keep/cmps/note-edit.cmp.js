import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteAddForm from "./note-add-form.cmp.js"

export default {
    template: `
    <section class="add-note">
        <input type="text" placeholder="Write Note.." v-model="txt"/>
        <button @click="addNoteTxt"><i class="fa-solid fa-arrow-right"></i></button>
        <button @click="addNote('img')"><i class="fa-solid fa-image"></i></button>
        <button><i class="fa-sharp fa-solid fa-note"></i></button>
        <note-add-form v-if="isAdd" :newNote="newNote" @save="save"/>
        <!-- <note-detalis v-if="isAdd" class="note-details" :note="newNote" @save="save(note)"/> -->

        <!-- <p>{{ newNote }}</p> -->
    </section>
    `,
    data() {
        return {
            note: null,
            newNote: null,
            txt: '',
            isAdd: false
        }
    },
    created() {

    },
    methods: {
        addNoteTxt() {
            const newNote = noteService.getEmptyNote('note-txt', false, { txt: this.txt }, null)
            noteService.save(newNote).then((note) => {
                showSuccessMsg(`Note ${note.id} Added...`)

                this.$emit('add', note)
            })
        },
        addNote(type) {
            switch (type) {
                case 'txt':
                    newNote = noteService.getEmptyNote('note-txt', false, { txt: this.txt }, null)
                    break
                case 'img':
                    this.isImgAdd = true
                    this.isAdd = true
                    this.newNote = noteService.getEmptyNote('note-img', false, { url: this.imgUrl, title: this.txt }, null)
                    console.log('hi');
                    break
            }
        },
        save(newNote) {
            console.log(newNote);
            noteService.save(newNote).then((note) => {
                showSuccessMsg(`Note ${note.id} Added...`)

                this.$emit('add', note)
            })
        }
    },
    computed: {

    },
    components: {
        noteAddForm
    }

}