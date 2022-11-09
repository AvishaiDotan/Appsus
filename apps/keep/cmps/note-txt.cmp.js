export default {
    props: ['note'],
    template: `
        <article class="note-txt-preview">
            <h3>{{note.info.txt || note.info.label}}</h3>
            <ul class="todos-preview">
                <li v-for="todo in note.info.todos">
                    <h4>{{todo.txt}}</h4>
                </li>
            </ul>
        </article>
    `
}