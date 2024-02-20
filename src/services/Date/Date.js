import { format } from "date-fns";
import { utcToZonedTime } from 'date-fns-tz';

export const formatDate = (date) => {
  const brasiliaTimeZone = 'America/Sao_Paulo';
  // Obtenha a data atual no fuso horário de Brasília
  const dataAtual = new Date();
  const brasiliaDate = utcToZonedTime(dataAtual, brasiliaTimeZone);
  return format(brasiliaDate, "yyyy-MM-dd'T'HH:mm:ssXXX") // Formate a data
}

