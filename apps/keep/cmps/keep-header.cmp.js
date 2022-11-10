export default {
    template: `
        <section class="keep-header">
        <div class="side-container">
            <span><i class="fa-solid fa-bars"></i></span>
            <img src="../../apps/keep/imgs/logo.png" alt="" />
                <h1>Keep</h1>
            </div>
            <input type="search" placeholder="Search..." v-model="filterBy.txt" @input="filter"/>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: ''
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}