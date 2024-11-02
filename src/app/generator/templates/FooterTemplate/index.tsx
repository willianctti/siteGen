'use client';

import { motion } from 'framer-motion';
import styles from './styles.module.css';

interface FooterTemplateProps {
  logo: string;
  sections: Array<{
    title: string;
    content: string[];
  }>;
  styles: {
    backgroundColor: string;
    gradientStart: string;
    gradientEnd: string;
    textColor: string;
  };
  contact: {
    title?: string;
    email: string;
    phone: string;
    address?: string;
    socialMedia: Array<{
      icon: string;
      url: string;
    }>;
  };
  newsletter: {
    enabled: boolean;
    title: string;
    subtitle: string;
  };
  quickLinks: {
    enabled: boolean;
    title: string;
    items: Array<{ label: string; link: string }>;
  };
}

export default function FooterTemplate({
  logo,
  sections,
  styles: customStyles,
  contact,
  newsletter,
  quickLinks,
}: FooterTemplateProps) {
  return (
    <footer 
      className={styles.footer}
      style={{
        background: `linear-gradient(0deg, ${customStyles.gradientStart}, ${customStyles.gradientEnd})`,
        color: customStyles.textColor
      }}
    >
      <div className={styles.content}>
        {logo && (
          <motion.div className={styles.logoSection}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </motion.div>
        )}

        <div className={styles.sectionsGrid}>
          {/* Links Rápidos */}
          {quickLinks.enabled && (
            <motion.div className={styles.section}>
              <h4 className={styles.sectionTitle}>{quickLinks.title}</h4>
              <ul className={styles.sectionContent}>
                {quickLinks.items.map((item, index) => (
                  <li key={index}>
                    <a href={item.link}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Contato */}
          {contact && (
            <motion.div className={styles.section}>
              <h4 className={styles.sectionTitle}>{contact.title}</h4>
              <ul className={styles.sectionContent}>
                {contact.email && <li>{contact.email}</li>}
                {contact.phone && <li>{contact.phone}</li>}
                {contact.address && <li>{contact.address}</li>}
              </ul>
              {contact.socialMedia && contact.socialMedia.length > 0 && (
                <div className={styles.socialMedia}>
                  {contact.socialMedia.map((social, index) => (
                    <a 
                      key={index} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Newsletter */}
          {newsletter.enabled && (
            <motion.div className={styles.section}>
              <h4 className={styles.sectionTitle}>{newsletter.title}</h4>
              <p className={styles.newsletterSubtitle}>{newsletter.subtitle}</p>
            </motion.div>
          )}

          {/* Seções customizadas */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className={styles.section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className={styles.sectionTitle}>{section.title}</h4>
              <ul className={styles.sectionContent}>
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}