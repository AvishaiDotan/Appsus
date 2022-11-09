import { noteService } from "../services/note.service.js"

export default {
    template: `
    <section class="add-note">
    <input type="text" placeholder="Write Note.." v-model="txt"/>
    <button @click="addNoteTxt"><i class="fa-solid fa-arrow-right"></i></button>
    <button @click="addNoteImg"><i class="fa-solid fa-image"></i></button>
    <button><i class="fa-sharp fa-solid fa-note"></i></button>
    </section>
    `,
    data() {
        return {
            note: null,
            txt: ''
        }
    },
    created() {

    },
    methods: {
        addNoteTxt() {
            const newNote = noteService.getEmptyNote('note-txt', false, { txt: this.txt }, null)
        },
        addNoteImg() {

        }
    },
    computed: {

    }

}