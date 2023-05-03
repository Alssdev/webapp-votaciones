export default ({ app }, inject) => {
  /* 
    This plugins allows Sidebar to redirect to all pages
  */
  inject('goBack', () => {
    app.router.go(-1);
  });
}