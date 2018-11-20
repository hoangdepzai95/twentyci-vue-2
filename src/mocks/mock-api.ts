// tslint:disable:max-line-length
import { PostModel } from '@/shared/models/post.model';
import store from '../store/index';

const DELAY = 200;
const DB_KEY = 'mock-db';

class MockApi {

    constructor() {
        if (!localStorage.getItem('didInit')) {
            this.initData();
        }
    }

    public getPosts(): Promise<PostModel[]> {
        return this.doRequest(this.getLocalPosts());
    }

    public getPost(id: number): Promise<PostModel> {
        const posts = this.getLocalPosts();

        return this.doRequest(posts.find(post => post.id === id) || {});
    }

    public deletePost(id: number): Promise<null> {
        const posts = this.getLocalPosts().filter(post => post.id !== id);

        this.savePosts(posts);

        return this.doRequest(null);
    }

    public editPost(id: number, title: string, content: string): Promise<null> {
        const posts = this.getLocalPosts();

        posts.forEach((post) => {
            if (post.id === id) {
                post.title = title;
                post.content = content;
            }
        });

        this.savePosts(posts);

        return this.doRequest(null);
    }

    public createPost(title: string, content: string): Promise<null> {
        const posts = this.getLocalPosts();

        const id = this.maxBy(posts, 'id') + 1;
        posts.unshift({
            id,
            title,
            content
        });

        this.savePosts(posts);
        return this.doRequest(null);

    }

    public login(userName: string, password: string): Promise<any> {
        if (userName === 'demo' && password === 'demo') {
            return this.doRequest({ token: 'token' });
        } else {
            return this.doRequest({ wrongInfo: true }, true);
        }
    }

    maxBy(arr: Array<any>, field: string) {
        return arr.map(o => o[field]).reduce((a, b) => {
            return Math.max(a, b);
        });
    }

    private savePosts(posts: PostModel[]) {
        localStorage.setItem(DB_KEY, JSON.stringify(posts));
    }

    private initData() {
        const posts = [
            {
                id: 1,
                title: 'My daughter (7) keeps getting touched inappropriately at school, school brushing it off (Washington)',
                content: 'On a near daily basis, my daughter (age 7) is getting groped by a boy at school. She says he typically does it when the class is lining up and when the teacher is not looking, or at recess. So far he has touched her butt, her chest, and proclaimed "we should have sex."\n' +
                    '\n' +
                    'We talked with the teacher, who said she would "keep an eye on things" to try and eliminate the opportunity for it to occur. This has not helped. We escalated to the principal, who was kind but essentially said it was up to my daughter to cause a scene and yell and scream to bring attention to the issue whenever it happens to try and deter it, but my daughter does not want to do this because she finds the situation embarrassing and doesn\'t want the attention. Not to mention, it\'s not actually addressing the issue.'
            },
            {
                id: 2,
                title: 'Trump plans to sign an executive order that would remove the right to citizenship for babies of non-citizens and unauthorized immigrants born on U.S. soil. Would you support such a decision, why/why not?',
                content: 'We talked with the teacher, who said she would "keep an eye on things" to try and eliminate the opportunity for it to occur. This has not helped. We escalated to the principal, who was kind but essentially said it was up to my daughter to cause a scene and yell and scream to bring attention to the issue whenever it happens to try and deter it, but my daughter does not want to do this because she finds the situation embarrassing and doesn\'t want the attention. Not to mention, it\'s not actually addressing the issue.'
            }
        ];

        localStorage.setItem(DB_KEY, JSON.stringify(posts));
        localStorage.setItem('didInit', '1');
    }

    private doRequest(res: any, err = false): Promise<any> {
        return new Promise( (resolve, reject) => {
            store.commit('layout/setLoading', true);
            setTimeout(() => {
                if (err) {
                    reject(res);
                    store.commit('layout/setLoading', false);
                } else {
                    resolve(res);
                    store.commit('layout/setLoading', false);
                }
            }, DELAY);
        });
    }

    private getLocalPosts(): PostModel[]  {
        return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    }

}

export default new MockApi();
