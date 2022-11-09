export default {
    props: ['email'],
    template:`
        <div>
            <span class="email-subject">{{email.subject}}</span>
            <span class="email-body">{{email.body}}</span>
        </div>
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