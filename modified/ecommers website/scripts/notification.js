const Notifier = {
    _element: document.querySelector('#notifier'),
    _timeoutId: null,

    fire(message, type = 'success') {
        this._element.classList.add(type);
        this._element.style.display = "flex";
        this._element.innerHTML = message;
    },


    hide() {
        this._element.style.display = "none";
    }

}