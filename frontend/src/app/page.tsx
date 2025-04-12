import { ArrowRight, BookOpen, Search, FileText, Brain, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <span className="font-serif text-xl font-semibold">LitReviewAI</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors">
              How It Works
            </Link>
            <Link href="#benefits" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Benefits
            </Link>
          </nav>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Systematic Literature Reviews, <span className="text-emerald-600">Automated</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Our AI agent transforms literature review research by automating search queries, summarizing relevant
              sources, and documenting findings according to PRISMA guidelines.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-6 py-6">
                Start Your Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="AI Literature Review Dashboard"
                className="rounded-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Powerful Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI agent combines advanced technology with academic rigor to streamline your literature review
              process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Intelligent Search</h3>
              <p className="text-gray-600">
                Leverages Gemini to generate and refine search queries, ensuring comprehensive coverage of relevant
                literature.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Smart Summarization</h3>
              <p className="text-gray-600">
                Automatically extracts key findings, methodologies, and conclusions from identified sources.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">PRISMA Compliance</h3>
              <p className="text-gray-600">
                Documents the entire review process following PRISMA guidelines, ensuring methodological rigor and
                reproducibility.
              </p>
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
              Our streamlined process transforms complex literature reviews into manageable steps.
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
                    <h3 className="font-serif text-xl font-semibold mb-2">Topic Definition</h3>
                    <p className="text-gray-600">
                      Input your research question or topic. The AI agent analyzes it to understand the scope and key
                      concepts.
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
                    <h3 className="font-serif text-xl font-semibold mb-2">Search Query Generation</h3>
                    <p className="text-gray-600">
                      The AI uses Gemini to create and iteratively refine search queries, maximizing relevant results.
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
                    <h3 className="font-serif text-xl font-semibold mb-2">Source Analysis</h3>
                    <p className="text-gray-600">
                      Each source is analyzed for relevance, quality, and key findings. The AI extracts and organizes
                      critical information.
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
                    <h3 className="font-serif text-xl font-semibold mb-2">PRISMA Documentation</h3>
                    <p className="text-gray-600">
                      The entire process is documented following PRISMA guidelines, including search strategy,
                      inclusion/exclusion criteria, and results.
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
              Experience the advantages of AI-powered literature reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-serif text-xl font-semibold mb-2">Time Efficiency</h3>
                <p className="text-gray-600">Reduce weeks of research to hours with automated search and analysis.</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-serif text-xl font-semibold mb-2">Comprehensive Coverage</h3>
                <p className="text-gray-600">
                  Ensure no relevant sources are missed with intelligent query generation.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-serif text-xl font-semibold mb-2">Methodological Rigor</h3>
                <p className="text-gray-600">Maintain academic standards with PRISMA-compliant documentation.</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-serif text-xl font-semibold mb-2">Reduced Bias</h3>
                <p className="text-gray-600">
                  Minimize human selection bias with systematic, algorithm-driven source selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Literature Review Process?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join researchers worldwide who are saving time and improving the quality of their literature reviews.
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
            <div className="text-sm">© {new Date().getFullYear()} LitReviewAI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
