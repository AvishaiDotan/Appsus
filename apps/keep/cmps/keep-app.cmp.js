import { noteService } from '../services/note.service.js'

import noteList from './note-list.cmp.js'
import noteAdd from './note-add.cmp.js'

export default {
    template: `
        <section class="note-app">Im Keep
        <note-add/>
        <note-list v-if="notes.length" 
            :notes="notes"/>
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
            })
    },
    methods: {

    },
    computed: {
        notesToShow() {
            return notes
        }
    },
    components: {
        noteList,
        noteAdd
    }
}