import noteTxtDetails from "./note-txt-details.cmp.js"
import noteImgDetails from "./note-img-details.cmp.js"
import noteTodoDetails from "./note-todo-details.cmp.js"
import noteEditToolbar from "./note-edit-toolbar.cmp.js"

export default {
    props: ['note'],
    template: `
    <section class="note-details" :class="setColor">
        <component :is="note.type + '-details'" :note="note">
        </component>
        <note-edit-toolbar :note="note" :isDetails="true" @changeColor="changeColor" @remove="remove" @close="close" @save="save" class="details-toolbar"/>
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
        noteImgDetails,
        noteEditToolbar,
        noteTodoDetails

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
        },
        changeColor(color) {
            this.note.color = color
            noteService.save(this.note).then(() => console.log('saved color'))
        },
        remove(id) {
            noteService.remove(id).then(() => {
                showSuccessMsg(`Note ${id} Deleted...`)
                this.$emit('remove', id)
            })
        }
    },
    computed: {
        setColor() {
            return this.note.color
        }
    },
}