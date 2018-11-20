const layoutState = {
    loading: false
};


const mutations = {

    setLoading(state, loading: boolean) {
        state.loading = loading;
    }
};

export default  {
    namespaced: true,
    state: layoutState,
    mutations
};
