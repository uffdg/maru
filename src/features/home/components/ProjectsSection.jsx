import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cases } from '../../content/cases';
import { strategyProjects } from '../data/homeProjects';

const featuredCases = cases.filter((item) => item.featured);

const ProjectsSection = ({ lang, translations }) => (
  <section id="projects" className="py-24 px-6 md:px-20 bg-pink-50/30">
    <div className="max-w-7xl mx-auto">
      {featuredCases.map((item, index) => (
        <Link key={item.slug} to={item.route} className="block mb-24 group cursor-pointer">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">
            {translations.projects[`case0${index + 1}`]}
          </p>
          <h2 className="text-6xl font-black mb-12 text-gray-900 group-hover:text-pink-500 transition-colors">
            {item.hero[lang].title.split('\n').map((line, lineIndex, lines) => (
              <span key={lineIndex}>
                {line}
                {lineIndex < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>

          {item.featured && item.slug && item.summary ? (
            <>
              <div className="grid md:grid-cols-3 gap-8 items-start mb-12 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 transition-all duration-300">
                {item.homeMetadata.map((meta, metaIndex) => (
                  <div
                    key={`${item.slug}-${meta.label}`}
                    className={`space-y-2 border-l-2 pl-6 ${metaIndex === 0 ? 'border-pink-500' : 'border-gray-100'}`}
                  >
                    <p className="text-[10px] font-bold uppercase text-gray-400">{meta.label}</p>
                    <p className="font-bold text-gray-900">{meta.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-8">{item.summary[lang]}</p>
            </>
          ) : null}
          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest group-hover:underline">
            {translations.projects.viewCase}
          </span>
        </Link>
      ))}

      <div className="mt-32">
        <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">
          {translations.projects.strategyLabel}
        </p>
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-gray-900">
          {translations.projects.strategyTitle.split('\n').map((line, index, lines) => (
            <span key={index}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {strategyProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/cases/${project.slug}`}
              className="block bg-white p-10 rounded-3xl border border-pink-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                  {translations.projects.projectTypes[project.type]}
                </span>
                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <h3 className="text-3xl font-black mb-4 text-gray-900 group-hover:text-pink-500 transition-colors">
                {project.name}
              </h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                {project[lang]}
              </p>
              <span className="text-xs font-bold text-pink-500 uppercase tracking-widest group-hover:underline">
                {translations.projects.viewCase}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProjectsSection;
