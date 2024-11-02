'use client';

import { ComponentOptions } from '../../types/index';
import styles from './styles.module.css';
import HeaderTemplate from '../../templates/HeaderTemplate';
import LandingTemplate from '../../templates/LandingTemplate';
import ServicesTemplate from '../../templates/ServicesTemplate';
import TestimonialsTemplate from '../../templates/TestimonialsTemplate';
import FooterTemplate from '../../templates/FooterTemplate';

interface PreviewPanelProps {
  config: ComponentOptions;
}

export default function PreviewPanel({ config }: PreviewPanelProps) {
  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        {config.header.enabled && (
          <HeaderTemplate 
            {...config.header}
            styles={{
              ...config.header.styles,
              backgroundColor: config.header.styles?.backgroundColor || '#ffffff',
              gradientStart: config.header.styles?.gradientStart || '#ffffff',
              gradientEnd: config.header.styles?.gradientEnd || '#ffffff',
              textColor: config.header.styles?.textColor || '#000000',
              blurOpacity: config.header.styles?.blurOpacity || 0
            }}
          />
        )}
        {config.landing.enabled && (
          <LandingTemplate 
            {...config.landing}
            styles={{
              ...config.landing.styles,
              backgroundColor: config.landing.styles?.backgroundColor || '#ffffff',
              textColor: config.landing.styles?.textColor || '#000000',
              textGradientStart: config.landing.styles?.textGradientStart || '#000000',
              textGradientEnd: config.landing.styles?.textGradientEnd || '#000000'
            }}
          />
        )}
        {config.services.enabled && (
          <ServicesTemplate 
            {...config.services}
            styles={{
              ...config.services.styles,
              backgroundColor: config.services.styles?.backgroundColor || '#ffffff',
              textColor: config.services.styles?.textColor || '#000000',
              gradientStart: config.services.styles?.gradientStart || '#ffffff',
              gradientEnd: config.services.styles?.gradientEnd || '#ffffff',
              borderRadius: config.services.styles?.borderRadius || 0
            }}
          />
        )}
        {config.testimonials.enabled && (
          <TestimonialsTemplate 
            {...config.testimonials}
            styles={{
              ...config.services.styles,
              backgroundColor: config.services.styles?.backgroundColor || '#ffffff',
              textColor: config.services.styles?.textColor || '#000000',
              gradientStart: config.services.styles?.gradientStart || '#ffffff',
              gradientEnd: config.services.styles?.gradientEnd || '#ffffff',
              borderRadius: config.services.styles?.borderRadius || 0
            }}
          />
        )}
        {config.footer.enabled && (
          <FooterTemplate 
            logo={config.footer.logo}
            sections={config.footer.sections}
            styles={{
              backgroundColor: config.footer.styles?.backgroundColor || '#1a1a1a',
              gradientStart: config.footer.styles?.gradientStart || '#2a2a2a',
              gradientEnd: config.footer.styles?.gradientEnd || '#1a1a1a',
              textColor: config.footer.styles?.textColor || '#ffffff'
            }}
            contact={config.footer.contact}
            newsletter={config.footer.newsletter}
            quickLinks={config.footer.quickLinks}
          />
        )}
      </div>
    </div>
  );
}