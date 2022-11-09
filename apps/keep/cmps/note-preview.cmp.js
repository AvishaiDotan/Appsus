import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"

export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <component :is="note.type" :note="note">
            </component>
        </article>
    `,
    data() {
        return {

        }
    },
    components: {
        noteTxt,
        noteImg
    }
}