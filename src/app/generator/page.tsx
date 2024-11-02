'use client';

import { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import PreviewPanel from './components/PreviewPanel';
import CodeOutput from './components/CodeOutput';
import { ComponentOptions } from './types/index';
import styles from './page.module.css';
import { FiGithub } from 'react-icons/fi';

const defaultConfig: ComponentOptions = {
  header: {
    enabled: false,
    logo: '',
    navigation: {
      enabled: false,
      items: [
        { label: 'Início', link: '#' },
        { label: 'Sobre', link: '#about' },
        { label: 'Serviços', link: '#services' },
        { label: 'Contato', link: '#contact' }
      ]
    },
    styles: {
      backgroundColor: '#000000',
      gradientStart: '#ffffff',
      gradientEnd: '#f39c12',
      textColor: '#ffffff',
      blurOpacity: 0.5,
      borderRadius: 8,
      padding: '1.5rem 2rem',
      position: 'fixed',
      height: '80px',
      logoSize: '150px'
    }
  },
  landing: {
    enabled: false,
    title: 'Bem-vindo',
    subtitle: 'Seu texto aqui',
    backgroundImage: '',
    styles: {
      textGradientStart: '#ffffff',
      textGradientEnd: '#f39c12',
      backgroundColor: '#1a1a1a'
    }
  },
  services: {
    enabled: false,
    title: 'Nossos Serviços',
    items: [
      {
        icon: '🌐',
        title: 'Desenvolvimento Web',
        description: 'Sites modernos e responsivos'
      }
    ],
    styles: {
      backgroundColor: '#1a1a1a',
      gradientStart: '#2a2a2a',
      gradientEnd: '#1a1a1a',
      textColor: '#ffffff',
      borderRadius: 15
    }
  },
  testimonials: {
    enabled: false,
    title: 'Depoimentos',
    items: [
      {
        name: 'Nome do Cliente',
        role: 'Cargo',
        text: 'Depoimento do cliente',
        image: ''
      }
    ],
    styles: {
      backgroundColor: '#2a2a2a',
      gradientStart: '#1a1a1a',
      gradientEnd: '#2a2a2a',
      textColor: '#ffffff',
      borderRadius: 20
    }
  },
  footer: {
    enabled: false,
    logo: '',
    sections: [],
    contact: {
      title: 'Entre em Contato',
      email: 'contato@empresa.com',
      phone: '(11) 99999-9999',
      address: 'Rua Exemplo, 123 - São Paulo/SP',
      socialMedia: [
        { icon: 'facebook', url: '#' },
        { icon: 'instagram', url: '#' },
        { icon: 'linkedin', url: '#' }
      ]
    },
    newsletter: {
      enabled: true,
      title: 'Newsletter',
      subtitle: 'Inscreva-se para receber novidades'
    },
    quickLinks: {
      enabled: true,
      title: 'Links Rápidos',
      items: [
        { label: 'Sobre Nós', link: '#about' },
        { label: 'Serviços', link: '#services' },
        { label: 'Blog', link: '#blog' },
        { label: 'Contato', link: '#contact' }
      ]
    },
    styles: {
      backgroundColor: '#000000',
      gradientStart: '#000000',
      gradientEnd: '#1a1a1a',
      textColor: '#ffffff',
      blurOpacity: 0.5,
      borderRadius: 8,
      padding: '4rem 2rem',
      gridColumns: 4,
      socialIconSize: '24px',
      socialIconColor: '#ffffff',
      socialIconHoverColor: '#f39c12'
    }
  }
};

export default function Generator() {
  const [config, setConfig] = useState<ComponentOptions>(defaultConfig);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ConfigForm config={config} onChange={setConfig} />
      </div>
      <div className={styles.main}>
        <PreviewPanel config={config} />
        <CodeOutput config={config} />
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