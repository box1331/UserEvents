<template>
    <select 
        :value="modelValue" 
        @change="changeOption"
        class="ui-select"
    >
        <option disabled value="">Sorting on the Server</option>
        <option 
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>

export default {
    name: 'ui-select',
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(event) {   
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style>
.ui-select {
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid #000;
    background-color: #0093b4;
    color: #fff;
    border-radius: 3px;
    font-size: 18px;
    box-sizing: border-box;
    min-width: 100px;
}
</style>