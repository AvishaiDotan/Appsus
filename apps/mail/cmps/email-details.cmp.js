import { emailService } from "../services/emailService.service.js"
import { showErrorMsg, eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['email'],
    template: `
        <section v-if="email">
            <header class="email-details-header">
                <button @click.stop="unselectEmail" title="Go back to emails">back</button>
                <button @click.stop="deleteEmail" title="Delete">Delete</button>
                <button>Unread</button>
                <button>Unread</button>
                <button>Stared</button>
                <section>
                    <p>{{ email.from }}</p>
                    <p>{{ email.subject }}</p>
                    <p>{{ email.body }}</p>
                </section>
            </header>
        </section>
        <h3 v-else>Loading...</h3>
        <div>{{email}}</div>
    `,
    methods: {
        unselectEmail() {
            eventBus.emit('close-email', false)
        },

        deleteEmail() {
            this.email.removedAt = Date.now()
            emailService.save(this.email)
            this.unselectEmail()
        }
    },
}