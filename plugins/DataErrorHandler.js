import { NotificationProgrammatic as notification } from 'buefy';

export default (ctx, inject) => {
  /* 
    This plugins allows handler errors globally
  */
  inject('dataErrorHandler', (error, errorCases) => {    
    for (const possibleCase of errorCases) {
      if (possibleCase.constraint_name === error.constraint_name) {
        return notification.open({
          type: 'is-warning',
          message: possibleCase.message,
          duration: 10000
        });
      }
    }

    ctx.$errorHandler(error);
  });
}
