import { eventBus } from "../../../services/event-bus.service.js"


export default {
    props: ['emails'],
    template:`
        <section>
            <p>count {{ unreadEmailsCount }}</p>
            <button @click.stop="$emit('compose-mail')">Compose</button>
            <div class="email-folders-container">
                <button @click="setFilter({folder: ''})">all</button>
                <button @click="setFilter({folder: 'isRead'})">Read</button>
                <button @click="setFilter({folder: 'unread'})">Unread</button>
                <button @click="setFilter({folder: 'isBookmarked'})">Bookmarked</button>
                <button @click="setFilter({folder: 'isStarred'})">Stared</button>
                <button @click="setFilter({folder: 'isSent'})">Sended</button>
                <button @click="setFilter({folder: 'removedAt'})">Removed</button>
            </div>
        </section>
    `,
    computed:{
        // Use Reduce
        unreadEmailsCount() {
            let count = 0
            this.emails.forEach(email => {
                if (!email.isRead) count++
            })
            return count
        }
    },
    methods: {
        setFilter(filterBy) {
            eventBus.emit('set-filter', filterBy)
            eventBus.emit('close-email', false)
        }
    },
}