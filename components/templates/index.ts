import DeveloperTemplate from './developer';
import CreativeTemplate from './creative';

export const templates = {
  developer: DeveloperTemplate,
  creative: CreativeTemplate,
};

export type TemplateId = keyof typeof templates;
