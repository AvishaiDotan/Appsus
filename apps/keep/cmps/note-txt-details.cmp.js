export default {
    props:['note'],
    template:`
        <ul v-if="note.info.todos" class="todos-details">
            <li v-for="todo in note.info.todos">
                <input type="text" v-model="todo.txt"/>
            </li>
        </ul>
        <textarea v-else rows="8" cols="50" v-model="note.info.txt">
            {{ note.info.txt }}
        </textarea>
    `
}