export default ({ app }, inject) => {
  /* 
    This plugins allows Sidebar to redirect to all pages
  */
  inject('menu', route => {
    app.router.push(route);
  })
}