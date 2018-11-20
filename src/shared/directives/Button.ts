export default {
    bind(el: HTMLElement, binding: any) {
        el.className += ` app-btn btn-${binding.value}`;
    },
};
