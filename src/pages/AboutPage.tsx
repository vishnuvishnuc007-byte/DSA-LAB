import { motion } from 'framer-motion'
import { Target, Layers, Zap, Users, Award, BookOpen, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const features = [
  { icon: BookOpen, title: '3D Interactive Books', desc: 'Experience syllabus content through realistic 3D book visualizations with page-turning animations.' },
  { icon: Layers, title: 'Live DSA Visualizations', desc: 'Watch algorithms execute step-by-step with fully interactive data structure visualizations.' },
  { icon: Zap, title: 'Instant Code Reference', desc: 'Get complete C implementations for every data structure and algorithm, ready to run.' },
  { icon: Target, title: 'Practice Problems', desc: 'Sharpen your skills with curated practice problems for each topic, from basics to advanced.' },
  { icon: Award, title: 'Progress Tracking', desc: 'Track your learning journey, mark completed topics, and measure your mastery over time.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Work individually or in groups to explore, discuss, and solve complex computational challenges.' },
]

const objectives = [
  'Write data structure programs in C using proper programming practices.',
  'Implement various data structures as Abstract Data Types (ADTs).',
  'Solve problems systematically using linear and non-linear data structures.',
  'Apply and analyze sorting and searching algorithms.',
  'Build innovative solutions for complex computational problems.',
  'Demonstrate solutions effectively through presentations and collaborative work.',
]

const timeline = [
  { step: '01', title: 'Start with Basics', desc: 'Begin with simple C programs, recursion, structures, and pointers.' },
  { step: '02', title: 'Linear Structures', desc: 'Master Linked Lists, Stacks, and Queues with Array and Linked List implementations.' },
  { step: '03', title: 'Non-Linear Structures', desc: 'Dive into Binary Search Trees and Graph representations.' },
  { step: '04', title: 'Advanced Algorithms', desc: "Implement Dijkstra's algorithm and Minimum Spanning Tree algorithms." },
  { step: '05', title: 'Sorting & Searching', desc: 'Master Insertion Sort, Merge Sort, Quick Sort, and Binary Search.' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="page-transition min-h-screen bg-bg pt-16">
      {/* Hero */}
      <div className="bg-primary-green text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #B8E8D0 0%, transparent 60%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-mint text-sm font-medium tracking-wide uppercase block mb-4">About DSA Lab</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Where Data Structures<br />
              <span className="text-mint">Come Alive</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              DSA Lab is a premium immersive learning platform that transforms the traditional 
              Data Structures and Algorithms laboratory into an interactive digital experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* What is DSA Lab */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag block mb-4">Our Mission</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-green mb-6">
                Learning Through<br />Experience
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-text-dark/70 leading-relaxed mb-5">
                Traditional textbook learning leaves gaps when it comes to understanding how 
                data structures actually work at runtime. DSA Lab bridges that gap by providing 
                live, interactive visualizations of every operation.
              </p>
              <p className="text-text-dark/70 leading-relaxed mb-8">
                Built specifically for the <strong>N21UIT307 Data Structures Laboratory</strong> course, 
                this platform covers every experiment in the syllabus with interactive code, 
                step-by-step animations, and comprehensive C implementations.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/labs')}
                  className="inline-flex items-center gap-2 bg-primary-green text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-green-mid transition-all"
                >
                  Explore Labs <ChevronRight size={14} />
                </button>
                <button
                  onClick={() => navigate('/syllabus')}
                  className="inline-flex items-center gap-2 border border-primary-green text-primary-green text-sm font-medium px-5 py-2.5 rounded-full hover:bg-mint/20 transition-all"
                >
                  View Syllabus
                </button>
              </div>
            </motion.div>

            {/* Learning objectives */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-border-color p-8 shadow-sm"
            >
              <h3 className="font-serif text-xl font-bold text-primary-green mb-5">Learning Objectives</h3>
              <div className="space-y-3">
                {objectives.map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-mint/40 text-primary-green rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm text-text-dark/70 leading-relaxed">{obj}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-primary-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag block mb-3">Platform Features</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-green">
              Everything You Need to Excel
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover bg-white rounded-2xl border border-border-color p-6 shadow-sm"
              >
                <div className="w-11 h-11 bg-primary-green/10 rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-primary-green" />
                </div>
                <h3 className="font-serif text-lg font-bold text-primary-green mb-2">{f.title}</h3>
                <p className="text-sm text-text-dark/60 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag block mb-3">Learning Path</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-green">
              Your Journey to Mastery
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-green via-secondary-green to-mint" />
            <div className="space-y-8">
              {timeline.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="relative pl-20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="absolute left-4 top-3 w-9 h-9 bg-primary-green rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {step.step}
                  </div>
                  <div className="bg-white rounded-2xl border border-border-color p-5 shadow-sm">
                    <h3 className="font-serif font-bold text-primary-green mb-1">{step.title}</h3>
                    <p className="text-sm text-text-dark/60">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Join DSA Lab and transform the way you understand algorithms.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/labs')}
                className="inline-flex items-center gap-2 bg-white text-primary-green font-semibold px-8 py-3 rounded-full hover:bg-mint transition-colors"
              >
                Start Virtual Lab <ChevronRight size={16} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-3 rounded-full hover:border-white transition-colors"
              >
                Create Account
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

