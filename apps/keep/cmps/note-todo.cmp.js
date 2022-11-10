export default {
    props: ['note'],
    template: `
        <h2>{{note.info.label}}</h2>
            <ul class="todos-preview">
                <li v-for="(todo,idx) in note.info.todos">
                    <h5>{{todo.txt}}</h5>
                    <input @click.stop="todoDone(todo)" type="checkbox" v-model="todo.isDone" title="Mark done!">
                </li>
            </ul>
    `,
    data() {
        return {
            // isTodosDone: []
        }
    },
    created() {
    },
    methods: {
        todoDone(todo) {
            todo.dontAt = new Date().getTime()
            todo.isDone = !todo.isDone
            console.log(todo);
        }
    },
    computed: {
        onDone() {
            
        }
    }
}