export default {
    props:['note'],
    template:`
        <img @click="editCanvas" :src="dataUrl" />
    `,
    computed: {
        dataUrl() {
            return this.note.info.dataUrl
        }
    },
    created() {
      console.log(this.note)
    },
    methods: {
      editCanvas() {
        this.$router.push(`/keep/canvas/${this.note.id}`)
      }  
    },
}