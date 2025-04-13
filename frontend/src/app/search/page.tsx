"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import ReactMarkdown from 'react-markdown'

// Define types for our API responses
interface SearchResponse {
  query: string;
  formattedQuery: string;
  queryTime: number;
  totalResults: number;
  final_report: string;
  papers: Paper[];
}

interface Paper{
  id: number;
  title: string;
  authors: string;
  year: number;
  abstract: string;
  url: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedResult, setExpandedResult] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [papers, setPapers] = useState<Paper[]>([])
  const [finalReport, setFinalReport] = useState("")
  const [formattedQuery, setFormattedQuery] = useState("")
  const [queryTime, setQueryTime] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const toggleExpand = (id: number) => {
    setExpandedResult(expandedResult === id ? null : id)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch('http://localhost:8000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })
      
      if (!response.ok) {
        throw new Error('Search request failed')
      }
      
      const data: SearchResponse = await response.json()
      
      setPapers(data.papers)
      setFinalReport(data.final_report)
      setFormattedQuery(data.formattedQuery)
      setQueryTime(data.queryTime)
      setTotalResults(data.totalResults)
    } catch (err) {
      setError("Failed to fetch search results. Please try again.")
      console.error("Search error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = async (filters: any) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('http://localhost:8000/api/filters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      })
      
      if (!response.ok) {
        throw new Error('Filter request failed')
      }
      
      const data = await response.json()
      setPapers(data.papers)
      setFinalReport(data.final_report)
      setTotalResults(data.totalResults)
    } catch (err) {
      setError("Failed to apply filters. Please try again.")
      console.error("Filter error:", err)
    } finally {
      setIsLoading(false)
    }
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
              CMU
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="inline-block mb-3 px-3 py-1 bg-[#F1F5FE] rounded-full">
            <span className="text-sm text-[#4285F4] font-medium">Powered by Gemini 2.0 Flash</span>
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

                  <Button 
                    className="w-full bg-[#4285F4] hover:bg-[#3367D6] rounded-lg shadow-sm"
                    onClick={() => {
                      // Collect filter values and call applyFilters
                      const filters = {
                        yearFrom: "2018",
                        yearTo: "2023",
                        // Add other filter values here
                      }
                      applyFilters(filters)
                    }}
                  >
                    Apply Filters
                  </Button>
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

                {searchQuery && (
                  <div className="mb-8">
                    <div className="bg-[#F8FAFF] border border-gray-100 rounded-xl p-5 shadow-sm">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Search Query</h3>
                      <p className="text-gray-600 text-sm font-mono bg-white p-3 rounded-lg border border-gray-100">
                        {formattedQuery || `"${searchQuery}"`}
                      </p>
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1 text-[#FBBC05]" />
                        <span className="font-light">Query generated in {queryTime || "..."} seconds</span>
                        <span className="mx-2">•</span>
                        <span className="font-light">{totalResults || 0} results found</span>
                      </div>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="py-20 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#4285F4] border-r-transparent align-[-0.125em]"></div>
                    <p className="mt-4 text-gray-500">Searching for relevant literature...</p>
                  </div>
                )}

                {error && (
                  <div className="py-10 text-center">
                    <AlertCircle className="h-10 w-10 text-[#EA4335] mx-auto mb-4" />
                    <p className="text-gray-700">{error}</p>
                    <Button 
                      onClick={() => handleSearch} 
                      className="mt-4 bg-[#4285F4] hover:bg-[#3367D6]"
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {!isLoading && !error && (
                  <Tabs defaultValue="final report" className="mb-6" onValueChange={setActiveTab}>
                    <TabsList className="w-full grid grid-cols-2 mb-6 bg-[#F1F5FE]">
                      <TabsTrigger 
                        value="final report" 
                        className="text-sm data-[state=active]:bg-[#4285F4] data-[state=active]:text-white"
                      >
                        Final Report
                      </TabsTrigger>
                      <TabsTrigger 
                        value="all" 
                        className="text-sm data-[state=active]:bg-[#4285F4] data-[state=active]:text-white"
                      >
                        Sources ({totalResults})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="final report" className="space-y-6">
                      <div className="prose prose-blue max-w-none">
                        {finalReport ? (
                          <div className="markdown-content bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <ReactMarkdown>{finalReport}</ReactMarkdown>
                          </div>
                        ) : (
                          <div className="text-center py-10 text-gray-500">
                            {searchQuery ? "Perform a search to generate a report" : "Enter a search query to generate a literature review report"}
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="all" className="space-y-6">
                      {papers.length > 0 ? (
                        papers.map((result) => (
                          <Card key={result.id} className="border-gray-100 overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <CardTitle className="font-sans text-lg font-semibold text-gray-900 hover:text-[#4285F4] transition-colors">
                                    {result.title}
                                  </CardTitle>
                                  <p className="text-sm text-gray-500 mt-1 font-light">
                                    {result.authors} • Arxiv • {result.year}
                                  </p>
                                </div>
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
                                onClick={() => window.open(result.url, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View Source
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      ) : (
                        <div className="py-12 text-center text-gray-500">
                          {searchQuery ? "No results found. Try a different search term." : "Enter a search query to find relevant literature."}
                        </div>
                      )}

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
                  </Tabs>
                )}
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