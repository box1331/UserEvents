<template>
    <div class="page-user-events page-all">
        <div class="page-title page-placing">
            <h1>User Data</h1>
        </div>

        <div class="page__sorts">
            <ui-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <div class="page-text page-placing">
            <users-data-rules
                v-model:selectedSort="selectedSort"
            >
            </users-data-rules>
        </div>

    </div>
</template>

<script>
import UsersDataRules from '@/components/UsersData/UsersDataRules.vue'

export default {
    name: 'page-user-events',
    components: {
        UsersDataRules
    },
    data() {
        return {
            dialogVisible: false,
            selectedSort: '',
            sortOptions: [
                {value: 'userName', name: 'By UserName'},
                {value: 'email', name: 'By Email'},
                {value: 'phoneNumber', name: 'By PhoneNumber'}
            ]
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true
        }
    }
}
</script>

<style src="@/assets/style/style.css"></style>