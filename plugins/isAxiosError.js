import axios from 'axios';

export default (ctx, inject) => {
  inject('isAxiosError', (error) => {    
    return axios.isAxiosError(error);
  });
}
