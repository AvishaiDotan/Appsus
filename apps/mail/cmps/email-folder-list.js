export default {
    template:`
        <section>
            <button @click.stop="$emit('compose-mail')">Compose</button>
        </section>
    `,
    data(){
        return {
           
        }
    },
    computed:{
    },
    methods: {
    }
}