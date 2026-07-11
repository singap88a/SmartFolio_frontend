export interface TemplateData {
  name: string;
  jobTitle?: string;
  bio: string;
  heroImage?: string;
  logo?: string;
  logoType?: 'text' | 'image';
  whatsapp?: string;
  cvLink?: string;
  navbarLinks?: { label: string; url: string }[];
  skills?: { name: string; icon: string }[];
  services?: { title: string; description: string, icon?: string }[];
  projects?: { title: string; description: string; image?: string; skills?: string[]; link?: string }[];
  socialLinks?: { twitter?: string; linkedin?: string; github?: string; instagram?: string };
  contact: { email: string; phone: string; address?: string; title?: string; description?: string };
  faqs?: { question: string; answer: string }[];
  testimonials?: { name: string; role: string; content: string; avatar?: string }[];
  themeColor: string;
  navbarCtaLink?: string;
  navbarCtaText?: string;
  newsletter?: { title?: string; description?: string };
  footer?: { description?: string; copyRight?: string };
}

export interface TemplateProps {
  data: TemplateData;
}
