import { emailService } from "../services/emailService.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
            <form @submit.prevent="sendMail" class="compose-mail-modal">
                <header class="compose-mail-header">
                    <p>New Message</p>
                    <span>X</span>
                </header>
                <label>
                    <input v-model="emailToEdit.to" ref="sendTo" type="text" title="Send To" placeholder="To:"/>
                </label>
                <label>
                    <input v-model="emailToEdit.subject" type="text" title="Send To" placeholder="Subject:"/>
                </label>
                <div>
                    <textarea v-model="emailToEdit.body" cols="30" rows="10" placeholder="Mail Body:"></textarea>
                </div>
                <div>
                    <button title="send">Send</button>
                </div>
            </form>
    `,
    data() {
        return {
            emailToEdit: emailService.getEmptyEmail()
        }
    },

    methods: {
        sendMail() {
            if (!this.emailToEdit.to || !this.emailToEdit.subject || !this.emailToEdit.body) return// USER-MSG
            emailService.save(this.emailToEdit)
                .then(email => {
                    showSuccessMsg(`email saved (email id: ${email.id})`)
                    
                })
                .catch(err => {
                    showErrorMsg(`Cannot save email`)
                })

        }
    },

    mounted() {
        this.$refs.sendTo.focus()
    },

    created() {
        const emailId = this.$route.params.id
        if (emailId) {
            this.emailToEdit = emailService.get(emailId)
                .then(email => this.emailToEdit = email)
        }
    },
}