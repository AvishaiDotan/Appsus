import keepSide from "./keep-side.cmp.js"
import keepHeader from "./keep-header.cmp.js"

export default {
    props: ['removedNotes'],
    template: `
    <keep-header/>
        <ul class="clean-list note-list">
            <li v-for="note in removedNotes" :key="note.id">
                <note-preview :note="note" @click="pickNote(note)" @remove="remove" @togglePin="togglePin" />
            </li>
        </ul>
    <keep-side @goTo="goTo(to)"/>
    `,
    created() {
        console.log(this.removedNotes)
    },
    methods: {
        goTo(to) {
            console.log('hi');
            this.$router.push(`/keep/${to}`)
        },
    },
    components: {
        keepSide,
        keepHeader
    }
}