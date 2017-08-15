import styles from './css/main.css';

export default (text = 'Setup') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  element.className = styles.redButton;

  return element;
};