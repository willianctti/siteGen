'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.css';

interface LandingTemplateProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  styles: {
    backgroundColor: string;
    textGradientStart: string;
    textGradientEnd: string;
    textColor: string;
  };
}

export default function LandingTemplate({
  title,
  subtitle,
  backgroundImage,
  styles: customStyles,
}: LandingTemplateProps) {
  return (
    <motion.section
      className={styles.landing}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: customStyles.backgroundColor,
      }}
    >
      <div className={styles.overlay}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundImage: `linear-gradient(45deg, ${customStyles.textGradientStart}, ${customStyles.textGradientEnd})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ color: customStyles.textColor }}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.section>
  );
}