class HelloWorld {
    buttonClass = "btn-green"; // ES7 feature
    render() {
        var button = document.createElement('button');
        button.classList.add(this.buttonClass);
        button.innerHTML = 'Hello Webpack';
        var body = document.querySelector('body');
        body.classList.add('body');
        body.append(button);
    }
}

export default HelloWorld; // ES6 feature