import axios from 'axios';
import { API_URL } from '../constants';

interface HealthCoach {
  content: string;
}

export const getHealthCoach = async (message: string) => {
  const { data } = await axios.get<HealthCoach>(`${API_URL}/openai-bridge`, {
    params: {text: message}
  });

  return data.content.replace(/\*\*(.+)\*\*/g, '<b>$1</b>');
}
