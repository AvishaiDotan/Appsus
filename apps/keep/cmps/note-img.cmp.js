export default {
    props: ['note'],
    template: `
        <section class="note-img-preview">
            <h3>{{note.info.title}}</h3>
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
