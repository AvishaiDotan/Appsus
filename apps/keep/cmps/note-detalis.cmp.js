import noteTxtDetails from "./note-txt-details.cmp.js"
import noteImgDetails from "./note-img-details.cmp.js"

export default {
    props: ['note'],
    template: `
    <section class="note-details">
        <button @click="close">X</button>
        <component :is="note.type + '-details'" :note="note">
        </component>
    </section>
    `,
    methods: {
        
    },
    components: {
        noteTxtDetails,
        noteImgDetails
    },
    methods: {
        close() {
            this.note.isPicked = false
        }
    },
}