import { emailService } from '../services/emailService.service.js';

import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template:`
        <ul>
            <li v-for="email in validEmails">
                <email-preview 
                    @click.stop="handleOpeningEmail(email)"  
                    :email="email"/>
            </li>
        </ul>
    `,
    methods: {
        handleOpeningEmail(email) {
            this.$emit('set-open-email', email)
            this.setAsRead(email)
        },
        setAsRead(email) {
            email.isRead = true;
            emailService.save(email)
                .then(() => {
                    emailService.query()
                        .then(emails => this.emailList = emails)
                })
        }
    },
    computed: {
        validEmails() {
            return this.emails.filter(email => !email.removedAt)
        }
    },
    components: {
        emailPreview,
    },

}