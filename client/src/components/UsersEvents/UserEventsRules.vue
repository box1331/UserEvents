<template>
    <div class="user-users-rules">
        <div class="table-user">
            <table class="table"> 
                <tr class="my-table__header">
                    <th>UserName</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>StartDate</th>
                    <th>EndDate</th>
                    <th class="my-table__action">Action</th>
                </tr>
                
                <template v-for="event in userFilter" :key="event._id">
                    <tr class="table-user-row">
                        <div class="table-user__edit">
                            <transition-group name="user-events-rules">
                                <th class="row my-table__name">{{event.userName}}</th>
                                <td class="row">{{event.title}}</td>
                                <td class="row">{{event.description}}</td>
                                <td class="row">{{new Date(event.startDate).toLocaleDateString()}}</td>
                                <td class="row">{{new Date(event.endDate).toLocaleDateString()}}</td>
                                <td class="row">
                                    <ui-button
                                        @click.prevent="changeEditEventId({
                                            _id: event._id, 
                                            userName: event.userName, 
                                            title: event.title, 
                                            description: event.description, 
                                            startDate: event.startDate, 
                                            endDate: event.endDate
                                        })"
                                         style="margin-left: 10px"
                                    >
                                        Edit
                                    </ui-button>
                                    <ui-button
                                        @click.prevent="deleteEventId(event._id)"
                                         style="margin-left: 10px"
                                    >
                                        Delete
                                    </ui-button>
                                </td>     
                            </transition-group>
                        </div>                      

                        <div class="table-user__correct">
                            <tr :class="this.isEdit(event._id) ? '' : classStr">
                                <transition-group name="user-events-rules">
                                    <div class="table-user__updates">
                                    
                                        <td class="row"><ui-input v-model="event.userName" type="text" class="row-user-name" disabled></ui-input></td>
                                        <td class="row"><ui-input v-model="event.title" type="text"></ui-input></td>
                                        <td class="row"><ui-input v-model="event.description" type="text"></ui-input></td>
                                        <td class="row"><ui-input v-model="event.startDate" type="date"></ui-input></td>
                                        <td class="row"><ui-input v-model="event.endDate" type="date"></ui-input></td>
                                        <td class="row">
                                            <ui-button
                                                @click.prevent="updateEvent({
                                                    _id: event._id, 
                                                    userName: event.userName, 
                                                    title: event.title, 
                                                    description: event.description, 
                                                    startDate: event.startDate, 
                                                    endDate: event.endDate
                                                })"
                                            >
                                                Update
                                            </ui-button>
                                        </td>
                                        
                                    </div>
                                </transition-group>
                            </tr>
                        </div>
                        
                    </tr>
                </template>
            </table>

            <!-- Pagination -->
            <div class="my-table-pagination">
                <div class="page"
                    v-for="pageCurrent in pageTotal"
                    :key="pageCurrent"
                    :class="{'page__selected' : page === pageCurrent}"
                    @click="pageClick(pageCurrent)"
                >
                    {{ pageCurrent }}                    
                </div>
            </div>
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
import UsersEventsCreate from '@/components/UsersEvents/UsersEventsCreate.vue'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    name: 'user-users-rules',
    components: {
        UsersEventsCreate
    },
    props: {
        userFilter: {
            type: String
        },
        // Sorting on the server
        selectedSort: {
            type: String
        },
    },
    methods: {
        ...mapActions({
            pageClick: 'events/pageClick',
            getEvents: 'events/getEvents',
            deleteEventId: 'events/deleteEventId',
            changeEditEventId: 'events/changeEditEventId',
            isEdit: 'events/isEdit',
            updateEvent: 'events/updateEvent',
            messageDialog: 'events/messageDialog'
        }),

        isEdit(_id) {
            return this.editEventId === _id
        }
    },
    computed: {
        ...mapState({
            events: state => state.events.events,
            page: state => state.events.page,
            pageTotal: state => state.events.pageTotal,
            editEventId: state => state.events.editEventId,
            classStr: state => state.events.classStr,

        }),
        ...mapGetters({
            getEvent: 'events/getEvents',
            page: 'events/getPage',
            pageTotal: 'events/getPageTotal',
            getEventId: 'events/getEditEventId'
        }),
        userFilter() {
            return this.events.filter((p) => {
                return p.userName == this.userFilter;
            })
        }
    },
    mounted() {
        this.getEvents()
    },
    watch: {
        page() {
            this.getEvents()
        },
        // Sorting on the server
        selectedSort() {
            this.getEvents(this.selectedSort)
        }
    }
}
</script>

<style scoped>
/* Animation add and delete */
.user-users-rules-item {
  display: inline-block;
  margin-right: 10px;
}
.user-users-rules-enter-active,
.user-users-rules-leave-active {
  transition: all 0.3s ease;
}
.user-users-rules-enter-from,
.user-users-rules-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Animation move */
.user-users-rules-move {
  transition: transform 0.5s ease;
}
.classNone {
    display: none;
}
</style>

<style src="@/assets/style/style.css"></style>