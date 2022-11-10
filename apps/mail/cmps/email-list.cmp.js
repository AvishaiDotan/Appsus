import { emailService } from '../services/emailService.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

import emailPreview from './email-preview.cmp.js'

export default {
    template: `
        <table>
            <thead>
                <tr class="headlines-container">
                    <td></td>
                    <td></td>
                    <td class="headline" @click.stop="setSort('subject')" title="Sort">
                        <img :src="sortImg" alt="sort-icon" class="sort-icon" />
                    </td>
                    <td></td>
                    <td class="headline" @click.stop="setSort(headlineTxt)" title="Sent Time" >Time</td>
                    <!-- <td class="headline" v-for="headlineTxt in tableHeadlines" @click.stop="setSort(headlineTxt)" :title="headline">{{headline}}</td> -->
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
            sortBy: {type: '', descending: true},
            tableHeadlines: ['', '', 'a-z', '', 'time'],
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
                this.$emit('set-emails', emails)
            })
            
        },
        setSort(sortBy) {
            if (this.sortBy.type === sortBy) this.sortBy.descending = !this.sortBy.descending
            this.sortBy.type = sortBy
            console.log(this.sortBy);
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

                    emails = emails.filter(email => !email['isRead'])

                } else if (this.filterBy.folder) {

                    emails = emails.filter(email => email[this.filterBy.folder])
                }
            }

            if (this.sortBy.type) {
                emails.sort((email1, email2) => {
                    const order = (this.sortBy.descending) ? [email1, email2] : [email2, email1]
                    if (this.sortBy.type === 'time') return (order[0].sentAt - order[1].sentAt)
                    else if (this.sortBy.type === 'body') return order[0].subject.localeCompare(order[1].subject)
                    else if (this.sortBy.type === 'subject') return order[0].subject.localeCompare(order[1].subject)
                })
            }
            

            return emails
        },
        sortImg() {
            return  (this.sortBy.descending) ? `./assets/style/apps/mail/icons/arrow-down-a-z-solid.svg` :
                `./assets/style/apps/mail/icons/arrow-up-a-z-solid.svg`
        }
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