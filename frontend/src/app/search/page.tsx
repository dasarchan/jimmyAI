"use client"

import type React from "react"

import { useState } from "react"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <span className="font-serif text-xl font-semibold">LitReviewAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-gray-600">
              My Reviews
            </Button>
            <Button variant="ghost" className="text-gray-600">
              Settings
            </Button>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-6">Literature Search</h1>
          <form onSubmit={handleSearch} className="max-w-4xl">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter your research topic or question..."
                  className="pl-10 py-6 text-lg border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-6 text-lg">
                Search
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-1 text-sm">
                PRISMA Guidelines
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-1 text-sm">
                Educational Technology
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-1 text-sm">
                Last 5 Years
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 px-3 py-1 text-sm">
                Peer-Reviewed Only
              </Badge>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <h2 className="font-serif text-xl font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-emerald-600" />
                  Refine Results
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Publication Year</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Select defaultValue="2018">
                        <SelectTrigger className="w-full">
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
                        <SelectTrigger className="w-full">
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
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Source Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="journal" className="rounded text-emerald-600 mr-2" defaultChecked />
                        <label htmlFor="journal" className="text-sm text-gray-600">
                          Journal Articles
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="conference"
                          className="rounded text-emerald-600 mr-2"
                          defaultChecked
                        />
                        <label htmlFor="conference" className="text-sm text-gray-600">
                          Conference Papers
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="book" className="rounded text-emerald-600 mr-2" />
                        <label htmlFor="book" className="text-sm text-gray-600">
                          Books & Chapters
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="preprint" className="rounded text-emerald-600 mr-2" />
                        <label htmlFor="preprint" className="text-sm text-gray-600">
                          Preprints
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">PRISMA Elements</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="identification"
                          className="rounded text-emerald-600 mr-2"
                          defaultChecked
                        />
                        <label htmlFor="identification" className="text-sm text-gray-600">
                          Identification
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="screening"
                          className="rounded text-emerald-600 mr-2"
                          defaultChecked
                        />
                        <label htmlFor="screening" className="text-sm text-gray-600">
                          Screening
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="eligibility"
                          className="rounded text-emerald-600 mr-2"
                          defaultChecked
                        />
                        <label htmlFor="eligibility" className="text-sm text-gray-600">
                          Eligibility
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="included" className="rounded text-emerald-600 mr-2" defaultChecked />
                        <label htmlFor="included" className="text-sm text-gray-600">
                          Included
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Relevance Score</h3>
                    <div className="px-2">
                      <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-emerald-600" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Apply Filters</Button>
                </div>
              </div>
            </div>

            {/* Results Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-xl font-semibold">Search Results</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-[180px]">
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

                <div className="mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Search Query</h3>
                    <p className="text-gray-600 text-sm font-mono bg-white p-2 rounded border border-gray-200">
                      (("artificial intelligence" OR "machine learning" OR "AI") AND ("education" OR "learning" OR
                      "teaching") AND ("literature review" OR "systematic review"))
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Query generated in 3.2 seconds</span>
                      <span className="mx-2">•</span>
                      <span>42 results found</span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all" className="text-sm">
                      All Results (42)
                    </TabsTrigger>
                    <TabsTrigger value="high" className="text-sm">
                      High Relevance (18)
                    </TabsTrigger>
                    <TabsTrigger value="medium" className="text-sm">
                      Medium Relevance (14)
                    </TabsTrigger>
                    <TabsTrigger value="low" className="text-sm">
                      Low Relevance (10)
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    {mockResults.map((result) => (
                      <Card key={result.id} className="border-gray-200 overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="font-serif text-lg font-semibold text-gray-900 hover:text-emerald-700 transition-colors">
                                {result.title}
                              </CardTitle>
                              <p className="text-sm text-gray-600 mt-1">
                                {result.authors} • {result.journal} • {result.year}
                              </p>
                            </div>
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 ml-2">
                              {result.relevanceScore}% Relevant
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-2">
                          <p className="text-gray-700 text-sm">{result.abstract}</p>

                          <Collapsible
                            open={expandedResult === result.id}
                            onOpenChange={() => toggleExpand(result.id)}
                            className="mt-4"
                          >
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-0 h-auto"
                              >
                                <span>{expandedResult === result.id ? "Show Less" : "Show More"}</span>
                                {expandedResult === result.id ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                )}
                              </Button>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="mt-4 space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Findings</h4>
                                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                  {result.keyFindings.map((finding, index) => (
                                    <li key={index}>{finding}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Methodology</h4>
                                <p className="text-sm text-gray-600">{result.methodology}</p>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">PRISMA Elements</h4>
                                <div className="flex flex-wrap gap-2">
                                  {result.prismaElements.map((element, index) => (
                                    <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700">
                                      <CheckCircle className="h-3 w-3 mr-1 text-emerald-600" />
                                      {element}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </CardContent>

                        <CardFooter className="border-t bg-gray-50 flex justify-between py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-xs h-8">
                              <FileText className="h-3 w-3 mr-1" />
                              Add to Review
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs h-8">
                              <Download className="h-3 w-3 mr-1" />
                              Download PDF
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-xs h-8">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Source
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                    <div className="flex justify-center mt-8">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" disabled>
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200"
                        >
                          1
                        </Button>
                        <Button variant="outline" size="sm">
                          2
                        </Button>
                        <Button variant="outline" size="sm">
                          3
                        </Button>
                        <span className="text-gray-500">...</span>
                        <Button variant="outline" size="sm">
                          8
                        </Button>
                        <Button variant="outline" size="sm">
                          Next
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="high">
                    <div className="py-12 text-center text-gray-500">
                      Switch to the "All Results" tab to see the demonstration data.
                    </div>
                  </TabsContent>

                  <TabsContent value="medium">
                    <div className="py-12 text-center text-gray-500">
                      Switch to the "All Results" tab to see the demonstration data.
                    </div>
                  </TabsContent>

                  <TabsContent value="low">
                    <div className="py-12 text-center text-gray-500">
                      Switch to the "All Results" tab to see the demonstration data.
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="font-serif text-xl font-semibold mb-4">PRISMA Flow Diagram</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-center">
                  <div className="max-w-md w-full">
                    <div className="bg-white p-4 border border-gray-200 rounded-lg">
                      <div className="space-y-4">
                        <div className="border border-gray-300 rounded p-3 text-center">
                          <p className="text-sm font-medium">Identification</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Records identified through database searching (n=156)
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="rotate-90 text-gray-400" />
                        </div>
                        <div className="border border-gray-300 rounded p-3 text-center">
                          <p className="text-sm font-medium">Screening</p>
                          <p className="text-xs text-gray-500 mt-1">Records after duplicates removed (n=142)</p>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="rotate-90 text-gray-400" />
                        </div>
                        <div className="border border-gray-300 rounded p-3 text-center">
                          <p className="text-sm font-medium">Eligibility</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Full-text articles assessed for eligibility (n=68)
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight className="rotate-90 text-gray-400" />
                        </div>
                        <div className="border border-emerald-200 bg-emerald-50 rounded p-3 text-center">
                          <p className="text-sm font-medium text-emerald-700">Included</p>
                          <p className="text-xs text-emerald-600 mt-1">
                            Studies included in qualitative synthesis (n=42)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm" className="text-xs">
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
