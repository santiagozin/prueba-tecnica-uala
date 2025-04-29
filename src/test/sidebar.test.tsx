import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Sidebar from '@/components/custom/Sidebar';
import { BrowserRouter } from 'react-router-dom';

// Mock de las imágenes
vi.mock('@/assets/logo.svg', () => ({
  default: 'mocked-logo.svg'
}));

vi.mock('@/assets/appstores/google.svg', () => ({
  default: 'mocked-google.svg'
}));

vi.mock('@/assets/appstores/apple.svg', () => ({
  default: 'mocked-apple.svg'
}));

describe('Sidebar', () => {
  const renderSidebar = (props = {}) => {
    return render(
      <BrowserRouter>
        <Sidebar {...props} />
      </BrowserRouter>
    );
  };

  it('renderiza correctamente el logo', () => {
    renderSidebar();
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-logo.svg');
  });

  it('renderiza los enlaces de navegación', () => {
    renderSidebar();
    
    // Verificar que los enlaces de navegación están presentes
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Métricas')).toBeInTheDocument();
  });

  it('renderiza los enlaces de descarga de apps', () => {
    renderSidebar();
    
    // Verificar el título de la sección de apps
    expect(screen.getByText('Descargá la app desde')).toBeInTheDocument();
    
    // Verificar las imágenes de las tiendas
    const appleImage = screen.getByAltText('Apple');
    const googleImage = screen.getByAltText('Google');
    
    expect(appleImage).toBeInTheDocument();
    expect(googleImage).toBeInTheDocument();
    expect(appleImage).toHaveAttribute('src', 'mocked-apple.svg');
    expect(googleImage).toHaveAttribute('src', 'mocked-google.svg');
  });

  it('muestra el botón de cerrar cuando isMobile es true', () => {
    const mockOnClose = vi.fn();
    renderSidebar({ isMobile: true, onClose: mockOnClose });
    
    const closeButton = screen.getByLabelText('Cerrar menú');
    expect(closeButton).toBeInTheDocument();
    
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('no muestra el botón de cerrar cuando isMobile es false', () => {
    renderSidebar({ isMobile: false });
    expect(screen.queryByLabelText('Cerrar menú')).not.toBeInTheDocument();
  });

  it('aplica las clases correctas al contenedor principal', () => {
    renderSidebar();
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('w-[280px]', 'bg-white', 'h-screen');
  });
}); 