<template>
    <div class="users-events-rules">
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
                
                <template v-for="event in events" :key="event._id">
                    <tr class="table-user-row">
                        <div class="table-user__edit">
                            <transition-group name="users-events-rules">
                                <th class="row my-table__name">{{event.userName}}</th>
                                <td class="row">{{event.title}}</td>
                                <td class="row">{{event.description}}</td>
                                <td class="row">{{new Date(event.startDate).toLocaleDateString()}}</td>
                                <td class="row">{{new Date(event.endDate).toLocaleDateString()}}</td>
                                <td class="row my-table__action">
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
                            <tr :class="isEdit(event._id) ? '' : classStr">
                                <transition-group name="users-events-rules">
                                    <div class="table-user__updates">
                                        
                                        <td class="row"><ui-input class="row-user-name" v-model="event.userName" type="text" disabled></ui-input></td>
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
    </div>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    name: 'users-events-rules',
    components: {

    },
    props: {
        userFilter: {
            type: String
        },
        // Sorting on Server
        selectedSort: {
            type: String
        }
    },
    methods: {
        ...mapActions({
            pageClick: 'events/pageClick',
            getEventsAll: 'events/getEventsAll',
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
            classStr: state => state.events.classStr
        }),
        ...mapGetters({
            events: 'events/getEvents',
            page: 'events/getPage',
            pageTotal: 'events/getPageTotal',
            getEventId: 'events/getEditEventId'
        })
    },
    mounted() {
        this.getEventsAll()
    },
    watch: {
        page() {
            this.getEventsAll()
        },
        // Sorting on the server
        selectedSort() {
            this.getEventsAll(this.selectedSort)
        }
    }
}
</script>

<style scoped>
/* Animation add and delete */
.users-events-rules-item {
  display: inline-block;
  margin-right: 10px;
}
.users-events-rules-enter-active,
.users-events-rules-leave-active {
  transition: all 0.3s ease;
}
.users-events-rules-enter-from,
.users-events-rules-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Animation move */
.users-events-rules-move {
  transition: transform 0.5s ease;
}

/* Validation */
.input__validates {
    display:flex;
    flex-direction: column;
}
.input__validate {
    display: flex;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    color: red;
    margin: 10px;
    text-align: center;
}

.classNone {
    display: none;
}
</style>

<style src="@/assets/style/style.css"></style>