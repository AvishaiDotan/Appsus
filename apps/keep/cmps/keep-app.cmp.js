import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteList from './note-list.cmp.js'
import noteAdd from './note-add.cmp.js'
import keepHeader from './keep-header.cmp.js'
import keepSide from './keep-side.cmp.js'

export default {
    template: `
        <section class="note-app">
        <keep-header @filter="setFilter"/>
        <keep-side/>
        <section class="main-keep-layout">
            <note-add @add="addNew"/>
            <note-list v-if="notes.length"
                :notes="notesToShow" @save="save"/>
        </section>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: {
                txt: ''
            }
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
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        notesToShow() {
            if(!this.filterBy.txt.trim()) return this.notes
            const regex = new RegExp(this.filterBy.txt, 'i')
            let notes = this.notes.filter(note => {
                if (note.type === 'note-txt') {
                    const todos = note.info.todos?.length
                    const label = note.info?.labal
                    const txt = note.info?.txt
                    if (txt) return regex.test(txt)
                    else if (regex.test(label)) return true
                    else if(todos) {
                        for (var i = 0; i < todos.length; i++)
                            if (regex.test(todos[i].txt)) return true
                    }
                }
                return false
            })
            return notes
        }
    },
    components: {
        noteList,
        noteAdd,
        keepHeader,
        keepSide
    }
}