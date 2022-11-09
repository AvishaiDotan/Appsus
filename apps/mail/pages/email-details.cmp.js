import { emailService } from "../services/emailService.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section v-if="mail">
            <h1>hi!</h1>
        </section>
        <h3 v-else>Loading...</h3>
    `,
    data() {
        return {
            mail: null,
        }
    },
    created() {
        this.loadEmail()
    },
    methods: {
        loadEmail() {
            console.log(this.mailId);
            emailService.get(this.mailId)
                .then(mail => {
                    this.mail = mail
                })
                .catch(err => showErrorMsg('Cannot load mail'))
        }
    },
    computed: {
        carId() {
            return this.$route.params.id
        },
    },
    watch: {
        mailId() {
            console.log('Email Id changed')
            this.loadEmail()
        }
    }
}