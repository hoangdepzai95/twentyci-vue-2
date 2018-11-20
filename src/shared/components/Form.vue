<template>
    <form @submit="onSubmit">
        <slot></slot>
    </form>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Input from './Input.vue';

    @Component
    export default class Form extends Vue {

        hasError = false;

        formData: any = {};

        inputs: Input[] = [];


        onChange(name: string, value: string) {
            this.formData[name] = value;
        }

        registerInput(input: Input) {
            this.inputs.push(input);
        }

        validate(): boolean {
            return this.inputs.every((input) => input.validate());
        }

        getFormData() {
            return {...this.formData};
        }

        onSubmit($event: Event) {
            $event.preventDefault();
            this.$emit('submit');
        }
    }
</script>
