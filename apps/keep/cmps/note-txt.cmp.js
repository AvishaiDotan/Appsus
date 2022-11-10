export default {
    props: ['note'],
    template: `
        <section class="note-txt-preview">
            <h2>{{note.info.txt || note.info.label}}</h2>
            <ul class="todos-preview">
                <li v-for="todo in note.info.todos">
                    <h4>{{todo.txt}}</h4>
                    <input @click.stop="todoDone(todo)" type="checkbox" v-model="todo.isDone" title="Mark done!">
                </li>
            </ul>
        </section>
    `,
    methods: {
        todoDone(todo) {
            todo.dontAt = new Date().getTime()
            todo.isDone = !todo.isDone
            this.$emit('todoDone', this.note)
            console.log(todo);
        }
    },
}