import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteEditToolbar from "./note-edit-toolbar.cmp.js"

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export default {
    props: ['note'],
    template: `
        <article class="note-preview" :class="setColor">
            <component :is="note.type" :note="note" @todoDone="updateTodo(note)">
            </component>
            <note-edit-toolbar :note="note" @changeColor="changeColor" @togglePin="togglePin" @remove="remove"/>
        </article>
    `,
    data() {
        return {
            color: null
        }
    },
    methods: {
        updateTodo(note) {
            noteService.save(note).then(() => console.log('saved todo'))
        },
        changeColor(color) {
            this.note.color = color
            noteService.save(this.note).then(() => console.log('saved color'))
        },
        togglePin(note) {
            // this.$emit('togglePin', note.id)
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
    components: {
        noteTxt,
        noteImg,
        noteEditToolbar,
        noteVideo
    }
}