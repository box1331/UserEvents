<template>
    <input 
        :value="modelValue"
        @input="updateInput"
        class="ui-input"
        type="text"
    >
</template>

<script>
export default {
    name: 'ui-input',
    props: {
        modelValue: [ String, Number ],
        
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style scoped>
.ui-input {
    width: calc(17vw);
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 10px 15px;
    margin: 15px 0;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
}
</style>