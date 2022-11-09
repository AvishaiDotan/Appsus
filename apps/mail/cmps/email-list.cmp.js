import { emailService } from '../services/emailService.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
        <ul>
            <li v-for="email in emailsToShow">
                <email-preview 
                    @click.stop="handleOpeningEmail(email)"  
                    :email="email"/>
            </li>
        </ul>
    `,
    data() {
        return {
            filterBy: {}
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
        }
    },
    components: {
        emailPreview,
    },
    created() {
        eventBus.on('set-filter', (filterBy) => { this.setFilter(filterBy) })
    },

}