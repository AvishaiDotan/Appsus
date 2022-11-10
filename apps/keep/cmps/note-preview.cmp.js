import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteEditToolbar from "./note-edit-toolbar.cmp.js"
import noteTodo from "./note-todo.cmp.js"

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export default {
    props: ['note'],
    template: `
        <article class="note-preview" :class="setColor" @mouseleave="isMouseOver(false)" @mouseover="isMouseOver(true)">
            <component :is="note.type" :note="note">
            </component>
            <note-edit-toolbar :note="note" @changeColor="changeColor" @remove="remove" @pin="pin"/>
        </article>
    `,
    data() {
        return {
            color: null,
            hover: false
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
        remove(id) {
            noteService.remove(id).then(() => {
                showSuccessMsg(`Note ${id} Deleted...`)
                this.$emit('remove', id)
            })
        },
        isMouseOver(isOver) {
            // console.log(isOver);
            this.note.isMouseOver = isOver
            if (!isOver) this.note.ispalateClicked = false
        },
        pin(note) {
            this.$emit('pin', note)
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
        noteVideo,
        noteTodo
    }
}