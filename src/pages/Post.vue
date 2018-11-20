<template>
    <div class="post">
        <div v-if="post">
            <h2>{{ post.title }}</h2>
            <div class="content">{{ post.content }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import api from '../mocks/mock-api';
    import { PostModel } from '../shared/models/post.model';

    @Component
    export default class Post extends Vue {

        post: PostModel = null;

        mounted() {
            const postId = +this.$router.currentRoute.params['id'];

            api.getPost(postId)
                .then((post) => {
                    this.post = post;
                });
        }
    }
</script>

<style scoped lang="scss">
    .post {
        padding: 84px 20px 0 20px;
        display: block;
    }

    .content {
        white-space: pre-line;
    }

</style>
