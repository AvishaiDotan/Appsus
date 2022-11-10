export default {
    props: ['note'],
    template: `
        <section class="toolbar">
            <span class="options-btn" @click.stop="toggleMore" title="More"><i class="fa-solid fa-ellipsis-vertical"></i>
                <div v-if="isMore" class="options-bar">
                    <span @click="remove" title="Delete"><i class="fa-solid fa-trash"></i></span>
                </div>
            </span>
            <span title="Change color" @click.stop="onIschangeColor" class="changeColor"><i class="fa-solid fa-palette"></i></span>
            <span title="Pin" @click.stop="togglePin"><i class="fa-solid fa-thumbtack"></i></span>
            <span title="Move To Archive"><i class="fa-solid fa-box-archive"></i></span>
            
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
            colorPicked: null,
            isMore: false
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
        },
        toggleMore() {
            this.isMore = !this.isMore
        },
        remove() {
            this.$emit('remove', this.note.id)
        }
    },
    unmounted() {
        this.isColorChange = false
    },
    computed: {
    }

}