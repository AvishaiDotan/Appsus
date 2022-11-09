export default {
    props: ['email'],
    template: `
            <td class="email-subject">{{email.subject}}</td>
            <td :style="getReadStyle" class="email-body">{{email.body}}</td>
            <td :style="getReadStyle" class="email-body">{{getDate}}</td>
    `,
    data() {
        return {

        }
    },
    computed: {
        getReadStyle() {
            return (this.email.isRead) ? { fontWeight: 400 } : { fontWeight: 900 }
        },
        getDate() {
            const emailDate = new Date(this.email.sentAt)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            // If Pass By Year
            if (new Date().getFullYear() - emailDate.getFullYear() > 1) {
                return monthNames[emailDate.getMonth()] + ' ' + emailDate.getFullYear()
            // If Pass By Less Then 24 Hours 
            } else if (new Date() - emailDate < 1000 * 60 * 60 * 24){
                const hour = (emailDate.getHours() < 10) ? '0' + emailDate.getHours() : emailDate.getHours() 
                const minutes = (emailDate.getMinutes() < 10) ? '0' + emailDate.getMinutes() : emailDate.getMinutes()
                return hour + ':' + minutes
            } else {
                return monthNames[emailDate.getMonth()] + ' ' + emailDate.getDay()
            }

        }
    },
    methods: {
    }
}