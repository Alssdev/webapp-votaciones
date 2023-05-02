import { NotificationProgrammatic as notification } from 'buefy';
import { ToastProgrammatic as toast } from 'buefy';
import axios from 'axios';


export default (ctx, inject) => {
  /* 
    This plugins allows handler errors globally
  */
  inject('errorHandler', ( error ) => {    
    if (axios.isAxiosError(error)) {
      if (error.response !== undefined) {
        if (error.response.status === 400) {
          toast.open({
            type: 'is-warning',
            message: error.response.data.message,
            duration: 10000
          });
        } else {
          notification.open({
            type: 'is-danger',
            message: `Ocurrió un error inesperado, por favor no cambie de página y
            reporte el error`,
            duration: 10000
          });
          console.log(error);
        }
      } else {
        notification.open({
          type: 'is-warning',
          message: `Error de conexión, revise que esté conectado a internet.`,
          duration: 10000
        });
      }
    } else {
      notification.open({
        type: 'is-danger',
        message: `Ocurrió un error inesperado, por favor no cambie de página y
        reporte el error`,
        duration: 10000
      });
      console.log(error);
    }
  });
}
