import { emailService } from '../services/emailService.service.js';

export default {
    props: ['email'],
    template: `
        <tr>
            <td :title="getBookMarkTitle">
                <img class="email-bookmark-icon" src="./assets/style/apps/mail/icons/bookmark-icon.png" alt="bookmark-icon"/>
            </td>
            <td :title="getStarTitle"  @click.stop="toggleStar">
                <img class="email-star-icon" :src="getStarIcon" alt="star-icon" />
            </td>
            <td title="Subject" class="email-subject">{{email.subject}}</td>
            <td title="Mail" class="email-body">{{email.body}}</td>
            <td title="Date" class="email-body">{{getDate}}</td>
        </tr>
    `,
    computed: {
        getBookMarkTitle() {
            return (this.email.isBookmark) ? 'Remove mark' : 'Mark'
        },
        getStarTitle() {
            return (this.email.isStarred) ? 'Unstar' : 'Star'
        },
        getStarIcon() {
            return (this.email.isStarred) ? "./assets/style/apps/mail/icons/starred-icon.png" :
            "./assets/style/apps/mail/icons/star-icon.png"
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
        toggleStar() {
            this.email.isStarred = !this.email.isStarred
            emailService.save(this.email)
        }
    }
}