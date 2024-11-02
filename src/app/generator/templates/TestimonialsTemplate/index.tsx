'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.css';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  image?: string;
}

interface TestimonialsTemplateProps {
  title: string;
  items: TestimonialItem[];
  styles: {
    backgroundColor: string;
    gradientStart: string;
    gradientEnd: string;
    textColor: string;
    borderRadius: number;
  };
}

export default function TestimonialsTemplate({
  title,
  items,
  styles: customStyles,
}: TestimonialsTemplateProps) {
  return (
    <section 
      className={styles.testimonials}
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
            className={styles.testimonial}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              backgroundColor: customStyles.backgroundColor,
              borderRadius: `${customStyles.borderRadius}px`
            }}
          >
            {item.image && (
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.name} className={styles.image} />
              </div>
            )}
            <p className={styles.text}>{item.text}</p>
            <div className={styles.author}>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}