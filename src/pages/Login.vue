<template>
    <div class="login-form-wrapper">
        <div class="login-form">
            <form>
                <form-item>
                    <input type="text" v-input placeholder="user name">
                    <p class="text-danger">Please enter user name</p>
                </form-item>
                <form-item>
                    <input type="password" v-input placeholder="password">
                    <p class="text-danger">Please enter password</p>
                    <p class="text-danger wrong-info">Invalid user name or password</p>
                </form-item>
                <form-item>
                    <button v-button="'primary'" class="login-btn">Login</button>
                </form-item>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    export default {}
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

    @media only screen and (max-width: 360px) {
        .login-form {
            width: 300px;
        }
    }

</style>
