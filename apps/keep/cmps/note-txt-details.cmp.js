export default {
    props:['note'],
    template:`
        <!-- <p>{{note.info.txt}}</p> -->
        <textarea rows="8" cols="50" v-model="note.info.txt">
            {{ note.info.txt }}
        </textarea>
    `
}