import { emailService } from '../services/emailService.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

import emailPreview from './email-preview.cmp.js'

export default {
    template: `
        <table>
            <thead>
                <tr class="headlines-container">
                    <td v-for="headline in tableHeadlines" :title="headline">{{headline}}</td>
                </tr>
            </thead>
            <table class="emails-container">
                <tr v-for="email in emailsToShow" >
                    <email-preview 
                        @click.stop="handleOpeningEmail(email)"  
                        :email="email"  
                        class="email-container"
                        :class="{read: email.isRead}"
                    />
                </tr>
            </table>
        </table>
    `,
    data() {
        return {
            filterBy: {},
            tableHeadlines: ['', '', 'Subject', 'Body', 'Time'],
            emails: [],
        }
    },
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
        },
        setFilter(filterBy) {
            if (filterBy.txt !== undefined) this.filterBy.txt = filterBy.txt
            if (filterBy.folder !== undefined) this.filterBy.folder = filterBy.folder
            console.log(this.filterBy);
        },
        setEmails() {
            emailService.query()
            .then(emails => {
                this.emails = emails
            })
        }

    },
    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')

            // Filter By Removed
            let emails = this.emails.filter(email =>

                // Filter By Removed
                !email.removedAt &&

                // Filter By txt
                (regex.test(email.subject) ||
                    regex.test(email.to) || regex.test(email.body)))

            // Filter By Folder   
            if (this.filterBy.folder) {
                if (this.filterBy.folder === 'unread') {

                    return emails.filter(email => !email['isRead'])

                } else if (this.filterBy.folder) {

                    return emails.filter(email => email[this.filterBy.folder])
                }
            }
            return emails
        },
    },
    components: {
        emailPreview,
    },
    created() {
        this.setEmails()
        eventBus.on('set-filter', (filterBy) => { this.setFilter(filterBy) })
        eventBus.on('save-error', () => {this.setEmails()})
    },

}