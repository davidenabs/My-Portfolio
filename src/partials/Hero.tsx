import {
  GradientText,
  HeroAvatar,
  HeroSocial,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>David</GradientText> 👋
        </>
      }
      // description={
      //   <>
      //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus{' '}
      //     <a className="text-cyan-400 hover:underline" href="/">
      //       malesuada
      //     </a>{' '}
      //     nisi tellus, non imperdiet nisi tempor at. Lorem ipsum dolor sit amet,{' '}
      //     <a className="text-cyan-400 hover:underline" href="/">
      //       consectetur
      //     </a>{' '}
      //     adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      //   </>
      // }
      description={
        <>
          I build tech that solves real problems and enhances user experiences.
          From crafting smooth UIs in frontend frameworks to architecting
          scalable backends, I focus on purpose-driven development. Whether it's
          dynamic recommendations, custom SSO systems, or seamless payments, I
          bring creativity and functionality to every project.
        </>
      }
      avatar={
        <img
          className="h-80 w-64"
          src="/assets/images/avatar.svg"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="https://www.twitter.com/realdavidenabs">
            <HeroSocial
              src="/assets/images/twitter-icon.png"
              alt="Twitter icon"
            />
          </a>
          {/* <a href="/">
            <HeroSocial
              src="/assets/images/facebook-icon.png"
              alt="Facebook icon"
            />
          </a> */}
          <a href="https://www.linkedin.com/in/davidenabs?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
            <HeroSocial
              src="/assets/images/linkedin-icon.png"
              alt="Linkedin icon"
            />
          </a>
          {/* <a href="/">
            <HeroSocial
              src="/assets/images/youtube-icon.png"
              alt="Youtube icon"
            />
          </a> */}
        </>
      }
    />
  </Section>
);

export { Hero };
