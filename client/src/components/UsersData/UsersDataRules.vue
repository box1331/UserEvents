<template>
    <div class="users-data-rules">
        <div class="table-user">
            <table class="table"> 
                <tr class="my-table__header">
                    <th>UserName</th>
                    <th>Email</th>
                    <th>PhoneNumber</th>
                    <th>CountEvent</th>
                    <th>DateNextEvent</th>
                </tr>
                
                <template v-for="userInfo in usersInfo" :key="userInfo._id">
                    <tr class="table-user__edit">
                        <transition-group name="users-data-rules">
                                <th class="row row-heigth my-table__name">{{userInfo.userName}}</th>
                                <td class="row row-heigth">{{userInfo.email}}</td>
                                <td class="row row-heigth">{{userInfo.phoneNumber}}</td>
                                <td class="row row-heigth">{{userInfo.countEvent}}</td>
                                <td class="row row-heigth">{{userInfo.dateNextEvent}}</td>     
                        </transition-group>                       
                           
                        <tr :class="this.isEdit(userInfo._id) ? '' : classStr">
                            <transition-group name="users-data-rules">
                                <th class="row">{{userInfo._id}}</th>
                                <td class="row"><ui-input v-model="userName" type="text"></ui-input></td>
                                <td class="row"><ui-input v-model="email" type="text"></ui-input></td>
                                <td class="row"><ui-input v-model="phoneNumber" type="text"></ui-input></td>
                                <td class="row"><ui-input v-model="countEvent" type="text"></ui-input></td>
                                <td class="row"><ui-input v-model="dateNextEvent" type="text"></ui-input></td>
                            </transition-group>
                        </tr>
                        
                    </tr>
                </template>
            </table>
            
            <!-- Pagination -->
            <div class="my-table-pagination">
                <div class="page"
                    v-for="pageCurrent in pageTotalInfo"
                    :key="pageCurrent"
                    :class="{'page__selected' : pageInfo === pageCurrent}"
                    @click="pageClick(pageCurrent)"
                >
                    {{ pageCurrent }}
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
    name: 'users-data-rules',
    // Sorting on Server
    props: {
        selectedSort: {
            type: String
        }
    },
    methods: {
        isEdit(_id) {
            return this.editUserInfoId === _id
        },
        ...mapMutations({
            usersInfoCountPage: 'data/usersInfoCountPage',
            pageNumber: 'data/pageNumber',
            editUserInfoId: 'data/editUserInfoId',
            classStr: 'data/classStr',
            userName: 'data/userName',
            email: 'data/email',
            phoneNumber: 'data/phoneNumber',
            countEvent: 'data/countEvent',
            dateNextEvent: 'data/dateNextEvent',
            usersInfo: 'data/usersInfo',
            events: 'data/events',
        }),
        ...mapActions({
            // Sort
            SortByUserName: 'data/SortByUserName',
            SortByEmail: 'data/SortByEmail',
            SortByPhoneNumber: 'data/SortByPhoneNumber',
            SortByCountEvent: 'data/SortByCountEvent',
            SortByDateNextEvent: 'data/SortByDateNextEvent',
            //Request to Server
            getUsersInfo: 'data/getUsersInfo',
            getEventsInfo: 'data/getEventsInfo',
            // Pagination
            pageClick: 'data/pageClick'
        })
    },
    computed: {
        ...mapState({
            editUserInfoId: state => state.data.editUserInfoId,
            classStr: state => state.data.classStr,
            _id: state => state.data._id,
            userName: state => state.data.userName,
            email: state => state.data.email,
            phoneNumber: state => state.data.phoneNumber,
            countEvent: state => state.data.countEvent,
            dateNextEvent: state => state.data.dateNextEvent,
            usersInfo: state => state.data.usersInfo,
            events: state => state.data.events,
            // Pagination
            pageInfo: state => state.data.pageInfo,
            pageTotalInfo: state => state.data.pageTotalInfo
        }),
        ...mapGetters({
            countEvent: 'data/countEvent',
            dateNextEvent: 'data/dateNextEvent'            
        })
    },
    mounted() {
        this.getUsersInfo()
        this.getEventsInfo()
        
    },
    watch: {
        pageInfo() {
            this.getUsersInfo()
        },
        selectedSort() {
            this.getUsersInfo(this.selectedSort)
        }
    }
}
</script>

<style>
/* Animation add and delete */
.users-data-rules-item {
  display: inline-block;
  margin-right: 10px;
}
.users-data-rules-enter-active,
.users-data-rules-leave-active {
  transition: all 0.3s ease;
}
.users-data-rules-enter-from,
.users-data-rules-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Animation move */
.users-data-rules-move {
  transition: transform 0.5s ease;
}
.classNone {
    display: none;
}
</style>

<style src="@/assets/style/style.css"></style>