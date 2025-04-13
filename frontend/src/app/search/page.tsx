"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  BookOpen,
  FileText,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  Zap,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    title: "Systematic Review of Machine Learning Applications in Educational Research",
    authors: "Johnson, A., Smith, B., & Williams, C.",
    journal: "Journal of Educational Technology",
    year: 2022,
    abstract:
      "This systematic review examines the applications of machine learning in educational research over the past decade. The findings indicate a significant increase in the use of predictive modeling for student performance and engagement analysis.",
    relevanceScore: 92,
    keyFindings: [
      "Machine learning models achieved 87% accuracy in predicting student performance",
      "Natural language processing techniques were most commonly applied to analyze student feedback",
      "Supervised learning approaches dominated the methodological landscape (78% of studies)",
    ],
    methodology: "Quantitative analysis of 156 peer-reviewed studies published between 2012-2022",
    prismaElements: ["Identification", "Screening", "Eligibility", "Included"],
  },
  {
    id: 2,
    title: "Artificial Intelligence in Higher Education: A Review of Current Applications and Future Directions",
    authors: "Garcia, D., Chen, H., & Patel, S.",
    journal: "International Journal of Educational Technology in Higher Education",
    year: 2023,
    abstract:
      "This review explores the current landscape of artificial intelligence applications in higher education settings. The paper identifies key trends, challenges, and opportunities for AI integration in teaching, learning, and administrative processes.",
    relevanceScore: 88,
    keyFindings: [
      "Chatbots and virtual assistants are the most widely implemented AI tools in higher education",
      "Ethical considerations and data privacy remain significant barriers to adoption",
      "Personalized learning pathways show the most promising educational outcomes",
    ],
    methodology: "Thematic analysis of 87 case studies from institutions across 23 countries",
    prismaElements: ["Identification", "Screening", "Eligibility"],
  },
  {
    id: 3,
    title: "The Impact of AI-Powered Literature Review Tools on Academic Research Productivity",
    authors: "Lee, J., Thompson, R., & Nguyen, T.",
    journal: "Digital Scholarship in the Humanities",
    year: 2023,
    abstract:
      "This study investigates how AI-powered literature review tools affect research productivity and quality in academic settings. Through a mixed-methods approach, the researchers document significant time savings and increased comprehensiveness when using AI assistants for literature reviews.",
    relevanceScore: 95,
    keyFindings: [
      "Researchers using AI tools completed literature reviews 68% faster than control groups",
      "AI-assisted reviews identified 23% more relevant sources on average",
      "Junior researchers benefited more significantly than senior researchers",
    ],
    methodology: "Mixed-methods study with 42 researchers across multiple disciplines",
    prismaElements: ["Identification", "Screening", "Eligibility", "Included"],
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedResult, setExpandedResult] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const toggleExpand = (id: number) => {
    setExpandedResult(expandedResult === id ? null : id)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would trigger the search
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-[#4285F4]" />
            <Link href="/">
              <span className="font-sans text-xl font-medium tracking-tight">LitReviewAI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-[#4285F4] hover:bg-[#F1F5FE]">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-[#4285F4] hover:bg-[#F1F5FE]">
              My Reviews
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-[#4285F4] hover:bg-[#F1F5FE]">
              Settings
            </Button>
            <div className="w-8 h-8 rounded-full bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4] font-medium">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="inline-block mb-3 px-3 py-1 bg-[#F1F5FE] rounded-full">
            <span className="text-sm text-[#4285F4] font-medium">Powered by Gemini 2.5 Pro</span>
          </div>
          <h1 className="font-sans text-3xl font-bold text-gray-900 mb-6 tracking-tight">Literature Search</h1>
          <form onSubmit={handleSearch} className="max-w-4xl">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter your research topic or question..."
                  className="pl-10 py-6 text-lg border-gray-200 rounded-xl focus:ring-[#4285F4] focus:border-[#4285F4]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-[#4285F4] hover:bg-[#3367D6] rounded-xl px-6 py-6 text-lg shadow-md shadow-[#4285F4]/20">
                Search
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-[#F1F5FE] text-[#4285F4] border-none px-3 py-1 text-sm rounded-full">
                PRISMA Guidelines
              </Badge>
              <Badge variant="outline" className="bg-[#F1F5FE] text-[#4285F4] border-none px-3 py-1 text-sm rounded-full">
                Educational Technology
              </Badge>
              <Badge variant="outline" className="bg-[#F1F5FE] text-[#4285F4] border-none px-3 py-1 text-sm rounded-full">
                Last 5 Years
              </Badge>
              <Badge variant="outline" className="bg-[#F1F5FE] text-[#4285F4] border-none px-3 py-1 text-sm rounded-full">
                Peer-Reviewed Only
              </Badge>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm sticky top-24">
                <h2 className="font-sans text-xl font-semibold mb-6 flex items-center text-gray-900">
                  <Filter className="h-5 w-5 mr-2 text-[#4285F4]" />
                  Refine Results
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Publication Year</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Select defaultValue="2018">
                        <SelectTrigger className="w-full rounded-lg border-gray-200">
                          <SelectValue placeholder="From" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2018">2018</SelectItem>
                          <SelectItem value="2019">2019</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="2023">
                        <SelectTrigger className="w-full rounded-lg border-gray-200">
                          <SelectValue placeholder="To" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2018">2018</SelectItem>
                          <SelectItem value="2019">2019</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Source Type</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input type="checkbox" id="journal" className="rounded text-[#4285F4] mr-2" defaultChecked />
                        <label htmlFor="journal" className="text-sm text-gray-600 font-light">
                          Journal Articles
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="conference"
                          className="rounded text-[#4285F4] mr-2"
                          defaultChecked
                        />
                        <label htmlFor="conference" className="text-sm text-gray-600 font-light">
                          Conference Papers
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="book" className="rounded text-[#4285F4] mr-2" />
                        <label htmlFor="book" className="text-sm text-gray-600 font-light">
                          Books & Chapters
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="preprint" className="rounded text-[#4285F4] mr-2" />
                        <label htmlFor="preprint" className="text-sm text-gray-600 font-light">
                          Preprints
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">PRISMA Elements</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="identification"
                          className="rounded text-[#4285F4] mr-2"
                          defaultChecked
                        />
                        <label htmlFor="identification" className="text-sm text-gray-600 font-light">
                          Identification
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="screening"
                          className="rounded text-[#4285F4] mr-2"
                          defaultChecked
                        />
                        <label htmlFor="screening" className="text-sm text-gray-600 font-light">
                          Screening
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="eligibility"
                          className="rounded text-[#4285F4] mr-2"
                          defaultChecked
                        />
                        <label htmlFor="eligibility" className="text-sm text-gray-600 font-light">
                          Eligibility
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="included" className="rounded text-[#4285F4] mr-2" defaultChecked />
                        <label htmlFor="included" className="text-sm text-gray-600 font-light">
                          Included
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Relevance Score</h3>
                    <div className="px-2">
                      <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-[#4285F4]" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-[#4285F4] hover:bg-[#3367D6] rounded-lg shadow-sm">Apply Filters</Button>
                </div>
              </div>
            </div>

            {/* Results Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-sans text-xl font-semibold text-gray-900">Search Results</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 font-light">Sort by:</span>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-[180px] rounded-lg border-gray-200">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="date-desc">Newest First</SelectItem>
                        <SelectItem value="date-asc">Oldest First</SelectItem>
                        <SelectItem value="citations">Most Cited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="bg-[#F8FAFF] border border-gray-100 rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Search Query</h3>
                    <p className="text-gray-600 text-sm font-mono bg-white p-3 rounded-lg border border-gray-100">
                      (("artificial intelligence" OR "machine learning" OR "AI") AND ("education" OR "learning" OR
                      "teaching") AND ("literature review" OR "systematic review"))
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1 text-[#FBBC05]" />
                      <span className="font-light">Query generated in 3.2 seconds</span>
                      <span className="mx-2">•</span>
                      <span className="font-light">42 results found</span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-6 bg-[#F1F5FE]">
                    <TabsTrigger 
                      value="all" 
                      className="text-sm data-[state=active]:bg-[#4285F4] data-[state=active]:text-white"
                    >
                      All Results (42)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="high" 
                      className="text-sm data-[state=active]:bg-[#4285F4] data-[state=active]:text-white"
                    >
                      High Relevance (18)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="medium"
                      className="text-sm data-[state=active]:bg-[#4285F4] data-[state=active]:text-white"
                    >
                      Medium Relevance (14)
                    </TabsTrigger>
                    <TabsTrigger 
                      value="low"
                      className="text-sm data-[state=active]:bg-[#4285F4] data-[state=active]:text-white"
                    >
                      Low Relevance (10)
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    {mockResults.map((result) => (
                      <Card key={result.id} className="border-gray-100 overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="font-sans text-lg font-semibold text-gray-900 hover:text-[#4285F4] transition-colors">
                                {result.title}
                              </CardTitle>
                              <p className="text-sm text-gray-500 mt-1 font-light">
                                {result.authors} • {result.journal} • {result.year}
                              </p>
                            </div>
                            <Badge className={`
                              ${result.relevanceScore > 90 
                                ? 'bg-[#34A853]/10 text-[#34A853]' 
                                : result.relevanceScore > 80 
                                  ? 'bg-[#FBBC05]/10 text-[#FBBC05]' 
                                  : 'bg-[#EA4335]/10 text-[#EA4335]'
                              } border-none ml-2 rounded-full px-3`}
                            >
                              {result.relevanceScore}% Relevant
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-2">
                          <p className="text-gray-700 text-sm font-light">{result.abstract}</p>

                          <Collapsible
                            open={expandedResult === result.id}
                            onOpenChange={() => toggleExpand(result.id)}
                            className="mt-4"
                          >
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#4285F4] hover:text-[#3367D6] hover:bg-[#F1F5FE] p-0 h-auto"
                              >
                                <span>{expandedResult === result.id ? "Show Less" : "Show More"}</span>
                                {expandedResult === result.id ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                )}
                              </Button>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="mt-6 space-y-5">
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Key Findings</h4>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2 font-light">
                                  {result.keyFindings.map((finding, index) => (
                                    <li key={index}>{finding}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Methodology</h4>
                                <p className="text-sm text-gray-600 font-light">{result.methodology}</p>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">PRISMA Elements</h4>
                                <div className="flex flex-wrap gap-2">
                                  {result.prismaElements.map((element, index) => (
                                    <Badge 
                                      key={index} 
                                      variant="outline" 
                                      className="bg-[#F1F5FE] text-[#4285F4] border-none rounded-full"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      {element}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </CardContent>

                        <CardFooter className="border-t border-gray-100 bg-[#F8FAFF] flex justify-between py-4">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs h-8 rounded-full border-[#4285F4]/30 text-[#4285F4] hover:bg-[#4285F4]/10"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Add to Review
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs h-8 rounded-full border-[#4285F4]/30 text-[#4285F4] hover:bg-[#4285F4]/10"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download PDF
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-8 rounded-full text-gray-600 hover:text-[#4285F4] hover:bg-[#4285F4]/5"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Source
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                    <div className="flex justify-center mt-8">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" disabled className="rounded-full border-gray-200">
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-[#4285F4] text-white border-[#4285F4] rounded-full w-8 h-8 p-0"
                        >
                          1
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full border-gray-200 w-8 h-8 p-0">
                          2
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full border-gray-200 w-8 h-8 p-0">
                          3
                        </Button>
                        <span className="text-gray-500">...</span>
                        <Button variant="outline" size="sm" className="rounded-full border-gray-200 w-8 h-8 p-0">
                          8
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full border-gray-200">
                          Next
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="high">
                    <div className="py-12 text-center text-gray-500 font-light">
                      Switch to the "All Results" tab to see the demonstration data.
                    </div>
                  </TabsContent>

                  <TabsContent value="medium">
                    <div className="py-12 text-center text-gray-500 font-light">
                      Switch to the "All Results" tab to see the demonstration data.
                    </div>
                  </TabsContent>

                  <TabsContent value="low">
                    <div className="py-12 text-center text-gray-500 font-light">
                      Switch to the "All Results" tab to see the demonstration data.
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center mb-6">
                  <h2 className="font-sans text-xl font-semibold text-gray-900">PRISMA Flow Diagram</h2>
                  <Badge className="ml-2 bg-[#F1F5FE] text-[#4285F4] border-none rounded-full">
                    <Zap className="h-3 w-3 mr-1" />
                    Gemini-Powered
                  </Badge>
                </div>
                <div className="bg-[#F8FAFF] border border-gray-100 rounded-xl p-4 flex justify-center">
                  <div className="max-w-md w-full">
                    <div className="bg-white p-5 border border-gray-100 rounded-xl shadow-sm">
                      <div className="space-y-4">
                        <div className="border border-[#4285F4]/20 rounded-lg p-3 text-center">
                          <p className="text-sm font-medium text-gray-900">Identification</p>
                          <p className="text-xs text-gray-500 mt-1 font-light">
                            Records identified through database searching (n=156)
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="rotate-90 text-[#4285F4]" />
                        </div>
                        <div className="border border-[#FBBC05]/20 rounded-lg p-3 text-center">
                          <p className="text-sm font-medium text-gray-900">Screening</p>
                          <p className="text-xs text-gray-500 mt-1 font-light">Records after duplicates removed (n=142)</p>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="rotate-90 text-[#4285F4]" />
                        </div>
                        <div className="border border-[#EA4335]/20 rounded-lg p-3 text-center">
                          <p className="text-sm font-medium text-gray-900">Eligibility</p>
                          <p className="text-xs text-gray-500 mt-1 font-light">
                            Full-text articles assessed for eligibility (n=68)
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="rotate-90 text-[#4285F4]" />
                        </div>
                        <div className="border border-[#34A853]/30 bg-[#34A853]/5 rounded-lg p-3 text-center">
                          <p className="text-sm font-medium text-gray-900">Included</p>
                          <p className="text-xs text-[#34A853] mt-1">
                            Studies included in qualitative synthesis (n=42)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs rounded-full border-[#4285F4]/30 text-[#4285F4] hover:bg-[#4285F4]/10"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download PRISMA Diagram
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
