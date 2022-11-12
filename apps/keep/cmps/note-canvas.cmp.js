export default {
    props: ['note'],
    template: `
        <section class="note-canvas-preview">
            <h3>{{note.info.title}}</h3>
            <img :src="dataUrl" />
        </section>
    `,
    computed: {
        dataUrl() {
            return this.note.info.dataUrl
        }
    }
}