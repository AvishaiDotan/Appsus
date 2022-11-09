export default {
    props: ['email'],
    template:`
        <div>
            <span class="email-subject">{{email.subject}}</span>
            <span :style="getReadStyle" class="email-body">{{email.body}}</span>
        </div>
    `,
    data(){
        return {
           
        }
    },
    computed:{
        getReadStyle() {
            return (this.email.isRead) ? {fontWeight: 400} : {fontWeight: 900}
        }
    },
    methods: {
    }
}