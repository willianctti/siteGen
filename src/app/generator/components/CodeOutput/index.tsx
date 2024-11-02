'use client';

import { useState } from 'react';
import { ComponentOptions } from '../../types/index';
import styles from './styles.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { 
  Button,
  Tabs,
  Tab,
  Box
} from '@mui/material';

interface CodeOutputProps {
  config: ComponentOptions;
}

export default function CodeOutput({ config }: CodeOutputProps) {
  const [activeTab, setActiveTab] = useState(0);

  const generateComponentCode = (component: string) => {
    switch (component) {
      case 'header':
        return config.header.enabled ? `
import { motion } from 'framer-motion';
import styles from './Header.module.css';

export default function Header() {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, ${config.header.styles.gradientStart}, ${config.header.styles.gradientEnd})',
        color: '${config.header.styles.textColor}'
      }}
    >
      {/* Header content */}
    </motion.header>
  );
}` : '';

      case 'landing':
        return config.landing.enabled ? `
import { motion } from 'framer-motion';
import styles from './Landing.module.css';

export default function Landing() {
  return (
    <motion.section
      className={styles.landing}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        backgroundImage: '${config.landing.backgroundImage ? `url(${config.landing.backgroundImage})` : 'none'}',
        backgroundColor: '${config.landing.styles.backgroundColor}'
      }}
    >
      <motion.h1
        style={{
          background: 'linear-gradient(45deg, ${config.landing.styles.textGradientStart}, ${config.landing.styles.textGradientEnd})',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        ${config.landing.title}
      </motion.h1>
      <motion.p>
        ${config.landing.subtitle}
      </motion.p>
    </motion.section>
  );
}` : '';

      case 'services':
        return config.services.enabled ? `
import { motion } from 'framer-motion';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section 
      className={styles.services}
      style={{
        background: 'linear-gradient(135deg, ${config.services.styles.gradientStart}, ${config.services.styles.gradientEnd})',
        color: '${config.services.styles.textColor}'
      }}
    >
      <h2>{${config.services.title}}</h2>
      <div className={styles.grid}>
        {${JSON.stringify(config.services.items, null, 2)}.map((item, index) => (
          <motion.div
            key={index}
            className={styles.card}
            style={{
              backgroundColor: '${config.services.styles.backgroundColor}',
              borderRadius: '${config.services.styles.borderRadius}px'
            }}
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}` : '';

      case 'testimonials':
        return config.testimonials.enabled ? `
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section 
      className={styles.testimonials}
      style={{
        background: 'linear-gradient(135deg, ${config.testimonials.styles.gradientStart}, ${config.testimonials.styles.gradientEnd})',
        color: '${config.testimonials.styles.textColor}'
      }}
    >
      <h2>{${config.testimonials.title}}</h2>
      <div className={styles.grid}>
        {${JSON.stringify(config.testimonials.items, null, 2)}.map((item, index) => (
          <motion.div
            key={index}
            className={styles.testimonial}
            style={{
              backgroundColor: '${config.testimonials.styles.backgroundColor}',
              borderRadius: '${config.testimonials.styles.borderRadius}px'
            }}
          >
            {item.image && <img src={item.image} alt={item.name} />}
            <p>{item.text}</p>
            <div className={styles.author}>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}` : '';

      case 'footer':
        return config.footer.enabled ? `
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer 
      className={styles.footer}
      style={{
        background: \`linear-gradient(0deg, ${config.footer.styles.gradientStart}, ${config.footer.styles.gradientEnd})\`,
        color: '${config.footer.styles.textColor}'
      }}
    >
      <div className={styles.content}>
        {${config.footer.logo} && (
          <motion.div className={styles.logoSection}>
            <img src="${config.footer.logo}" alt="Logo" className={styles.logo} />
          </motion.div>
        )}

        <div className={styles.sectionsGrid}>
          {${JSON.stringify(config.footer.sections)}.map((section, index) => (
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
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
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
}` : '';

    }
  };

  const generateStylesCode = (component: string) => {
    switch (component) {
      case 'header':
        return config.header.enabled ? `
.header {
  position: fixed;
  width: 100%;
  z-index: 1000;
  padding: ${config.header.styles.padding};
}` : '';

      case 'services':
        return config.services.enabled ? `
.services {
  padding: 4rem 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s;
}

.iconWrapper {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}` : '';

      case 'testimonials':
        return config.testimonials.enabled ? `
.testimonials {
  padding: 4rem 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial {
  padding: 2rem;
  text-align: center;
}

.author {
  margin-top: 1rem;
}` : '';

      case 'footer':
        return config.footer.enabled ? `
.footer {
  padding: 4rem 2rem 2rem;
  color: white;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

.logoSection {
  text-align: center;
  margin-bottom: 3rem;
}

.logo {
  height: 40px;
  object-fit: contain;
}

.sectionsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.section {
  padding: 1rem;
}

.sectionTitle {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.sectionContent {
  list-style: none;
  padding: 0;
}

.sectionContent li {
  margin-bottom: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.sectionContent li:hover {
  opacity: 1;
}

.bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.7;
}` : '';

    }
  };

  const handleCopyCode = () => {
    const code = generateComponentCode(['header', 'landing', 'services', 'testimonials', 'footer']
      .map(comp => generateComponentCode(comp))
      .join('\n\n'));
    if (code) {
      navigator.clipboard.writeText(code);
    }
  };

  return (
    <div className={styles.container}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Components" />
          <Tab label="Styles" />
        </Tabs>
      </Box>

      <Button 
        variant="contained" 
        onClick={handleCopyCode}
        className={styles.copyButton}
      >
        Copy Code
      </Button>

      {activeTab === 0 ? (
        <SyntaxHighlighter 
          language="typescript" 
          style={tomorrow}
          className={styles.codeBlock}
        >
          {['header', 'landing', 'services', 'testimonials', 'footer']
            .map(comp => generateComponentCode(comp))
            .filter(code => code)
            .join('\n\n')}
        </SyntaxHighlighter>
      ) : (
        <SyntaxHighlighter 
          language="css" 
          style={tomorrow}
          className={styles.codeBlock}
        >
          {['header', 'landing', 'services', 'testimonials', 'footer']
            .map(comp => generateStylesCode(comp))
            .join('\n\n')}
        </SyntaxHighlighter>
      )}
    </div>
  );
}