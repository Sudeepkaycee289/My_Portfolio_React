import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations';
import AnimatedText from '../shared/AnimatedText';
import ProjectCard from './ProjectCard';
import { works } from '../../data/works';

export default function Portfolio() {
  // Only show first 3 projects on home page
  const featuredWorks = works.slice(0, 3);

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-800">
      <motion.div 
        className="container mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center mb-12"
          variants={fadeIn('up')}
        >
          <AnimatedText 
            text="Featured Projects"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work in design and development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWorks.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          variants={fadeIn('up')}
        >
          <Link
            to="/works"
            className="inline-block px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300"
          >
            View All Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}