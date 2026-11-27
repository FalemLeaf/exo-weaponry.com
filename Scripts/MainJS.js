const themes = {
  dark: {
    colors: {

    },
    video: './Assets/Vids/HomeBG.mp4',
    video: '../Assets/Vids/HomeBG.mp4'

  },
  light: {
    colors: {

    },
    video: './Assets/Vids/HomeBG_Light.mp4',
    video: '../Assets/Vids/HomeBG_Light.mp4'
  }
};

const root = document.documentElement;

function setVideo(name) {
  const v = document.getElementById('bgVideo');
  if (!v) return;
  const src = themes[name].video;
  if (v.getAttribute('src') === src) return;
  v.src = src;
  v.load();
  v.play().catch(() => {});  
}

function applyTheme(name) {
  for (const [prop, value] of Object.entries(themes[name].colors)) {
    root.style.setProperty(prop, value);
  }
  root.style.colorScheme = name;
  root.dataset.theme = name;
  try { localStorage.setItem('theme', name); } catch (e) {}
  setVideo(name);  
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
const system = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
applyTheme(saved in themes ? saved : system);

document.addEventListener('DOMContentLoaded', () => {
  setVideo(root.dataset.theme); 
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', () =>
    applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
});