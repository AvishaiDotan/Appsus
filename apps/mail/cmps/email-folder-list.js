export default {
    props: ['emails'],
    template:`
        <section>
            <p>count {{ unreadEmailsCount }}</p>
            <button @click.stop="$emit('compose-mail')">Compose</button>
        </section>
    `,
    data(){
        return {
           
        }
    },
    computed:{
        // Use Reduce
        unreadEmailsCount() {
            let count = 0
            this.emails.forEach(email => {
                if (!email.isRead) count++
            })
            return count
        }
    },
    methods: {
    },
    created() {
    },
}