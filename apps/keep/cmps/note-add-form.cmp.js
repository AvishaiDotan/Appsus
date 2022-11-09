export default {
    props: ['newNote'],
    template: `
        <section>
            <form class="add-note-form" @submit.prevent="save(newNote)">
                <input type="text" placeholder="Enter Img Url.." v-model="newNote.info.url"/>
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            imgUrl: '',
            type: ''
        }
    },
    methods: {
        save(newNote) {
            this.$emit('save', newNote)
        }
    },

}