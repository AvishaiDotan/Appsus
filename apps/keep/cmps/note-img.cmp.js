export default {
    props: ['note'],
    template: `
        <article>
            <h1>im {{note.type}}</h1>
        </article>
    `
}