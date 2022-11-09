export default {
    props:['note'],
    template:`
        <img :src="imgUrl" />
    `,
    computed: {
        imgUrl() {
            return this.note.info.url
        }
    }
}