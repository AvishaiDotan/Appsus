import { emailService } from '../services/emailService.service.js'

import emailHeader from './email-header.cmp.js'
import emailCompose from './email-compose.cmp.js'
import emailFolderList from './email-folder-list.js'
import emailList from './email-list.cmp.js'


export default {
    template:`
    <main class="email-app-container">
        <email-header class="email-header"/>
        <email-compose v-if="isCompose"/>
        <email-folder-list @compose-mail="composeMailToggle" class="email-folder-list"/>
        <email-list :emails="emails" class="email-list"/>
    </main>

    `,
    data() {
        return {
            emails: [],
            isCompose: false
        }
    },
    methods: {
        composeMailToggle() {
            this.isCompose = !this.isCompose
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
            })
    },
    components: {
        emailHeader,
        emailCompose,
        emailFolderList,
        emailList,
        emailCompose
    }
}