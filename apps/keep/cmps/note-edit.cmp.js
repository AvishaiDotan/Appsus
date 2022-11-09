import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteDetalis from "./note-detalis.cmp.js"

export default {
    template: `
    <section class="add-note">
        <input type="text" placeholder="Write Note.." v-model="txt"/>
        <input v-if="isImgAdd" type="text" placeholder="Enter Img Url.." v-model="imgUrl"/>
        <button @click="addNoteTxt"><i class="fa-solid fa-arrow-right"></i></button>
        <button @click="addNote('img')"><i class="fa-solid fa-image"></i></button>
        <button><i class="fa-sharp fa-solid fa-note"></i></button>
        <note-detalis v-if="isAdd" class="note-details" :note="newNote" @save="save(note)"/>

    </section>
    `,
    data() {
        return {
            note: null,
            newNote: null,
            txt: '',
            imgUrl: '',
            isImgAdd: false,
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
        }
    },
    computed: {

    },
    components: {
        noteDetalis
    }

}