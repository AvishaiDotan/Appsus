export default {
    props: ['note'],
    template: `
        <article class="note-img-preview">
            <h3>im {{note.type}}</h3>
            <img :src="imgUrl" />
        </article>
    `
    ,
    computed: {
        imgUrl() {
            return this.note.info.url
        }
    }
}
