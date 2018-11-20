<template>
    <div class="login-form-wrapper">
        <div class="login-form">
            <app-form ref="form" @submit="submit">
                <form-input type="text" name="userName" err-text="Please enter user name" :validators="validators.userName" place-holder="user name">
                </form-input>
                <form-input type="password" place-holder="password" name="password" err-text="Please enter password" :validators="validators.password">
                </form-input>
                <button v-button="'primary'" class="login-btn">Login</button>
                <p class="text-danger" :class="{ hide: !wrongInfo }">Invalid user name or password</p>
            </app-form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Validators } from '../util';
    import Form from '../components/Form.vue';
    import api from '../mocks/mock-api';

    @Component
    export default class Login extends Vue {

        validators: any = {
            userName: [Validators.required],
            password: [Validators.required]
        };

        wrongInfo = false;

        submit() {
            const form: Form = this.$refs.form as Form;

            if (form) {
                const formData: any = form.getFormData();
                this.wrongInfo = false;
                api.login(formData.userName, formData.password)
                    .then((res: any) => {
                        console.log('res', res);

                    })
                    .catch(() => {
                        this.wrongInfo = true;
                    });
            }

        }
    }
</script>

<style scoped lang="scss">
    .login-form-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-form {
        width: 350px;
        .login-btn {
            width: 100%;
        }

        .wrong-info {
            visibility: visible;
        }
        background-color: #fff;
        box-shadow: rgba(235,232,232,.498039) 0 1px 4px 0;
        padding: 100px 16px;
    }

    .text-danger {
        margin-top: 5px;
    }

    .hide {
        visibility: hidden;
    }

    @media only screen and (max-width: 360px) {
        .login-form {
            width: 300px;
        }
    }

</style>
