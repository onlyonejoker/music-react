export function resize(): void {
  const html = document.documentElement;
  html.style.fontSize = (html.offsetWidth / 1536) * 10 + "px";
  document.body.onresize = () => {
    html.style.fontSize = (html.offsetWidth / 1536) * 10 + "px";
  };
}
