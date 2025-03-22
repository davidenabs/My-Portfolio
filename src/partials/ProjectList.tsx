import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const projects = [
  {
    name: 'PlayDen - Book Sports Venues',
    description:
      'Play Den is a mobile app platform that simplifies sports pitch bookings. With four user roles—super admin, pitch owner, manager, and player—it streamlines scheduling, management, and payments. Built with Laravel, React, and Flutter, it ensures a seamless experience across web and mobile.',
    link: '/',
    img: {
      src: 'https://playdenapp.com/wp-content/uploads/2024/08/Artboard-14.png',
      alt: 'PlayDen - Book Sports Venues',
    },
    category: [
      { color: ColorTags.FUCHSIA, label: 'Laravel' },
      { color: ColorTags.LIME, label: 'React' },
      { color: ColorTags.SKY, label: 'Tailwind CSS' },
      { color: ColorTags.ROSE, label: 'TypeScript' },
      { color: ColorTags.CYAN, label: 'Flutter' },
    ],
  },
  {
    name: 'Sacred Heart – School Website & Enrollment Platform',
    description:
      'Sacred Heart is a school website that showcases the institution, its activities, and academic programs. It also enables parents and guardians to enroll their children seamlessly. Built with Laravel, Bootstrap, and CSS, it delivers a user-friendly and informative experience.',
    link: 'https://sacredheartprimaryschool.org',
    img: {
      src: 'https://sacredheartprimaryschool.org/shs/logo/sacred-heart-primary-school-kaduna.webp',
      alt: 'Sacred Heart – School Website',
    },
    category: [
      { color: ColorTags.FUCHSIA, label: 'Laravel' },
      { color: ColorTags.LIME, label: 'Bootstrap' },
      { color: ColorTags.SKY, label: 'CSS' },
    ],
  },
  {
    name: 'CheriX – Multi-User E-commerce Platform',
    description:
      'CheriX is a multi-user e-commerce platform that enables users to sell products while managing distributors and admins. It features an integrated wallet system, Paystack for secure payments, and SEO optimization for better visibility. Built with Laravel, Bootstrap, CSS, and JavaScript, it ensures a smooth shopping experience.',
    link: 'https://cherix.ng',
    img: {
      src: '/assets/images/project-maps.png',
      alt: 'CheriX – E-commerce Platform',
    },
    category: [
      { color: ColorTags.FUCHSIA, label: 'Laravel' },
      { color: ColorTags.LIME, label: 'Bootstrap' },
      { color: ColorTags.SKY, label: 'CSS' },
      { color: ColorTags.ROSE, label: 'JavaScript' },
    ],
  },
  {
    name: 'The Block Capitol – Web3 Awareness & Enrollment Platform',
    description:
      'The Capitol is a Web3 awareness and enrollment platform designed to educate users and simplify onboarding. Built with React, Tailwind CSS, and TypeScript, it delivers a sleek, responsive, and modern experience.',
    link: 'https://the-block-capitol.vercel.app',
    img: {
      src: 'https://the-block-capitol.vercel.app/main-logo.png',
      alt: 'The Block Capitol',
    },
    category: [
      { color: ColorTags.FUCHSIA, label: 'React' },
      { color: ColorTags.LIME, label: 'Tailwind CSS' },
      { color: ColorTags.SKY, label: 'TypeScript' },
    ],
  },
  {
    name: 'Clay Retails – Fintech Cooperative & Credit System',
    description:
      'Clay Retails is a fintech system designed for cooperatives, offering users limited monthly loans similar to a credit card system. It also issues physical and digital cards, enabling users to make purchases via card or QR code at partnered stores. Built with React, TypeScript, Tailwind CSS, and NestJS, it ensures seamless transactions and financial flexibility.',
    link: 'https://clayafrica.company',
    img: {
      src: 'https://clayafrica.company/wp-content/uploads/2022/05/Clay-Africa-Logo-png.png',
      alt: 'Clay Retails – Fintech System',
    },
    category: [
      { color: ColorTags.FUCHSIA, label: 'React' },
      { color: ColorTags.LIME, label: 'TypeScript' },
      { color: ColorTags.SKY, label: 'Tailwind CSS' },
      { color: ColorTags.ROSE, label: 'NestJS' },
    ],
  },
];

const ProjectList = () => (
  <Section
    title={
      <>
        Recent <GradientText>Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-6">
      {projects.map((project, index) => (
        <Project
          key={index}
          name={project.name}
          description={project.description}
          link={project.link}
          img={project.img}
          category={
            <>
              {project.category.map((tag, i) => (
                <Tags key={i} color={tag.color}>
                  {tag.label}
                </Tags>
              ))}
            </>
          }
        />
      ))}
    </div>
  </Section>
);

export { ProjectList };
