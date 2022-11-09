import { emailService } from '../services/emailService.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

import emailHeader from '../cmps/email-header.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import emailFolderList from '../cmps/email-folder-list.js'
import emailList from '../cmps/email-list.cmp.js'
import emailDetails from '../cmps/email-details.cmp.js'


export default {
    template: `
    <main class="email-app-container">
        <email-header/>
        <email-compose v-if="isCompose"/>
        <email-folder-list 
            :emails="emails" 
            @compose-mail="composeMailToggle" 
            class="email-folder-list"
        />
        
        <email-list v-if="!openedEmail" @set-open-email="setOpenEmail" :emails="emails" class="email-list"/>
        <email-details v-else="!openedEmail" :email="openedEmail"/>
        
    </main>

    `,
    data() {
        return {
            emails: [],
            isCompose: false,
            openedEmail: null,
        }
    },
    methods: {
        composeMailToggle() {
            this.isCompose = !this.isCompose
        },
        setOpenEmail(email) {
            this.openedEmail = email
        },
    },
    created() {
        eventBus.on('close-email', () => { this.openedEmail = false })

    },
    components: {
        emailHeader,
        emailCompose,
        emailFolderList,
        emailList,
        emailDetails
    }
}