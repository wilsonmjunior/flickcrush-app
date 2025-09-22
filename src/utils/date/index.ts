export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}min`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
};

export const getFullYear = (dateString: string) => {
  return new Date(dateString).getFullYear();
};

/**
 * Formata uma data para o padrão brasileiro (DD/MM/YYYY)
 */
export const formatDateToBrazilian = (date: Date) => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Formata um horário para o padrão brasileiro (HH:mm)
 */
export const formatTimeToBrazilian = (time: Date) => {
  return time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Converte um horário para string no formato HH:mm
 */
export const formatTimeToString = (time: Date) => {
  return time.toTimeString().slice(0, 5); // HH:mm format
};

/**
 * Verifica se uma data está no passado (considerando apenas o dia)
 */
export const isDateInPast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Verifica se um horário está no passado (considerando data e hora)
 */
export const isTimeInPast = (date: Date, time: Date) => {
  const now = new Date();
  const scheduledDateTime = new Date(date);
  scheduledDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return scheduledDateTime < now;
};

/**
 * Verifica se é possível agendar para uma data e horário específicos
 */
export const canScheduleDateTime = (date: Date, time: Date) => {
  return !isDateInPast(date) && !isTimeInPast(date, time);
};
