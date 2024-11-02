'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.css';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface ServicesTemplateProps {
  title: string;
  items: ServiceItem[];
  styles: {
    backgroundColor: string;
    gradientStart: string;
    gradientEnd: string;
    textColor: string;
    borderRadius: number;
  };
}

export default function ServicesTemplate({
  title,
  items,
  styles: customStyles,
}: ServicesTemplateProps) {
  return (
    <section 
      className={styles.services}
      style={{
        background: `linear-gradient(135deg, ${customStyles.gradientStart}, ${customStyles.gradientEnd})`,
        color: customStyles.textColor
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.title}
      >
        {title}
      </motion.h2>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            style={{
              backgroundColor: customStyles.backgroundColor,
              borderRadius: `${customStyles.borderRadius}px`
            }}
          >
            <div className={styles.iconWrapper}>
              {item.icon.startsWith('http') ? (
                <img src={item.icon} alt={item.title} className={styles.icon} />
              ) : (
                <span className={styles.emoji}>{item.icon}</span>
              )}
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}