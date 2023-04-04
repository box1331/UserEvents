<template>
    <div class="wrapper">
        <div class="navbar">
            <div @click="$router.push('/')" class="navbar__btns"><strong>USER EVENTS</strong></div>
            <div class="navbar__btns">

                <div class="login" v-if="user">
                    <my-button
                        @click="$router.push('/')"
                        style="margin-left: 20px"
                    >
                        Home
                    </my-button>

                    <my-button
                        @click="$router.push('/users')"
                        style="margin-left: 20px"
                    >
                        Users
                    </my-button>
                    <my-button
                        @click="$router.push('/user-data')"
                        style="margin-left: 20px"
                    >
                        User Data
                    </my-button>
                    <my-button 
                        @click="$router.push('/users-events')"
                        style="margin-left: 20px"
                    >
                        User Events
                    </my-button>
                    <my-button 
                        @click="handleLogout"
                        style="margin-left: 20px"
                    >
                        Logout
                    </my-button>
                </div>
                
                <div class="logout" v-if="!user">
                    <my-button
                        @click="$router.push('/')"
                        style="margin-left: 20px"
                    >
                        Home
                    </my-button>
                    <my-button 
                        @click="$router.push('/login')"
                        style="margin-left: 20px"
                    >
                        Login
                    </my-button>
                    <my-button 
                        @click="$router.push('/register')"
                        style="margin-left: 20px"
                    >
                        Register
                    </my-button>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    methods: {
        handleLogout() {
            localStorage.removeItem('token');
            // this.$store.dispatch('auth/user', null)
            this.USER(null);
            this.$router.push('/');
        },
        ...mapActions({
            USER: 'auth/USER'
        })
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser'
        })
    }
}
</script>

<style src="@/assets/style/style.css"></style>