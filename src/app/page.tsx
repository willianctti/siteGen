'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiLayout, FiCode, FiEye, FiBox, FiGrid, FiCpu, FiArrowRight, FiGithub } from 'react-icons/fi';
import styles from './styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <span className={styles.logo}>SiteGen</span>
          <Link href="/generator" className={styles.navButton}>
            Acessar Ferramenta
          </Link>
        </div>
      </nav>

      <div className={styles.heroSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <div className={styles.decorativeBlob1} />
          <div className={styles.decorativeBlob2} />
          
          <h1 className={styles.title}>Site Generator</h1>
          <p className={styles.subtitle}>
            Crie sites profissionais de forma rápida e eficiente com nossa ferramenta intuitiva de geração de componentes
          </p>
          
          <Link href="/generator" className={styles.ctaButton}>
            <FiCode className="mr-2" />
            Começar a Criar
            <FiArrowRight className="ml-2" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.featuresSection}
        >
          <h2 className={styles.featuresTitle}>Recursos Disponíveis</h2>
          <p className={styles.featuresSubtitle}>
            Explore todas as funcionalidades que tornam nossa ferramenta única e poderosa para criar sites incríveis
          </p>
          
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={styles.featureCard}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <footer className={styles.footer}>
  <p>© {new Date().getFullYear()} Site Generator. Todos os direitos reservados.</p>
  <a 
    href="https://github.com/willianctti" 
    target="_blank" 
    rel="noopener noreferrer"
    className={styles.githubLink}
  >
    <FiGithub className="mr-2" />
    Desenvolvido por Willian
  </a>
</footer>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <FiLayout className="w-6 h-6" />,
    title: 'Headers Personalizados',
    description: 'Crie headers únicos com diferentes estilos e layouts'
  },
  {
    icon: <FiEye className="w-6 h-6" />,
    title: 'Preview em Tempo Real',
    description: 'Visualize as mudanças instantaneamente enquanto desenvolve'
  },
  {
    icon: <FiBox className="w-6 h-6" />,
    title: 'Componentes Prontos',
    description: 'Biblioteca de componentes modernos e responsivos'
  },
  {
    icon: <FiGrid className="w-6 h-6" />,
    title: 'Layouts Flexíveis',
    description: 'Adapte o layout às suas necessidades específicas'
  },
  {
    icon: <FiCpu className="w-6 h-6" />,
    title: 'Código Otimizado',
    description: 'Gere código limpo e otimizado automaticamente'
  },
  {
    icon: <FiCode className="w-6 h-6" />,
    title: 'Exportação Simples',
    description: 'Exporte o código pronto para usar em seu projeto'
  }
];