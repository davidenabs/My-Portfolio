import { Section } from 'astro-boilerplate-components';

const Sponsors = () => (
  <Section title="Experts">
    <table className="mx-auto border-collapse">
      <tbody>
        <tr className="h-56">
          <td className="border-2 border-gray-300 p-3">
            <a href="https://laravel.com/" target="_blank">
              <img
                src={
                  'https://picperf.io/https://laravelnews.s3.amazonaws.com/images/laravel-featured.png'
                }
                alt="Laravel"
                width={260}
                height={224}
              />
            </a>
          </td>
          <td className="border-2 border-gray-300 p-3">
            <a href="https://nestjs.com/" target="_blank">
              <img
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/NestJS-logo-wordmark.svg/250px-NestJS-logo-wordmark.svg.png'
                }
                alt="Nest Js"
                width={260}
                height={224}
              />
            </a>
          </td>
          <td className="border-2 border-gray-300 p-3">
            <a href="https://react.dev/">
              <img
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/220px-React_Logo_SVG.svg.png'
                }
                alt="React js"
                width={260}
                height={224}
              />
            </a>
          </td>
        </tr>
        <tr className="h-56">
          <td className="border-2 border-gray-300 p-3">
            <a href="https://flutter.dev/" target="_blank">
              <img
                src={
                  'https://storage.googleapis.com/cms-storage-bucket/ec64036b4eacc9f3fd73.svg'
                }
                alt="Flutter"
                width={260}
                height={224}
              />
            </a>
          </td>
          <td className="border-2 border-gray-300 p-3">
            <a href="https://www.typescriptlang.org/" target="_blank">
              <img
                src={
                  'https://blog.theodo.com/_astro/ts_logo.BstCNrTU_1Dbxpr.webp'
                }
                alt="Typescript"
                width={260}
                height={224}
              />
            </a>
          </td>
          <td className="border-2 border-gray-300 p-3">
            <a href="https://tailwindcss.com" target="_blank">
              <img
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCTzqF8WN3P3IhRhQu19vkgKiMEXC7qcD93A&s'
                }
                alt="Tailwind CSS"
                width={260}
                height={224}
              />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </Section>
);

export { Sponsors };
// Tailwind, typscript,
