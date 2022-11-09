import notePreview from "./note-preview.cmp.js"
import noteDetalis from "./note-detalis.cmp.js"

export default {
    props: ['notes'],
    template: `
    <section class="note-list-container">
            <ul class="clean-list note-list">
                <li v-for="note in notes" :key="note.id">
                        <note-preview :note="note" @click="pickNote(note)"/>
                        <note-detalis v-if="note.isPicked" class="note-details" :note="note"/>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        pickNote(note) {
            note.isPicked = true
        }
    },
    components: {
        notePreview,
        noteDetalis
    }

}