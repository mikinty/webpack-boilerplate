import styles from './css/main.css';

export default (text = 'Setup') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  element.className = styles.redButton;

  element.onclick = () => {
    import('./lazy').then((lazy) => {
      element.textContent = lazy.default;
    }).catch((err) => {
      console.error(err);
    });
  };

  return element;
};