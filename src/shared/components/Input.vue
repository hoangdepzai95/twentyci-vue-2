<template>
    <div class="form-item" :class="{ 'has-error': hasError }">
        <input v-model="value" :type="type" v-input :name="name" @input="onChange" v-if="type !== 'text-area'" :placeholder="placeHolder"/>
        <textarea v-model="value" v-input :name="name" @input="onChange" v-if="type === 'text-area'" :placeholder="placeHolder"/>
        <p class="text-danger">{{ errText }}</p>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Form from './Form.vue';

@Component
export default class Input extends Vue {

    @Prop()
    validators: any[];

    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    errText: string;

    @Prop()
    placeHolder: string;

    @Prop()
    defaultValue: string;

    hasError = false;

    value = '';

    $parent: Form;


    beforeMount() {
        this.$parent.registerInput(this);
        this.value = this.defaultValue;
        this.$parent.onChange(this.name, this.value);
    }

    onChange($event: any) {
        const value = $event.target.value;

        this.value = value;
        this.$parent.onChange(this.name, value);
        this.validate();
    }

    validate(): boolean {
        if (this.validators && this.validators.length) {
            this.hasError = !this.validators.every((validator) => validator(this.value));
            return !this.hasError;
        }

        return false;
    }
}
</script>

<style scoped lang="scss">
    .form-item {
        margin-bottom: 5px;
        .text-danger {
            margin: 0;
            line-height: 1.5;
            visibility: hidden;
        }

        &.has-error {
            .text-danger {
                visibility: visible;
            }
            .app-input {
                border-color: $danger-color;
            }
        }

    }

    textarea {
        min-height: 250px;
    }

</style>
