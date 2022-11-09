import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteDetails from "./note-detalis.cmp.js"

export default {
    template: `
    <section class="add-note">
        <input type="text" :placeholder="placeholder" v-model="txt"/>
        <span @click="addNote('txt')"><i class="fa-solid fa-font"></i></span>
        <span @click="addNote('img')"><i class="fa-solid fa-image"></i></span>
        <note-detalis v-if="isAdd" class="note-details" :note="newNote" @save="save(note)"/>




        <!-- <note-add-form v-if="isAdd" :newNote="newNote" @save="save"/> -->
        

        <!-- <p>{{ newNote }}</p> -->
    </section>
    `,
    data() {
        return {
            newNote: null,
            txt: '',
            isAdd: false,
            placeholder: 'Write Note...'
        }
    },
    created() {

    },
    methods: {
        addNote(type) {
            switch (type) {
                case 'txt':
                    newNote = noteService.getEmptyNote('note-txt', false, { txt: this.txt }, null)
                    break
                case 'img':
                    this.placeholder = 'Enter Image Url'
                    this.newNote = noteService.getEmptyNote('note-img', false, { url: this.txt, title: ''}, null)
                    this.isAdd = true
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
        noteDetails
    }

}