<template>
    <div class="form-item" :class="{ 'has-error': hasError }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: 'FormItem',
    props: ['hasError']
};
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

</style>
