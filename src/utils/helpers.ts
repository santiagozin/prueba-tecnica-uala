/**
 * Función de utilidad para probar el alias @
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}; 