import { ArrowRight, BookOpen, Search, FileText, Brain, CheckCircle, Lightbulb, Database, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import prismaLogo from "@/prisma.png"
import geminiLogo from "@/gemini.png"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            
            <Link href="/">
              <span className="font-serif text-xl font-semibold">LitReviewAI</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Features
            </Link>
            <Link href="#gemini" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Gemini 2.5 Pro
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors">
              How It Works
            </Link>
            <Link href="#benefits" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Benefits
            </Link>
          </nav>
          <Link href="/search">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                LitReviewAI
              </h1>
              <div className="ml-4 px-3 py-1 bg-emerald-100 rounded text-emerald-800 text-sm font-medium">
                Powered by Gemini 2.5 Pro
              </div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Systematic Literature Reviews, <span className="text-emerald-600">Revolutionized</span>
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Our intelligent agent harnesses the power of Gemini 2.5 Pro to transform literature reviews—automating search queries, 
              analyzing full-text papers, synthesizing research findings, and documenting results with PRISMA compliance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/search">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-6 py-6">
                  Start Your Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-6 py-6"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-100 rounded-full opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full opacity-70"></div>
            <div className="relative bg-white rounded-lg shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src={geminiLogo}
                  alt="Gemini Logo"
                  width={180}
                  height={40}
                  className="h-10 object-contain"
                />
              </div>
              <div className="bg-gray-50 rounded-md p-5 border border-gray-200">
                <div className="font-mono text-sm text-gray-800 mb-3">
                  <span className="text-emerald-600 font-semibold">Input:</span> Conduct a literature review on the effects of intermittent fasting on metabolic health in adults with type 2 diabetes
                </div>
                <div className="h-0.5 w-full bg-gray-200 my-3"></div>
                <div className="font-mono text-sm text-gray-800">
                  <span className="text-emerald-600 font-semibold">Output:</span> Analyzing 127 studies... Synthesizing evidence... PRISMA documentation complete. Key finding: Intermittent fasting shows significant improvements in HbA1c levels (mean reduction: 0.78%) and insulin sensitivity across 8 RCTs...
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <div>Processing time: 3.4s</div>
                <div>Studies analyzed: 127</div>
                <div>Context size: 1M tokens</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gemini 2.5 Pro Section */}
      <section id="gemini" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-emerald-50 px-4 py-2 rounded-full mb-4">
              <Image
                src={geminiLogo}
                alt="Gemini Logo"
                width={90}
                height={20}
                className="h-5 object-contain mr-2"
              />
              <span className="text-emerald-700 font-medium">Next-Generation AI</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Powered by Gemini 2.5 Pro</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the cutting-edge capabilities of Google's most advanced AI model, perfectly optimized for academic research.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Million-Token Context</h3>
              <p className="text-gray-600">
                Analyzes hundreds of full-text research papers at once, understanding nuanced connections between studies and synthesizing findings at unprecedented scale.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Multimodal Understanding</h3>
              <p className="text-gray-600">
                Comprehends complex research tables, figures, graphs, and equations, extracting critical data that traditional literature reviews might miss.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Academic Reasoning</h3>
              <p className="text-gray-600">
                Evaluates research quality, identifies methodological limitations, and synthesizes contradictory findings with sophisticated reasoning capabilities.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 p-8 bg-emerald-50 flex items-center">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                  <p className="text-gray-700 mb-6">
                    Gemini 2.5 Pro significantly outperforms traditional literature review methods and previous AI models across key metrics.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Updated: June 2023</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Comprehensive Source Coverage</span>
                      <span className="text-emerald-600 font-medium">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">vs. 76% for traditional manual reviews</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">PRISMA Guideline Adherence</span>
                      <span className="text-emerald-600 font-medium">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">vs. 82% average compliance in published reviews</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Time Efficiency</span>
                      <span className="text-emerald-600 font-medium">98x</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">98x faster than manual methods, 15x faster than previous AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Literature Review Capabilities</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI agent combines Gemini 2.5 Pro's intelligence with specialized academic workflows to deliver comprehensive, rigorous literature reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Intelligent Search</h3>
              <p className="text-gray-600 mb-4">
                Gemini 2.5 Pro generates sophisticated search queries across multiple databases, identifying all relevant literature with unparalleled precision.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Multi-database search optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Semantic understanding of research questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Automatic query refinement based on initial results</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Deep Content Analysis</h3>
              <p className="text-gray-600 mb-4">
                Analyzes full-text papers, comprehending complex research methodologies, statistical analyses, and visual data representations.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Full-text extraction and comprehension</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Analysis of tables, figures, and statistical data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Quality assessment using established frameworks</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">PRISMA Documentation</h3>
              <p className="text-gray-600 mb-4">
                Automatically generates comprehensive PRISMA-compliant documentation, ensuring methodological rigor and transparency.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Complete PRISMA flow diagrams</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Detailed inclusion/exclusion criteria tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Bias assessment documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our Gemini-powered workflow transforms complex literature reviews into a streamlined, rigorous process.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-emerald-200"></div>

              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div className="ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-serif text-xl font-semibold mb-2">Research Question Definition</h3>
                    <p className="text-gray-600">
                      Enter your research question, objectives, and parameters. Gemini 2.5 Pro analyzes your input to understand the full scope, context, and requirements of your review.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div className="ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-serif text-xl font-semibold mb-2">Comprehensive Literature Search</h3>
                    <p className="text-gray-600">
                      Gemini 2.5 Pro generates optimal search strategies for multiple databases, retrieving and processing hundreds of papers in minutes, while documenting every step for PRISMA compliance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div className="ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-serif text-xl font-semibold mb-2">Deep Content Analysis</h3>
                    <p className="text-gray-600">
                      Using its million-token context window, Gemini 2.5 Pro analyzes full-text papers simultaneously, extracting methodologies, findings, limitations, and visualizations with unmatched comprehension.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div className="ml-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-serif text-xl font-semibold mb-2">Synthesis & Documentation</h3>
                    <p className="text-gray-600">
                      Gemini 2.5 Pro synthesizes findings across all papers, identifies patterns and contradictions, generates evidence tables, and produces a complete PRISMA-compliant literature review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Benefits</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the transformative advantages of Gemini-powered literature reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-serif text-xl font-semibold mb-2">Unprecedented Time Efficiency</h3>
                <p className="text-gray-600">Complete comprehensive literature reviews in hours rather than weeks or months with Gemini 2.5 Pro's parallel processing capabilities.</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-serif text-xl font-semibold mb-2">Exhaustive Coverage</h3>
                <p className="text-gray-600">
                  Gemini 2.5 Pro's advanced search capabilities ensure virtually complete coverage of relevant literature, minimizing the risk of overlooking critical studies.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-serif text-xl font-semibold mb-2">Academic Rigor & Transparency</h3>
                <p className="text-gray-600">Every step is documented following PRISMA guidelines, ensuring methodological rigor and reproducibility that meets or exceeds academic standards.</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-serif text-xl font-semibold mb-2">Advanced Insight Generation</h3>
                <p className="text-gray-600">
                  Gemini 2.5 Pro identifies subtle patterns and relationships across large bodies of literature that might be missed in traditional reviews, yielding deeper insights.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gray-50 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-semibold text-gray-900">Publishing-Ready Output</h3>
              <p className="mt-2 text-gray-600">Receive comprehensive, publication-quality literature reviews</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-5 w-5 text-emerald-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">PRISMA Diagrams</h4>
                <p className="text-sm text-gray-600">Complete with all required elements and documentation</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-5 w-5 text-emerald-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Evidence Tables</h4>
                <p className="text-sm text-gray-600">Structured summaries of all included studies</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-5 w-5 text-emerald-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Synthesized Findings</h4>
                <p className="text-sm text-gray-600">Comprehensive analysis with research gaps identified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full mb-6">
            <Image
              src={geminiLogo}
              alt="Gemini Logo"
              width={90}
              height={20}
              className="h-5 object-contain mr-2"
            />
            <span className="text-emerald-700 font-medium">Experience the difference</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Literature Review Process?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join researchers worldwide who are using Gemini 2.5 Pro to produce higher-quality, more comprehensive literature reviews in a fraction of the time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6">
                Start Your Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6"
            >
              View Sample Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <BookOpen className="h-6 w-6 text-emerald-400" />
              <span className="font-serif text-xl font-semibold text-white">LitReviewAI</span>
            </div>
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-gray-400 mr-2">Powered by</span>
              <Image
                src={geminiLogo}
                alt="Gemini 2.5 Pro"
                width={90}
                height={20}
                className="h-5 object-contain"
              />
            </div>
            <div className="text-sm">© {new Date().getFullYear()} LitReviewAI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}