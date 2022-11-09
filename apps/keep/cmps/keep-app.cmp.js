import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteList from './note-list.cmp.js'
import noteEdit from './note-edit.cmp.js'

export default {
    template: `
        <section class="note-app">Im Keep
        <note-edit @add="addNew"/>
        <note-list v-if="notes.length" 
            :notes="notes" @save="save"/>
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
        save(note) {
            noteService.save(note).then((note) => {
                showSuccessMsg(`Note ${note.id} saved...`)
            }
            )
        },
        addNew(note) {
            this.notes.push(note)
        }
    },
    computed: {
        notesToShow() {
            return notes
        }
    },
    components: {
        noteList,
        noteEdit
    }
}