import noteTxtDetails from "./note-txt-details.cmp.js"
import noteImgDetails from "./note-img-details.cmp.js"

export default {
    props: ['note'],
    template: `
    <section class="note-details">
        <button @click="close">X</button>
        <button @click="save">Save</button>
        <component :is="note.type + '-details'" :note="note">
        </component>
    </section>
    `,
    data() {
        return {
            txt: '',
            todos: []
        }
    },
    created() {
        this.txt = this.note.info.txt || null
        // this.todos ? [...this.note.info.todos] : null
    },
    methods: {

    },
    components: {
        noteTxtDetails,
        noteImgDetails
    },
    methods: {
        close() {
            this.note.isPicked = false
            if (this.txt) this.note.info.txt = this.txt
            // else this.note.info.todos = this.todos
        },
        save() {
            this.$emit('save')

            this.note.isPicked = false
        }
    },
}