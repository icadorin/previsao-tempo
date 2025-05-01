import { FiSearch, FiMapPin, FiSun, FiMoon } from 'react-icons/fi'
import styles from '../styles/Header.module.css'
import { useTheme } from './ThemeContext'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const { isDark, toggleTheme } = useTheme()
  const [input, setInput] = useState('')

  const handleSearch = () => {
    if (input.trim()) onSearch(input)
  }

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        onSearch(`${latitude},${longitude}`)
      },
      () => {
        alert('Não foi possível obter sua localização. Por favor, digite uma cidade manualmente.')
      }
    )
  }

  return (
    <div className={styles.headerContainer}>
      <button
        onClick={toggleTheme}
        className={styles.toggleButton}
        aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      >
        {isDark ? <FiSun size={18} /> : <FiMoon size={20} />}
      </button>
      <div className={styles.mainContainer}>
        <h1>Previsão do Tempo</h1>
        <button
          onClick={handleGeolocation}
          className={styles.geolocationButton}
        >
          <FiMapPin size={18} />
        </button>

        <div className={styles.inputWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite uma cidade"
            className={styles.inputField}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
      <div className={styles.divButton}>
        <button onClick={handleSearch} className={styles.searchButton}>
          Buscar
        </button>

      </div>
    </div>
  )
}
