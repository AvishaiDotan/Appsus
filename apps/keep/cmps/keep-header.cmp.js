export default {
    template: `
        <section class="keep-header">
            <input type="search" placeholder="Search..." v-model="filterBy.txt" @input="filter"/>
            <div class="side-container">
                <h1>Keep</h1>
                <img src="../../apps/keep/imgs/logo.png" alt="" />
                <span><i class="fa-solid fa-bars"></i></span>
            </div>
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