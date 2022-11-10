export default {
    props: ['note'],
    template: `
        <input type="text" v-model="note.info.label"/>
        <ul class="todos-details">
            <li v-for="todo in note.info.todos">
                <input type="text" v-model="todo.txt"/>
            </li>
        </ul>
    `
}