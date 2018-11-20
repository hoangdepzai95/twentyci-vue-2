<template>
    <div class="post-list">
        <div class="posts">
            <div class="tools">
                <button v-button="'primary'">Create post</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th class="large">Title</th>
                    <th class="large">Content</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="post in posts">
                    <td><router-link :to="'/post/' + post.id">{{ post.title | cutLongText }}</router-link></td>
                    <td>{{ post.content | cutLongText  }}</td>
                    <td>
                        <a >Edit</a> | <a >Delete</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { PostModel } from '../models/post.model';
    import api from  '../mocks/mock-api';

    @Component
    export default class PostList extends Vue {
        posts: PostModel[] = [];

        mounted() {
            api.getPosts()
                .then((posts) => {
                    this.posts = posts;
                });
        }
    }
</script>

<style scoped lang="scss">
    .post-list {
        padding: 84px 20px 0 20px;
        display: block;
    }

    .posts {
        padding: 20px;
        background-color: #FFF;
        max-width: 100%;
        overflow-x: auto;
        table {
            width: 100%;
            text-align: left;
            border-collapse: collapse;
            min-width: 600px;
            th {
                background: #fafafa;
                font-weight: 600;
                border-bottom: 1px solid $primary-border-color;
                padding: 16px;
                &.large {
                    width: 40%;
                }
            }

            tbody {
                td {
                    border-bottom: 1px solid $primary-border-color;
                    padding: 16px;
                }
            }

        }
    }

    .tools {
        margin-bottom: 20px;
        text-align: right;
    }
</style>
