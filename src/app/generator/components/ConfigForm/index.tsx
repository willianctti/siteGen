'use client';

import { useState, useEffect } from 'react';
import { ComponentOptions, StyleOptions } from '../../types/index';
import styles from './styles.module.css';
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Select,
  MenuItem,
  Typography,
  Slider,
  Button,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HexColorPicker } from 'react-colorful';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { FiGithub } from 'react-icons/fi';

interface ConfigFormProps {
  config: ComponentOptions;
  onChange: (config: ComponentOptions) => void;
}

interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPickerField = ({ value, onChange, label }: ColorPickerFieldProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className={styles.colorPicker}>
      <Typography variant="caption">{label}</Typography>
      <div className={styles.colorPickerWrapper}>
        <div
          className={styles.colorPreview}
          style={{ backgroundColor: value }}
          onClick={() => setShowPicker(!showPicker)}
        />
        {showPicker && (
          <div className={styles.colorPickerPopover}>
            <HexColorPicker color={value} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default function ConfigForm({ config, onChange }: ConfigFormProps) {
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeColorPicker && !(event.target as Element).closest('.colorPickerWrapper')) {
        setActiveColorPicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeColorPicker]);

  const handleStyleChange = (
    section: string, 
    property: keyof StyleOptions, 
    value: string | number
  ) => {
    onChange({
      ...config,
      [section]: {
        ...config[section as keyof ComponentOptions],
        styles: {
          ...config[section as keyof ComponentOptions].styles,
          [property]: value
        }
      }
    });
  };

  const handleNavigationChange = (index: number, field: 'label' | 'link', value: string) => {
    const newItems = [...config.header.navigation.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({
      ...config,
      header: {
        ...config.header,
        navigation: {
          ...config.header.navigation,
          items: newItems
        }
      }
    });
  };

  const addNavigationItem = () => {
    const newItems = [...config.header.navigation.items, { label: '', link: '' }];
    onChange({
      ...config,
      header: {
        ...config.header,
        navigation: {
          ...config.header.navigation,
          items: newItems
        }
      }
    });
  };

  const removeNavigationItem = (index: number) => {
    const newItems = [...config.header.navigation.items];
    newItems.splice(index, 1);
    onChange({
      ...config,
      header: {
        ...config.header,
        navigation: {
          ...config.header.navigation,
          items: newItems
        }
      }
    });
  };

  const handleContactChange = (field: 'email' | 'phone', value: string) => {
    onChange({
      ...config,
      footer: {
        ...config.footer,
        contact: {
          ...config.footer.contact,
          [field]: value
        }
      }
    });
  };

  const handleSocialMediaChange = (index: number, field: 'icon' | 'url', value: string) => {
    const newItems = [...config.footer.contact.socialMedia];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({
      ...config,
      footer: {
        ...config.footer,
        contact: {
          ...config.footer.contact,
          socialMedia: newItems
        }
      }
    });
  };

  const handleQuickLinkChange = (index: number, field: 'label' | 'link', value: string) => {
    const newItems = [...config.footer.quickLinks.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({
      ...config,
      footer: {
        ...config.footer,
        quickLinks: {
          ...config.footer.quickLinks,
          items: newItems
        }
      }
    });
  };

  const addQuickLink = () => {
    onChange({
      ...config,
      footer: {
        ...config.footer,
        quickLinks: {
          ...config.footer.quickLinks,
          items: [
            ...config.footer.quickLinks.items,
            { label: 'Novo Link', link: '#' }
          ]
        }
      }
    });
  };

  const removeQuickLink = (index: number) => {
    const newItems = config.footer.quickLinks.items.filter((_, i) => i !== index);
    onChange({
      ...config,
      footer: {
        ...config.footer,
        quickLinks: {
          ...config.footer.quickLinks,
          items: newItems
        }
      }
    });
  };

  const addSocialMedia = () => {
    onChange({
      ...config,
      footer: {
        ...config.footer,
        contact: {
          ...config.footer.contact,
          socialMedia: [
            ...config.footer.contact.socialMedia,
            { icon: 'youtube', url: '' }
          ]
        }
      }
    });
  };

  const removeSocialMedia = (index: number) => {
    const newItems = config.footer.contact.socialMedia.filter((_, i) => i !== index);
    onChange({
      ...config,
      footer: {
        ...config.footer,
        contact: {
          ...config.footer.contact,
          socialMedia: newItems
        }
      }
    });
  };

  const handleNewsletterChange = (field: 'enabled' | 'title' | 'subtitle', value: string | boolean) => {
    onChange({
      ...config,
      footer: {
        ...config.footer,
        newsletter: {
          ...config.footer.newsletter,
          [field]: value
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.title}>
          Configuração do Site
        </Typography>
        <a 
          href="https://github.com/willianctti" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          <FiGithub size={20} />
        </a>
      </div>

      {/* Header Config */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Header</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={<Switch checked={config.header.enabled} />}
            label="Ativar Header"
            onChange={(e) => onChange({
              ...config,
              header: {
                ...config.header,
                enabled: (e.target as HTMLInputElement).checked
              }
            })}
          />

          {config.header.enabled && (
            <>
              <Typography variant="subtitle2">Estilo do Fundo</Typography>
              <FormControl fullWidth margin="normal">
                <ColorPickerField
                  label="Cor de Fundo"
                  value={config.header.styles.backgroundColor || ''}
                  onChange={(color) => handleStyleChange('header', 'backgroundColor', color)}
                />
              </FormControl>

              <Typography variant="subtitle2">Opacidade do Blur</Typography>
              <Slider
                 value={config.services.styles.borderRadius}
                 onChange={(_, value) => handleStyleChange('services', 'borderRadius', Number(value))}
                 min={0}
                max={1}
                step={0.1}
              />

              <Typography variant="subtitle2">Gradiente do Logo</Typography>
              <div className={styles.gradientPicker}>
                <ColorPickerField
                  label="Cor Inicial"
                  value={config.header.styles.gradientStart || ''}
                  onChange={(color) => handleStyleChange('header', 'gradientStart', color)}
                />
                <ColorPickerField
                  label="Cor Final"
                  value={config.header.styles.gradientEnd || ''}
                  onChange={(color) => handleStyleChange('header', 'gradientEnd', color)}
                />
              </div>

              <FormControlLabel
                control={<Switch checked={config.header.navigation.enabled} />}
                label="Ativar Navegação"
                onChange={(e) => onChange({
                  ...config,
                  header: {
                    ...config.header,
                    navigation: {
                      ...config.header.navigation,
                      enabled: (e.target as HTMLInputElement).checked
                    }
                  }
                })}
              />

              {config.header.navigation.enabled && (
                <div className={styles.navigationItems}>
                  {config.header.navigation.items.map((item, index) => (
                    <div key={index} className={styles.navigationItem}>
                      <TextField
                        label="Texto do Link"
                        value={item.label}
                        onChange={(e) => handleNavigationChange(index, 'label', e.target.value)}
                      />
                      <TextField
                        label="URL"
                        value={item.link}
                        onChange={(e) => handleNavigationChange(index, 'link', e.target.value)}
                      />
                      <IconButton onClick={() => removeNavigationItem(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={addNavigationItem}
                    startIcon={<AddIcon />}
                  >
                    Adicionar Link
                  </Button>
                </div>
              )}
            </>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Landing Section Config */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Landing Section</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={<Switch checked={config.landing.enabled} />}
            label="Ativar Landing Section"
            onChange={(e) => onChange({
              ...config,
              landing: {
                ...config.landing,
                enabled: (e.target as HTMLInputElement).checked
              }
            })}
          />

          {config.landing.enabled && (
            <>
              <TextField
                fullWidth
                label="Título Principal"
                value={config.landing.title}
                onChange={(e) => onChange({
                  ...config,
                  landing: {
                    ...config.landing,
                    title: e.target.value
                  }
                })}
              />

              <TextField
                fullWidth
                multiline
                label="Subtítulo"
                value={config.landing.subtitle}
                onChange={(e) => onChange({
                  ...config,
                  landing: {
                    ...config.landing,
                    subtitle: e.target.value
                  }
                })}
              />

              <Typography variant="subtitle2">Gradiente do Texto</Typography>
              <div className={styles.gradientPicker}>
                <ColorPickerField
                  label="Cor Inicial"
                  value={config.landing.styles.textGradientStart || ''}
                  onChange={(color) => handleStyleChange('landing', 'textGradientStart', color)}
                />
                <ColorPickerField
                  label="Cor Final"
                  value={config.landing.styles.textGradientEnd || ''}
                  onChange={(color) => handleStyleChange('landing', 'textGradientEnd', color)}
                />
              </div>
            </>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Seção de Serviços</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={<Switch checked={config.services.enabled} />}
            label="Ativar Seção de Serviços"
            onChange={(e) => onChange({
              ...config,
              services: {
                ...config.services,
                enabled: (e.target as HTMLInputElement).checked
              }
            })}
          />

          {config.services.enabled && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Título da Seção"
                value={config.services.title}
                onChange={(e) => onChange({
                  ...config,
                  services: {
                    ...config.services,
                    title: e.target.value
                  }
                })}
              />

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Estilo dos Cards
              </Typography>
              
              <FormControl fullWidth margin="normal">
                <Typography variant="caption">Cor de Fundo dos Cards</Typography>
                <ColorPickerField
                  label="Cor de Fundo"
                  value={config.services.styles.backgroundColor || ''}
                  onChange={(color) => handleStyleChange('services', 'backgroundColor', color)}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Typography variant="caption">Border Radius dos Cards</Typography>
                <Slider
                  value={config.services.styles.borderRadius}
                  onChange={(_, value) => handleStyleChange('services', 'borderRadius', Number(value))}
                  min={0}
                  max={30}
                  step={1}
                />
              </FormControl>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Serviços
              </Typography>

              {config.services.items.map((item, index) => (
                <div key={index} className={styles.serviceItem}>
                  <TextField
                    fullWidth
                    label="Ícone (emoji ou URL)"
                    value={item.icon}
                    onChange={(e) => {
                      const newItems = [...config.services.items];
                      newItems[index] = { ...item, icon: e.target.value };
                      onChange({
                        ...config,
                        services: {
                          ...config.services,
                          items: newItems
                        }
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Título do Serviço"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...config.services.items];
                      newItems[index] = { ...item, title: e.target.value };
                      onChange({
                        ...config,
                        services: {
                          ...config.services,
                          items: newItems
                        }
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Descrição"
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...config.services.items];
                      newItems[index] = { ...item, description: e.target.value };
                      onChange({
                        ...config,
                        services: {
                          ...config.services,
                          items: newItems
                        }
                      });
                    }}
                  />
                </div>
              ))}

              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  onChange({
                    ...config,
                    services: {
                      ...config.services,
                      items: [
                        ...config.services.items,
                        { icon: '✨', title: 'Novo Serviço', description: 'Descrição do serviço' }
                      ]
                    }
                  });
                }}
              >
                Adicionar Serviço
              </Button>
            </>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Testimonials Section Config */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Depoimentos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={<Switch checked={config.testimonials.enabled} />}
            label="Ativar Seção de Depoimentos"
            onChange={(e) => onChange({
              ...config,
              testimonials: {
                ...config.testimonials,
                enabled: (e.target as HTMLInputElement).checked
              }
            })}
          />

          {config.testimonials.enabled && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Título da Seção"
                value={config.testimonials.title}
                onChange={(e) => onChange({
                  ...config,
                  testimonials: {
                    ...config.testimonials,
                    title: e.target.value
                  }
                })}
              />

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Estilo dos Cards
              </Typography>

              <div className={styles.gradientPicker}>
                <ColorPickerField
                  label="Cor Inicial"
                  value={config.testimonials.styles.gradientStart || ''}
                  onChange={(color) => handleStyleChange('testimonials', 'gradientStart', color)}
                />
                <ColorPickerField
                  label="Cor Final"
                  value={config.testimonials.styles.gradientEnd || ''}
                  onChange={(color) => handleStyleChange('testimonials', 'gradientEnd', color)}
                />
              </div>

              {config.testimonials.items.map((item, index) => (
                <div key={index} className={styles.testimonialItem}>
                  <TextField
                    fullWidth
                    label="Nome"
                    value={item.name}
                    onChange={(e) => {
                      const newItems = [...config.testimonials.items];
                      newItems[index] = { ...item, name: e.target.value };
                      onChange({
                        ...config,
                        testimonials: {
                          ...config.testimonials,
                          items: newItems
                        }
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Cargo"
                    value={item.role}
                    onChange={(e) => {
                      const newItems = [...config.testimonials.items];
                      newItems[index] = { ...item, role: e.target.value };
                      onChange({
                        ...config,
                        testimonials: {
                          ...config.testimonials,
                          items: newItems
                        }
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Depoimento"
                    value={item.text}
                    onChange={(e) => {
                      const newItems = [...config.testimonials.items];
                      newItems[index] = { ...item, text: e.target.value };
                      onChange({
                        ...config,
                        testimonials: {
                          ...config.testimonials,
                          items: newItems
                        }
                      });
                    }}
                  />
                </div>
              ))}

              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  onChange({
                    ...config,
                    testimonials: {
                      ...config.testimonials,
                      items: [
                        ...config.testimonials.items,
                        { name: 'Nome', role: 'Cargo', text: 'Depoimento', image: '' }
                      ]
                    }
                  });
                }}
              >
                Adicionar Depoimento
              </Button>
            </>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Footer Config */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Footer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={<Switch checked={config.footer.enabled} />}
            label="Ativar Footer"
            onChange={(e) => onChange({
              ...config,
              footer: {
                ...config.footer,
                enabled: (e.target as HTMLInputElement).checked,
                logo: config.footer.logo || '',
                sections: config.footer.sections || [
                  { title: 'Links Úteis', content: ['Início', 'Sobre', 'Serviços'] }
                ],
                styles: {
                  ...config.footer.styles,
                  backgroundColor: config.footer.styles?.backgroundColor || '#1a1a1a',
                  gradientStart: config.footer.styles?.gradientStart || '#2a2a2a',
                  gradientEnd: config.footer.styles?.gradientEnd || '#1a1a1a',
                  textColor: config.footer.styles?.textColor || '#ffffff'
                },
                contact: config.footer.contact || {
                  email: '',
                  phone: '',
                  socialMedia: []
                }
              }
            })}
          />

          {config.footer.enabled && (
            <>
              <Typography variant="subtitle2">Contato</Typography>
              <TextField
                fullWidth
                label="Email"
                value={config.footer.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
              />
              <TextField
                fullWidth
                label="Telefone"
                value={config.footer.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
              />
              
              <Typography variant="subtitle2" sx={{ mt: 2 }}>Redes Sociais</Typography>
              <div className={styles.socialMediaConfig}>
                {config.footer.contact.socialMedia.map((social, index) => (
                  <div key={index} className={styles.socialMediaItem}>
                    <Select
                      value={social.icon}
                      onChange={(e) => handleSocialMediaChange(index, 'icon', e.target.value)}
                    >
                      <MenuItem value="facebook">Facebook</MenuItem>
                      <MenuItem value="instagram">Instagram</MenuItem>
                      <MenuItem value="linkedin">LinkedIn</MenuItem>
                      <MenuItem value="twitter">Twitter</MenuItem>
                      <MenuItem value="youtube">YouTube</MenuItem>
                      <MenuItem value="tiktok">TikTok</MenuItem>
                    </Select>
                    <TextField
                      label="URL"
                      value={social.url}
                      onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                    />
                    <IconButton onClick={() => removeSocialMedia(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
                <Button
                  variant="outlined"
                  onClick={addSocialMedia}
                  startIcon={<AddIcon />}
                >
                  Adicionar Rede Social
                </Button>
              </div>

              {/* Links Rápidos */}
              <Typography variant="subtitle2" sx={{ mt: 2 }}>Links Rápidos</Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={config.footer.quickLinks.enabled}
                    onChange={(e) => onChange({
                      ...config,
                      footer: {
                        ...config.footer,
                        quickLinks: {
                          ...config.footer.quickLinks,
                          enabled: e.target.checked
                        }
                      }
                    })}
                  />
                }
                label="Ativar Links Rápidos"
              />

              {config.footer.quickLinks.enabled && (
                <>
                  <TextField
                    fullWidth
                    label="Título da Seção"
                    value={config.footer.quickLinks.title}
                    onChange={(e) => onChange({
                      ...config,
                      footer: {
                        ...config.footer,
                        quickLinks: {
                          ...config.footer.quickLinks,
                          title: e.target.value
                        }
                      }
                    })}
                  />
                  
                  {config.footer.quickLinks.items.map((item, index) => (
                    <div key={index} className={styles.linkItem}>
                      <TextField
                        label="Texto do Link"
                        value={item.label}
                        onChange={(e) => handleQuickLinkChange(index, 'label', e.target.value)}
                      />
                      <TextField
                        label="URL"
                        value={item.link}
                        onChange={(e) => handleQuickLinkChange(index, 'link', e.target.value)}
                      />
                      <IconButton onClick={() => removeQuickLink(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={addQuickLink}
                    startIcon={<AddIcon />}
                    sx={{ mt: 1 }}
                  >
                    Adicionar Link
                  </Button>
                </>
              )}

              <Typography variant="subtitle2">Espaçamento e Layout</Typography>
              <TextField
                type="number"
                label="Colunas do Grid"
                value={config.footer.styles.gridColumns}
                onChange={(e) => handleStyleChange('footer', 'gridColumns', Number(e.target.value))}
                inputProps={{ min: 1, max: 6 }}
              />
              <TextField
                label="Padding"
                value={config.footer.styles.padding}
                onChange={(e) => handleStyleChange('footer', 'padding', e.target.value)}
              />
              <ColorPickerField
                label="Cor dos Ícones Sociais"
                value={config.footer.styles.socialIconColor || ''}
                onChange={(color) => handleStyleChange('footer', 'socialIconColor', color)}
              />
              <ColorPickerField
                label="Cor dos Ícones ao Passar Mouse"
                value={config.footer.styles.socialIconHoverColor || ''}
                onChange={(color) => handleStyleChange('footer', 'socialIconHoverColor', color)}
              />

              <Typography variant="subtitle2">Newsletter</Typography>
              <FormControlLabel
                control={
                  <Switch 
                    checked={config.footer.newsletter.enabled}
                    onChange={(e) => handleNewsletterChange('enabled', e.target.checked)}
                  />
                }
                label="Ativar Newsletter"
              />
              {config.footer.newsletter.enabled && (
                <>
                  <TextField
                    fullWidth
                    label="Título da Newsletter"
                    value={config.footer.newsletter.title}
                    onChange={(e) => handleNewsletterChange('title', e.target.value)}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Subtítulo da Newsletter"
                    value={config.footer.newsletter.subtitle}
                    onChange={(e) => handleNewsletterChange('subtitle', e.target.value)}
                  />
                </>
              )}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}