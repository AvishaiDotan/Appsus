import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template:`
        <ul>
            <li v-for="email in emails">
                <email-preview :email="email"/>
            </li>
        </ul>
    `,
    computed:{
    },
    methods: {
    }, 
    components: {
        emailPreview,
    }

}