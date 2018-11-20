<template>
    <div class="post-form">
        <div class="header">
            {{ mode === 'edit' ? 'Edit post' : 'Create post' }}
        </div>
        <app-form @submit="submit" ref="form">
            <form-input
                type="text"
                :default-value="post.title"
                place-holder="Title"
                name="title"
                err-text="Please enter title, title length from 10 to 255 characters"
                :validators="validators.title"
            ></form-input>
            <form-input
                type="text-area"
                :default-value="post.content"
                place-holder="Write something..."
                name="content"
                err-text="Write some thing"
                :validators="validators.content"
            ></form-input>
        </app-form>
        <div class="footer">
            <button v-button="'default'" @click="cancel">Cancel</button>
            <button v-button="'primary'" @click="submit">Save</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { PostModel } from '../../shared/models/post.model';
    import Popup from '../../shared/components/Popup.vue';
    import Form from '../../shared/components/Form.vue';
    import PostList from './PostList.vue';
    import { Validators } from '../../util';
    import api from '../../mocks/mock-api';

    @Component
    export default class PostForm extends Vue {

        @Prop()
        post: PostModel;

        @Prop()
        mode: 'edit' | 'create';

        $parent: Popup;

        validators = {
            title: [Validators.minLength(10), Validators.maxLength(255)],
            content: [Validators.required]
        };

        cancel() {
            this.$parent.close();
        }

        submit() {
            const form: Form = this.$refs.form as Form;

            if (form.validate()) {
                const formData: any = form.getFormData();

                if (this.mode === 'create') {
                    api.createPost(formData.title, formData.content)
                        .then(this.onActionFinish);
                } else {
                    api.editPost(this.post.id, formData.title, formData.content)
                        .then(this.onActionFinish);
                }
            }
        }

        onActionFinish() {
            const postList = this.$parent.$parent as PostList;
            postList.getPosts();
            this.$parent.close();
        }
    }
</script>

<style scoped lang="scss">
    .post-form {
        background-color: #FFF;
        border-radius: 4px;
        form {
            padding: 20px;
            max-width: 500px;
            margin: auto;
        }

        .footer {
            padding: 20px;
            text-align: right;
            border-top: 1px solid $primary-border-color;;
            button:first-child {
                margin-right: 10px;
            }
        }

        .header {
            margin: 0;
            padding: 16px 24px;
            font-size: 20px;
            font-weight: 600;
            border-bottom: 1px solid $primary-border-color;
        }
    }

</style>
