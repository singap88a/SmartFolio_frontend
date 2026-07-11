import DeveloperTemplate from './developer';
import CreativeTemplate from './creative';
import EntrepreneurTemplate from './entrepreneur';
import ContractorTemplate from './contractor';

export const templates = {
  developer: DeveloperTemplate,
  creative: CreativeTemplate,
  entrepreneur: EntrepreneurTemplate,
  contractor: ContractorTemplate,
};

export type TemplateId = keyof typeof templates;
