import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template:`
        <ul>
            <li v-for="email in emails">
                <email-preview @click.stop="goToMail(email.id)" :email="email"/>
            </li>
        </ul>
    `,
    computed:{
    },
    methods: {
        goToMail(id) {
            this.$router.push('/mail/' + id)
        }
    }, 
    components: {
        emailPreview,
    }

}