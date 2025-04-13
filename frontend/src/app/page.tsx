import { ArrowRight, BookOpen, Search, FileText, Brain, CheckCircle, Bot, RefreshCw, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import geminiLogo from "@/gemini-logo.png"
import prismaLogo from "@/prisma.png"
import agentLogo from "@/agent.png"

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-[#4285F4]" />
            
            <Link href="/">
              <span className="font-sans text-xl font-medium tracking-tight">LitReviewAI</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-[#4285F4] transition-colors font-light">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-[#4285F4] transition-colors font-light">
              How It Works
            </Link>
            <Link href="#benefits" className="text-gray-700 hover:text-[#4285F4] transition-colors font-light">
              Benefits
            </Link>
          </nav>
          <Link href="/search">
            <Button className="bg-[#4285F4] hover:bg-[#3367D6] rounded-full text-sm px-5">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-3 px-3 py-1 bg-[#F1F5FE] rounded-full">
              <span className="text-sm text-[#4285F4] font-medium">Powered by Gemini 2.0 Flash</span>
            </div>
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Literature Reviews, <span className="text-[#4285F4]">Agentically Automated</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              Our AI agent leverages Gemini 2.0 Flash's long context window to transform academic research by rapidly processing hundreds of scholars ources, intelligently automating 
              search queries, and documenting findings with academic rigor.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/search">
                <Button className="bg-[#4285F4] hover:bg-[#3367D6] rounded-full text-lg pl-12 pr-8 py-6 shadow-lg shadow-[#4285F4]/10 transition-all hover:shadow-xl hover:shadow-[#4285F4]/20">
                  Start Your Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 blur-3xl rounded-full w-64 h-64 bg-[#EA4335]/10 -top-10 -left-10"></div>
            <div className="absolute -z-10 blur-3xl rounded-full w-64 h-64 bg-[#FBBC05]/10 -bottom-10 -right-10"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={agentLogo}
                alt="Agent logo"
                className="w-full rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gemini 2.0 Flash Integration Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8FAFF]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/3">
              <Image 
                src={geminiLogo} 
                alt="Gemini 2.0 Flash" 
                width={240} 
                height={240} 
                className="mx-auto drop-shadow-xl"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="font-sans text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Enhanced by Gemini 2.0 Flash
              </h2>
              <p className="text-lg text-gray-700 mb-8 font-light">
                LitReviewAI harnesses the advanced capabilities of Gemini 2.0 Flash to deliver exceptional literature reviews with unprecedented 
                comprehension of academic texts, nuanced understanding of research methodologies, and intelligent synthesis of complex information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#4285F4]/50 transition-colors flex items-start">
                  <Zap className="h-5 w-5 text-[#EA4335] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Advanced Text Understanding</h3>
                    <p className="text-gray-600 font-light">Comprehends complex academic language and research methodologies</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#4285F4]/50 transition-colors flex items-start">
                  <Bot className="h-5 w-5 text-[#FBBC05] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Agentic Capabilities</h3>
                    <p className="text-gray-600 font-light">Takes initiative to refine searches and find relevant sources</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#4285F4]/50 transition-colors flex items-start">
                  <RefreshCw className="h-5 w-5 text-[#34A853] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Iterative Improvement</h3>
                    <p className="text-gray-600 font-light">Continuously refines search strategies based on initial results</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#4285F4]/50 transition-colors flex items-start">
                  <Brain className="h-5 w-5 text-[#4285F4] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Context-Aware Analysis</h3>
                    <p className="text-gray-600 font-light">Maintains awareness of the broader research landscape</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block mb-2 px-3 py-1 bg-[#F1F5FE] rounded-full text-sm text-[#4285F4] font-medium">Features</span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 tracking-tight">Intelligent Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Our AI agent combines Gemini 2.0 Flash's capabilities with purpose-built functions to streamline your literature review
              process with academic precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#4285F4]/30 transition-all hover:shadow-lg group">
              <div className="bg-[#4285F4]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4285F4]/20 transition-colors">
                <Search className="h-7 w-7 text-[#4285F4]" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-3 text-gray-900">Autonomous Search</h3>
              <p className="text-gray-600 font-light">
                Gemini 2.0 Flash generates and iteratively refines search queries across databases, ensuring comprehensive 
                coverage while adapting to emerging patterns in the literature.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#EA4335]/30 transition-all hover:shadow-lg group">
              <div className="bg-[#EA4335]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#EA4335]/20 transition-colors">
                <Brain className="h-7 w-7 text-[#EA4335]" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-3 text-gray-900">Contextual Comprehension</h3>
              <p className="text-gray-600 font-light">
                Analyzes papers with deep understanding of research methodologies, extracting key findings and understanding their significance 
                within the broader research context.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#34A853]/30 transition-all hover:shadow-lg group">
              <div className="bg-[#34A853]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#34A853]/20 transition-colors">
                <FileText className="h-7 w-7 text-[#34A853]" />
              </div>
              <h3 className="font-sans text-xl font-semibold mb-3 text-gray-900">Academic Documentation</h3>
              <p className="text-gray-600 font-light">
                Documents the review process following PRISMA guidelines with meticulous precision, creating comprehensive flow diagrams 
                and detailed methodology sections that meet publication standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#F8FAFF]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block mb-2 px-3 py-1 bg-[#F1F5FE] rounded-full text-sm text-[#4285F4] font-medium">Process</span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 tracking-tight">The Agentic Process</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Experience how our Gemini-powered agent transforms complex literature reviews through intelligent automation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>

              <div className="relative z-10 mb-16">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#4285F4] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-[#4285F4]/20">
                    1
                  </div>
                  <div className="ml-8 bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="font-sans text-xl font-semibold mb-3 text-gray-900">Research Question Analysis</h3>
                    <p className="text-gray-600 font-light">
                      Input your research question or topic. Gemini 2.0 Flash analyzes it to extract key concepts, 
                      identify relevant fields, and understand the scope and context of your inquiry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-16">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#EA4335] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-[#EA4335]/20">
                    2
                  </div>
                  <div className="ml-8 bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="font-sans text-xl font-semibold mb-3 text-gray-900">Autonomous Query Development</h3>
                    <p className="text-gray-600 font-light">
                      The agent autonomously creates and iteratively refines search queries, adapting to database-specific 
                      syntaxes and expanding synonyms to maximize relevant results while minimizing noise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-16">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#FBBC05] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-[#FBBC05]/20">
                    3
                  </div>
                  <div className="ml-8 bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="font-sans text-xl font-semibold mb-3 text-gray-900">Intelligent Analysis</h3>
                    <p className="text-gray-600 font-light">
                      Each source is evaluated with Gemini's deep comprehension capabilities, extracting methodologies, 
                      findings, limitations, and significance while recognizing connections between studies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#34A853] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-[#34A853]/20">
                    4
                  </div>
                  <div className="ml-8 bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="font-sans text-xl font-semibold mb-3 text-gray-900">Synthesis & Documentation</h3>
                    <p className="text-gray-600 font-light">
                      Synthesizes findings into a cohesive narrative while documenting the entire process following PRISMA guidelines,
                      producing publication-ready methodology sections, flow diagrams, and structured summaries.
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
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block mb-2 px-3 py-1 bg-[#F1F5FE] rounded-full text-sm text-[#4285F4] font-medium">Benefits</span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 tracking-tight">Advanced Benefits</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Experience the advantages of Gemini 2.0 Flash-powered literature reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            <div className="flex items-start group">
              <div className="mt-1 flex-shrink-0 bg-[#4285F4]/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#4285F4]/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-[#4285F4]" />
              </div>
              <div className="ml-4">
                <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900">Research Acceleration</h3>
                <p className="text-gray-600 font-light">Reduce weeks of research to hours with autonomous search and comprehensive analysis capabilities.</p>
              </div>
            </div>

            <div className="flex items-start group">
              <div className="mt-1 flex-shrink-0 bg-[#EA4335]/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#EA4335]/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-[#EA4335]" />
              </div>
              <div className="ml-4">
                <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900">Exhaustive Coverage</h3>
                <p className="text-gray-600 font-light">
                  Gemini's multi-layered search strategies ensure comprehensive literature coverage across multiple databases.
                </p>
              </div>
            </div>

            <div className="flex items-start group">
              <div className="mt-1 flex-shrink-0 bg-[#FBBC05]/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#FBBC05]/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-[#FBBC05]" />
              </div>
              <div className="ml-4">
                <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900">Academic Rigor</h3>
                <p className="text-gray-600 font-light">Maintain scholarly standards with meticulous PRISMA-compliant documentation and transparent methodology.</p>
              </div>
            </div>

            <div className="flex items-start group">
              <div className="mt-1 flex-shrink-0 bg-[#34A853]/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#34A853]/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-[#34A853]" />
              </div>
              <div className="ml-4">
                <h3 className="font-sans text-xl font-semibold mb-2 text-gray-900">Contextual Understanding</h3>
                <p className="text-gray-600 font-light">
                  Gemini 2.0 Flash comprehends complex research methodologies and conceptual frameworks, producing nuanced analyses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Results Section */}
      <section className="py-20 bg-[#F8FAFF]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block mb-2 px-3 py-1 bg-[#F1F5FE] rounded-full text-sm text-[#4285F4] font-medium">Interface</span>
            <h2 className="font-sans text-3xl font-bold text-gray-900 tracking-tight">Scholarly Results Presentation</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Our intuitive interface presents literature review results with academic clarity and precision.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="bg-[#F1F5FE] p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Literature Review Results</h3>
                <div className="text-sm text-gray-500">Powered by Gemini 2.0 Flash</div>
              </div>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-[#EA4335]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FBBC05]"></div>
                <div className="w-3 h-3 rounded-full bg-[#34A853]"></div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Research Question</h4>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-800">
                  What are the effects of mindfulness meditation on stress reduction in college students?
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Search Strategy</h4>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-800">
                  <p className="text-sm font-medium mb-2">Final Query:</p>
                  <p className="text-sm font-mono text-[#4285F4]">(mindfulness OR "mindful meditation") AND (stress OR anxiety OR "psychological distress") AND ("college students" OR "university students" OR undergraduates) AND (intervention OR program OR training OR practice)</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs uppercase tracking-wider text-gray-500">Key Findings</h4>
                  <span className="text-xs bg-[#F1F5FE] text-[#4285F4] px-3 py-1 rounded-full font-medium">23 Studies Analyzed</span>
                </div>
                
                <div className="space-y-4">
                  <div className="p-6 border border-gray-100 rounded-xl hover:border-[#4285F4]/30 transition-colors hover:shadow-lg">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-gray-900">Reduced Perceived Stress</h5>
                      <span className="text-xs bg-[#34A853]/10 text-[#34A853] px-3 py-1 rounded-full font-medium">Strong Evidence</span>
                    </div>
                    <p className="mt-3 text-gray-600 font-light">Analysis of 18 studies indicates significant reduction in perceived stress scores (PSS) following 8-week mindfulness interventions, with an average effect size of d=0.74.</p>
                  </div>
                  
                  <div className="p-6 border border-gray-100 rounded-xl hover:border-[#4285F4]/30 transition-colors hover:shadow-lg">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-gray-900">Decreased Anxiety Symptoms</h5>
                      <span className="text-xs bg-[#FBBC05]/10 text-[#FBBC05] px-3 py-1 rounded-full font-medium">Moderate Evidence</span>
                    </div>
                    <p className="mt-3 text-gray-600 font-light">12 studies reported significant reductions in anxiety symptoms, with greater effects observed in programs exceeding 6 weeks in duration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F1F5FE]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-sans text-3xl font-bold text-gray-900 mb-6 tracking-tight">
            Experience Gemini-Powered Literature Reviews
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 font-light">
            Join researchers worldwide who are leveraging advanced AI to transform their academic research process.
          </p>
          <Link href="/search">
            <Button className="bg-[#4285F4] hover:bg-[#3367D6] rounded-full text-lg px-10 py-6 shadow-lg shadow-[#4285F4]/20 transition-all hover:shadow-xl hover:shadow-[#4285F4]/30">
              Start Researching Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <BookOpen className="h-6 w-6 text-[#4285F4]" />
              <span className="font-sans text-xl text-white">LitReviewAI</span>
            </div>
            <div className="text-sm font-light">© {new Date().getFullYear()} LitReviewAI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
