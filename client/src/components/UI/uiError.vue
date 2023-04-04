<template>
    <div class="ui-error">
            <div v-if="error" class="alert">
               {{ error }}
           </div> 
    </div>
</template>

<script>
export default {
    name: 'ui-error',
    props: {
        error: {
            type: String
        }
    }
}
</script>

<style>
.alert {
    color:#2ecc71;
}
</style>   