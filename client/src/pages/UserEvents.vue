<template>
    <div class="page-user-events page-all">
        <div class="page-title page-placing">
            <h1>User</h1>
        </div>
        
        <div class="page-text page-placing">
             <div class="table-user">
                <table class="table table-user-event"> 
                    <tr class="my-table__header">
                        <th class="table-user__row">UserName</th>
                        <th class="table-user__row">SurName</th>
                        <th class="table-user__row">Email</th>
                        <th class="table-user__row">PhoneNumber</th>
                    </tr>
                    
                    <tr class="table-user__edit">
                        <th class="row table-user__row my-table__name">{{this.userName}}</th>
                        <td class="row table-user__row">{{this.surName}}</td>
                        <td class="row table-user__row">{{this.email}}</td>
                        <td class="row table-user__row">{{this.phoneNumber}}</td>  
                    </tr>
                </table>
            </div>  
        </div>

        <div class="page-sort page-placing">
            <ui-button 
                 @click="showDialog"
                class="button-create-event"
            >
                Create Event
            </ui-button>

            <!-- Sorting on the server -->
            <ui-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <ui-dialog v-model:show="dialogVisible">    
            <users-events-create 
                v-model="dialogVisible" 
                :user="userName"
            >
            </users-events-create>
        </ui-dialog>

        <div class="page-text page-placing">
            <user-events-rules
                :userFilter="userName"
                v-model:selectedSort="selectedSort"
            />
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
import axios from 'axios'
import UserEventsRules from '@/components/UsersEvents/UserEventsRules.vue'
import UsersEventsCreate from '@/components/UsersEvents/UsersEventsCreate.vue'
import {mapActions, mapState} from 'vuex'

export default {
    name: 'page-user-events',
    components: {
        UserEventsRules,
        UsersEventsCreate
    },
    data() {
        return {
            userOne: [],
            userName: '',
            surName: '',
            email: '',
            phoneNumber: '',  
            events: [],
            dialogVisible: false,
            user: '',
            // Sorting on the server
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'By title'},
                {value: 'description', name: 'By description'},
                {value: 'startDate', name: 'By startDate'},
                {value: 'endDate', name: 'By endDate'}
            ]
        }
    },
    methods: {
        ...mapActions({
            messageDialog: 'events/messageDialog'
        }),

        //From server
        getUsers(_id) {
            axios.get(`http://localhost:7000/users/${this.$route.params._id}`)
            .then(response => {
                this.userOne = response.data;
                this.userName = response.data.userName;
                this.surName = response.data.surName;
                this.email = response.data.email;
                this.phoneNumber = response.data.phoneNumber;
            })
        },
        userClick() {
            console.log($route)        
        },
        showDialog() {
            this.dialogVisible = true
        }
    },
    computed: {
        ...mapState({
            messageVisible: state => state.events.messageVisible,
            messageText: state => state.events.messageText
        })
    },
    mounted() {
        this.getUsers()
    }, 
}
</script>

<style src="@/assets/style/style.css"></style>