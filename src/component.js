import styles from './css/main.scss';

export default (text = 'Setup') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  console.log(styles);

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