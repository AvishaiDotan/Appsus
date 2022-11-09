export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <pre>{{note}}</pre>
        </article>
    `,
}