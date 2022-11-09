import emailSearch from "./email-search.cmp.js"

export default {
    // ADD HOVER AND LINK TO RESET PAGE IN IMG LOGO
    template: `
            <img class="email-logo" src="../assets/style/apps/mail/icons/gmail-logo-icon.png" alt="email-logo" />
            <div class="main-header-features">
                <email-search class="email-search"/>
                <img class="appsus-menu-btn" src="./assets/style/apps/mail/icons/appsus-grid-icon.png" alt="menu-btn" />
            </div>

        
    `,
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
    },
    components: {
        emailSearch
    }
}