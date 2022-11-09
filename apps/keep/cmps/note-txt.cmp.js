export default {
    props:['note'],
    template:`
        <article class="note-txt-preview">
            <h3>{{note.info.txt || note.info.label}}</h3>
        </article>
    `
}