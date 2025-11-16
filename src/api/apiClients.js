import axios from 'axios';
import { toast } from 'react-toastify';

// A URL base da sua API (porta 8081 do backend)
const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratar erros de resposta automaticamente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extrai a mensagem de erro da resposta da API ou usa uma mensagem padrão
    const message = error.response?.data?.message || error.message || 'Ocorreu um erro inesperado.';
    
    // Exibe um "toast" de erro
    toast.error(message);
    
    return Promise.reject(error);
  }
);

export default apiClient;