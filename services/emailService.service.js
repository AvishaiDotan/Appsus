import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const EMAIL_KEY = 'emailDB'

const email = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}

_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getNextEmailId
}

function query() {
    return storageService.query(EMAIL_KEY)
}

function get(emailId){
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if(email.id){
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getEmptyEmail(vendor='', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed}
}


function getNextEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
        .then(emails =>{
            var idx  = emails.findIndex(email => email.id === emailId)
            if (idx === emails.length-1) idx = -1
            return emails[idx+1].id
        })
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = [email, email, email]
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    console.log(emails);
    return emails
}

function _createEmail(vendor, maxSpeed = 250) {
    const email = getEmptyEmail(vendor, maxSpeed)
    email.id = utilService.makeId() 
    return email
}


