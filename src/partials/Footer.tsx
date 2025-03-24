import { Section } from 'astro-boilerplate-components';

import { AppConfig } from '@/utils/AppConfig';

const Footer = () => {
  const date = new Date();
  return (
    <Section>
      <div>
        &copy; Copyright {date.getFullYear().toString()} by{' '}
        {AppConfig.site_name}
      </div>
      {/* <FooterCopyright site_name={AppConfig.site_name} /> */}
    </Section>
  );
};

export { Footer };
