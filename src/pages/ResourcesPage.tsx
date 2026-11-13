import { motion } from 'framer-motion'
import { Download, ExternalLink, BookOpen, FileText, Code2, HelpCircle, Lightbulb, Database } from 'lucide-react'

const resources = [
  {
    category: 'Study Materials',
    icon: BookOpen,
    color: '#123D2C',
    items: [
      { title: 'Introduction to Algorithms (CLRS)', desc: 'The definitive algorithm reference by Cormen, Leiserson, Rivest, and Stein.', type: 'Book' },
      { title: 'Data Structures Using C – Reema Thareja', desc: 'Comprehensive guide for C-based data structure implementations.', type: 'Book' },
      { title: 'The C Programming Language – Kernighan & Ritchie', desc: 'Classic reference for mastering C programming fundamentals.', type: 'Book' },
    ],
  },
  {
    category: 'Algorithm Notes',
    icon: FileText,
    color: '#1E5C3A',
    items: [
      { title: 'Big-O Complexity Cheatsheet', desc: 'Quick reference for time and space complexities of common algorithms.', type: 'PDF' },
      { title: 'Sorting Algorithm Comparison', desc: 'Side-by-side analysis of Bubble, Insertion, Merge, and Quick Sort.', type: 'Notes' },
      { title: 'Graph Algorithm Reference', desc: "BFS, DFS, Dijkstra's, Kruskal's, Prim's — all in one place.", type: 'Notes' },
    ],
  },
  {
    category: 'C Programming',
    icon: Code2,
    color: '#2D7A5A',
    items: [
      { title: 'C Pointers & Memory Management', desc: 'Deep dive into pointers, dynamic memory, and common pitfalls.', type: 'Tutorial' },
      { title: 'Structures & Unions in C', desc: 'Understanding complex data types and their use in data structures.', type: 'Tutorial' },
      { title: 'Recursion Patterns in C', desc: 'Common recursive patterns with examples and stack trace analysis.', type: 'Tutorial' },
    ],
  },
  {
    category: 'Practice Questions',
    icon: HelpCircle,
    color: '#123D2C',
    items: [
      { title: 'Lab Viva Questions – DSA', desc: '50+ commonly asked viva questions with detailed answers.', type: 'PDF' },
      { title: 'Previous Year Question Papers', desc: 'Past examination papers for N21UIT307 lab practicals.', type: 'PDF' },
      { title: 'Programming Exercises – 100 Problems', desc: 'Graded exercises from beginner to advanced level.', type: 'Practice' },
    ],
  },
  {
    category: 'Key Concepts',
    icon: Lightbulb,
    color: '#1E5C3A',
    items: [
      { title: 'ADT vs Data Structure', desc: 'Understanding the difference between abstract types and implementations.', type: 'Concept' },
      { title: 'Time & Space Complexity', desc: 'Master Big-O, Big-Theta, and Big-Omega notation with examples.', type: 'Concept' },
      { title: 'Tree Traversal Techniques', desc: 'Inorder, Preorder, Postorder — iterative and recursive approaches.', type: 'Concept' },
    ],
  },
  {
    category: 'Online Resources',
    icon: Database,
    color: '#2D7A5A',
    items: [
      { title: 'GeeksforGeeks – DSA', desc: 'Comprehensive tutorials and implementations for all data structures.', type: 'Website', link: 'https://www.geeksforgeeks.org/data-structures/' },
      { title: 'Visualgo – Algorithm Visualizer', desc: 'Beautiful interactive visualizations for algorithms and data structures.', type: 'Website', link: 'https://visualgo.net/' },
      { title: 'CP-Algorithms', desc: 'In-depth competitive programming algorithm implementations in C++.', type: 'Website', link: 'https://cp-algorithms.com/' },
    ],
  },
]

const typeColors: Record<string, string> = {
  Book: '#B8E8D0',
  PDF: '#fde68a',
  Notes: '#c7d2fe',
  Tutorial: '#fed7aa',
  Practice: '#fca5a5',
  Concept: '#a7f3d0',
  Website: '#bfdbfe',
}

export default function ResourcesPage() {
  return (
    <div className="page-transition min-h-screen bg-bg pt-16">
      {/* Header */}
      <div className="bg-primary-green text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-mint text-sm font-medium tracking-wide uppercase block mb-2">Learning Resources</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">Resource Library</h1>
            <p className="text-white/60 mt-2">Everything you need to master Data Structures & Algorithms</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10">
          {resources.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${section.color}15` }}
                >
                  <section.icon size={18} style={{ color: section.color }} />
                </div>
                <h2 className="font-serif text-xl font-bold text-primary-green">{section.category}</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="card-hover bg-white rounded-2xl border border-border-color p-5 flex flex-col gap-3"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif font-bold text-primary-green text-sm leading-tight">{item.title}</h3>
                      <span
                        className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: typeColors[item.type] || '#e5e7eb',
                          color: '#171917',
                        }}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-text-dark/60 leading-relaxed flex-1">{item.desc}</p>
                    <div>
                      {'link' in item && item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-green hover:text-green-mid transition-colors"
                        >
                          <ExternalLink size={12} /> Visit Resource
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-green hover:text-green-mid transition-colors">
                          <Download size={12} /> Download
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

