export default {
    props: ['note'],
    template: `
        <section class="toolbar">
            <span><i class="fa-solid fa-ellipsis-vertical"></i></span>
            <span @click.stop="onIschangeColor" class="changeColor"><i class="fa-solid fa-palette"></i></span>
            <span @click.stop="togglePin"><i class="fa-solid fa-thumbtack"></i></span>
            <span><i class="fa-solid fa-box-archive"></i></span>
            
            <div v-if="isColorChange" class="color-palate" @click.stop="" >
                <div @click.stop="changeColor(color.split('#')[1])" v-for="color in colors" class="color" :class="color.split('#')[1]">
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            isColorChange: false,
            colors: ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e8eaed'],
            colorPicked: null
        }
    },
    methods: {
        onIschangeColor() {
            this.isColorChange = true
            console.log('hi');
        },
        changeColor(color) {
            this.isColorChange = false
            // this.colorPicked = color
            this.$emit('changeColor', color)
        },
        togglePin() {
            this.note.isPinned = !this.note.isPinned
            console.log(this.note);
            // this.$emit('togglePin', this.note)
        }
    },
    unmounted() {
        this.isColorChange = false
    },

}