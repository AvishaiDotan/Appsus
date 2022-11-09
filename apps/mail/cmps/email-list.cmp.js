import { emailService } from '../services/emailService.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template:`
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
            if (filterBy !== undefined) this.filterBy.name = filterBy.name
        },
    },
    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.name, 'i')
            return this.emails.filter(email => 
                !email.removedAt && 
                regex.test(email.subject) ||
                 regex.test(email.to) ||
                 regex.test(email.body))
            // && 
        }
    },
    components: {
        emailPreview,
    },
    created() {
        eventBus.on('set-filter', (filterBy) => { this.setFilter(filterBy) })
    },

}