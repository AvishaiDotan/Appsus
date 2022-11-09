import notePreview from "./note-preview.cmp.js"
import noteDetalis from "./note-detalis.cmp.js"

export default {
    props: ['notes'],
    template: `
    <section class="note-list-container">
            <ul class="clean-list note-list">
                <li v-for="note in notes" :key="note.id">
                        <note-preview :note="note" @click="pickNote(note)"/>
                        <note-detalis v-if="note.isPicked" class="note-details" :note="note" @save="save(note)"/>
                        <!-- <router-view></router-view> -->
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
            // this.$router.push(`/${note.id}`)
        },
        save(note){
            this.$emit('save', note)
        }
    },
    components: {
        notePreview,
        noteDetalis
    }

}