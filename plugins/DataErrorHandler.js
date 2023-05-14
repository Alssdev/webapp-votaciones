import { NotificationProgrammatic as notification } from 'buefy';

export default (ctx, inject) => {
  /* 
    This plugins allows handler errors globally
  */
  inject('dataErrorHandler', (error) => {
    const errorData = error.response.data;
    console.log(errorData);

    // CHECK ERROR
    if (errorData.code === '23514') {
      return notification.open({
        type: 'is-warning',
        message: 'Revise que todos los campos estén correctamente llenos.',
        duration: 10000
      });
    } else if (errorData.code === '23503') {
      return notification.open({
        type: 'is-warning',
        message: 'De esta entidad dependen otras por lo que no puede ser eliminada',
        duration: 10000
      });
    }

    notification.open({
      type: 'is-warning',
      message: errorData.message,
      duration: 10000
    });
  });
}
