export default {
    props: ['note'],
    template: `
        <section class="note-img-preview">
            <h3>im {{note.type}}</h3>
            <img :src="imgUrl" />
        </section>
    `
    ,
    computed: {
        imgUrl() {
            return this.note.info.url
        }
    }
}
