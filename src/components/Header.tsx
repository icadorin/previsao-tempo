import { FiSearch, FiMapPin, FiSun, FiMoon, FiLoader } from 'react-icons/fi';
import styles from '../styles/Header.module.css';
import { useTheme } from './ThemeContext';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  currentLocation?: string;
}

export default function SearchBar({
  onSearch,
  currentLocation,
}: SearchBarProps) {
  const { isDark, toggleTheme } = useTheme();
  const [input, setInput] = useState('');
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [lastSearchType, setLastSearchType] = useState<
    'manual' | 'geolocation'
  >('manual');

  const handleSearch = () => {
    if (input.trim()) {
      setLastSearchType('manual');
      onSearch(input.trim());
    }
  };

  const handleGeolocation = async () => {
    if (!navigator.geolocation) {
      alert('Seu navegador não suporta geolocalização ou está bloqueada.');
      return;
    }

    setIsGeolocating(true);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        },
      );

      const { latitude, longitude } = position.coords;
      setLastSearchType('geolocation');
      onSearch(`${latitude},${longitude}`);

      setInput('');
    } catch (error: any) {
      let errorMessage = 'Não foi possível obter sua localização.';

      if (error.code === error.PERMISSION_DENIED) {
        errorMessage =
          'Permissão de localização negada. Por favor, habilite nas configurações do seu navegador.';
      } else if (error.code === error.TIMEOUT) {
        errorMessage =
          'Tempo esgotado para obter a localização. Verifique sua conexão.';
      }

      alert(errorMessage);
    } finally {
      setIsGeolocating(false);
    }
  };

  useEffect(() => {
    if (currentLocation && lastSearchType === 'manual') {
      setInput(currentLocation);
    }
  }, [currentLocation, lastSearchType]);

  return (
    <div className={styles.headerWrapper}>
      <button
        onClick={toggleTheme}
        className={styles.toggleButton}
        aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      >
        {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
      </button>

      <div className={styles.headerContainer}>
        <div className={styles.mainContainer}>
          <h1>Previsão do Tempo</h1>

          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lastSearchType === 'geolocation'
                    ? 'Usando sua localização atual'
                    : 'Digite uma cidade...'
                }
                className={styles.inputField}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleGeolocation}
                className={styles.geolocationButton}
                aria-label="Usar minha localização atual"
                disabled={isGeolocating}
              >
                {isGeolocating ? (
                  <FiLoader className="spin" size={15} />
                ) : (
                  <>
                    <FiMapPin size={15} />
                    <span className={styles.geolocationText}>
                      {lastSearchType === 'geolocation'
                        ? 'Atualizar'
                        : 'Localização'}
                    </span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleSearch}
              className={styles.searchButton}
              disabled={!input.trim()}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
