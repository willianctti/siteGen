'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.css';

interface HeaderTemplateProps {
  alignment?: 'left' | 'center' | 'right';
  logo?: string;
  navigation?: {
    enabled: boolean;
    items: Array<{ label: string; link: string }>;
  };
  backgroundImage?: {
    enabled: boolean;
    url: string;
    blur: boolean;
    opacity: number;
  };
  styles: {
    backgroundColor: string;
    gradientStart: string;
    gradientEnd: string;
    textColor: string;
    blurOpacity: number;
  };
}

export default function HeaderTemplate({
  alignment = 'left',
  logo = '',
  navigation = { enabled: false, items: [] },
  backgroundImage = { enabled: false, url: '', blur: false, opacity: 0.5 },
  styles: customStyles
}: HeaderTemplateProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.header}
      style={{
        textAlign: alignment,
        background: `linear-gradient(135deg, ${customStyles.gradientStart}, ${customStyles.gradientEnd})`,
        color: customStyles.textColor
      }}
    >
      <div
        className={styles.overlay}
        style={{
          backdropFilter: backgroundImage.blur ? 'blur(8px)' : 'none',
          backgroundColor: `rgba(0, 0, 0, ${customStyles.blurOpacity})`,
        }}
      >
        <div className={styles.headerContent}>
          {logo && (
            <div className={styles.logo}>
              <img src={logo} alt="Logo" />
            </div>
          )}
          
          {navigation.enabled && (
            <nav className={styles.nav}>
              {navigation.items.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: customStyles.textColor }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </motion.header>
  );
}