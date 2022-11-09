import emailHeader from './email-header.cmp.js'
import emailCompose from './email-compose.cmp.js'
import emailFolderList from './email-folder-list.js'
import emailList from './email-list.cmp.js'


export default {
    template:`
        <email-header/>
        <email-compose/>
        <email-folder-list/>
        <email-list/>
        <section>Im Mail</section>
    `,
    components: {
        emailHeader,
        emailCompose,
        emailFolderList,
        emailList,
    }
}