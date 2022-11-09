import { emailService } from '../services/emailService.service.js'

import emailHeader from './email-header.cmp.js'
import emailCompose from './email-compose.cmp.js'
import emailFolderList from './email-folder-list.js'
import emailList from './email-list.cmp.js'


export default {
    template:`
        <email-header/>
        <email-compose/>
        <email-folder-list/>
        <email-list :emails="emails"/>
        <section>Im Mail</section>
    `,
    data() {
        return {
            emails: []
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
    }
}