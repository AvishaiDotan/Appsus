export default {
    template:`
        <header>
            <div>
                <router-link to="/">
                    <div>
                        <img :src="getIcon">
                        <h1>Miss's Book Shop</h1>
                    </div>
                </router-link>
                <div class="nav-links">
                    <router-link to="/bookApp">Book Gallery</router-link>
                    <router-link to="/about">About</router-link>
                </div>

                
            </div>
        </header>
    `,
    computed: {
        getIcon() {
            return `./img/icons/open-book.png`
        }
    },
}