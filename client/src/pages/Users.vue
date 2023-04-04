<template>
    <div class="page-users page-all">
        <div class="page-title page-placing">
            <h1>Users</h1>
        </div>

        <div class="page-sort page-placing">
            <ui-button class="button-create-user"
                @click="showDialog"
            >
                Create User
            </ui-button>

            <!-- Sorting on the server -->
            <ui-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <ui-dialog v-model:show="dialogVisible" >    
            <users-create 
                v-model="dialogVisible"
            >
                @click="closeDialog"
                @click="validateUser"
            </users-create>
        </ui-dialog>

        <div class="page-text page-placing">
           <users-rules
                v-model:selectedSort="selectedSort"
                :sortAndSearchPosts='sortAndSearchPosts'
            >
            </users-rules>
        </div>

        <!-- BackendMessage -->
        <ui-dialog v-model:show="messageVisible" class="dialog__error">    
            <div class="delete__content">
                <h3>{{messageText}}</h3>
            </div>
            <div class="delete__btns">
                <ui-button @click="messageDialog">Close</ui-button>
            </div>
        </ui-dialog>
        
    </div>
</template>

<script>
import UsersCreate from '@/components/Users/UsersCreate.vue'
import UsersRules from '@/components/Users/UsersRules.vue'
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
    name: 'page-users',
    components: {
        UsersCreate,
        UsersRules
    },
    data() {
        return {
            dialogVisible: false,
            selectedSort: '',
            sortOptions: [
                {value: 'userName', name: 'By userName'},
                {value: 'surName', name: 'By surName'},
                {value: 'email', name: 'By email'},
                {value: 'phoneNumber', name: 'By phone'}
            ]
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true
        },
        ...mapActions({
            messageDialog: 'users/messageDialog'
        })
    },
    computed: {
        ...mapState({
            messageVisible: state => state.users.messageVisible,
            messageText: state => state.users.messageText
        }),
        ...mapGetters({ 
            users: 'users/users'
        })
    }
}
</script>

<style src="@/assets/style/style.css"></style>