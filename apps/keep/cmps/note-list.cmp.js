import notePreview from "./note-preview.cmp.js"
import noteDetalis from "./note-detalis.cmp.js"


export default {
    props: ['notes'],
    template: `
    <section class="note-list-container">
        <ul class="clean-list note-list">
                <li v-for="note in pinnedNotes" :key="note.id">
                        <note-preview :note="note" @click="pickNote(note)" @remove="remove"/>
                        <note-detalis v-if="note.isPicked" class="note-details" :note="note" @save="save(note)"/>
                </li>
        </ul>
            <ul class="clean-list note-list">
                <li v-for="note in notes" :key="note.id">
                        <note-preview :note="note" @click="pickNote(note)" @remove="remove" @pin="pin"/>
                        <note-detalis v-if="note.isPicked" class="note-details" :note="note" @save="save(note)"/>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            pinnedNotes: []
        }
    },
    created() {
        this.notes.forEach((note, idx) => {
            note.isPicked = false
            if (note.isPinned) {
                const pinnedNote = this.notes.splice(idx, 1)
                this.pinnedNotes.push(pinnedNote)
            }
        })
    },
    methods: {
        pickNote(note) {
            note.isPicked = true
            console.log('picked');
            // this.$router.push(`/${note.id}`)
        },
        save(note) {
            this.$emit('save', note)
        },
        remove(id) {
            const idx = this.notes.findIndex(note => note.id === id)
            this.notes.splice(idx, 1)
        },
        pin(pinnedNote) {
            const idx = this.notes.findIndex(note => note.id === pinnedNote.id)
            this.notes.splice(idx, 1)
            this.pinnedNotes.push(pinnedNote)
        }
    },
    components: {
        notePreview,
        noteDetalis
    }

}