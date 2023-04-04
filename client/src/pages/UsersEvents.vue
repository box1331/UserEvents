<template>
    <div class="page-users-events page-all">
        <div class="page-title page-placing">
            <h1>User Events</h1>
        </div>

        <div class="page__sorts">
            <ui-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <!-- Sorting on the server -->
        <div class="page-text page-placing">
            <users-events-rules
                v-model:selectedSort="selectedSort"
            >
            </users-events-rules>
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
import UsersEventsRules from '@/components/UsersEvents/UsersEventsRules.vue'
import {mapActions, mapState} from 'vuex'

export default {
    name: 'page-users-events',
    components: {
        UsersEventsRules
    },
    data() {
        return {
            profiles: [],
            dialogVisible: false,
            // Sorting on the server
            selectedSort: '',
            sortOptions: [
                {value: 'userName', name: 'By UserName'},
                {value: 'title', name: 'By Title'},
                {value: 'descrption', name: 'By Description'},
                {value: 'startDate', name: 'By StartDate'},
                {value: 'endDate', name: 'By EndDate'}
            ]
        }
    },
    methods: {
        ...mapActions({
            messageDialog: 'events/messageDialog'
        })
    },
    computed: {
        ...mapState({
            messageVisible: state => state.events.messageVisible,
            messageText: state => state.events.messageText
        })
    }
}
</script>

<style>

</style>

<style src="@/assets/style/style.css"></style>