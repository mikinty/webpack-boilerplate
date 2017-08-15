export default (text = 'Setup') => {
    const element = document.createElement('div');

    element.innerHTML = text;

    return element;
};