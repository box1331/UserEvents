<template>
    <navbar :user="user" />

    <div class="app-wrapper">     
        <router-view :user="user" />
    </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            user: null,
        }
    },  
    async created() {
        const response = await axios.get('user');
        this.$store.dispatch('auth/USER', response.data);
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app-wrapper {
    padding: 20px;
}
</style>
