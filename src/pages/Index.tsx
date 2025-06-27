
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Trash, HandCoins, HandHeart, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [pledgeName, setPledgeName] = useState("");
  const [hasPledged, setHasPledged] = useState(false);
  const { toast } = useToast();

  const quizQuestions = [
    {
      question: "How many plastic bags do you use per week?",
      options: ["0-2 bags", "3-5 bags", "6-10 bags", "More than 10"],
      scores: [3, 2, 1, 0]
    },
    {
      question: "Do you carry a reusable water bottle?",
      options: ["Always", "Sometimes", "Rarely", "Never"],
      scores: [3, 2, 1, 0]
    },
    {
      question: "How often do you choose products with minimal packaging?",
      options: ["Always", "Often", "Sometimes", "Never"],
      scores: [3, 2, 1, 0]
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newScore = quizScore + quizQuestions[quizStep].scores[answerIndex];
    setQuizScore(newScore);
    
    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setShowQuizResult(false);
  };

  const handlePledge = () => {
    if (pledgeName.trim()) {
      setHasPledged(true);
      toast({
        title: "Thank you for your pledge!",
        description: `Welcome to the movement, ${pledgeName}! Together we can make a difference.`,
      });
    }
  };

  const getQuizResult = () => {
    if (quizScore >= 7) return { level: "Eco Champion", color: "bg-green-500", message: "You're already making a huge difference!" };
    if (quizScore >= 4) return { level: "Green Warrior", color: "bg-blue-500", message: "You're on the right track! Keep it up." };
    return { level: "Earth Protector", color: "bg-orange-500", message: "Every journey starts with a single step!" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6">
              <Leaf className="h-5 w-5 text-green-300" />
              <span className="text-sm font-medium">Environmental Campaign</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent leading-tight">
            Less Plastic,<br />More Future
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Every minute, a garbage truck of plastic enters our oceans. 
            But together, we can turn the tide and save marine life for future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Take Action Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-md"
              onClick={() => document.getElementById('facts')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn the Facts
            </Button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-teal-400/20 rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Facts Section */}
      <section id="facts" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              The Plastic Crisis in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the scale helps us appreciate why every small action matters
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader>
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-red-600">8 Million</CardTitle>
                <CardDescription className="text-lg">Tons of plastic enter oceans yearly</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">That's equivalent to dumping a garbage truck of plastic into the ocean every minute.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HandCoins className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-orange-600">1 Million</CardTitle>
                <CardDescription className="text-lg">Plastic bottles sold every minute</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Most are used once and discarded, taking 450+ years to decompose.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-blue-600">90%</CardTitle>
                <CardDescription className="text-lg">Of seabirds have plastic in their stomachs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Marine life mistakes plastic for food, leading to malnutrition and death.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-20 px-4 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              How Plastic-Smart Are You?
            </h2>
            <p className="text-xl text-gray-600">
              Take our quick quiz to discover your plastic footprint
            </p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-xl border-0">
            <CardContent className="p-8">
              {!showQuizResult ? (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Question {quizStep + 1} of {quizQuestions.length}
                      </span>
                      <Badge variant="outline" className="bg-green-50">
                        Quiz Progress
                      </Badge>
                    </div>
                    <Progress 
                      value={(quizStep / quizQuestions.length) * 100} 
                      className="h-2"
                    />
                  </div>

                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                    {quizQuestions[quizStep].question}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[quizStep].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full p-4 text-left justify-start hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                        onClick={() => handleQuizAnswer(index)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className={`w-20 h-20 ${getQuizResult().color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Gift className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">
                    You're an {getQuizResult().level}!
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {getQuizResult().message}
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={resetQuiz}
                      variant="outline" 
                      className="mr-4"
                    >
                      Take Quiz Again
                    </Button>
                    <Button 
                      onClick={() => document.getElementById('tips')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Get Tips to Improve
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips Section */}
      <section id="tips" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Simple Steps, Big Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Easy changes you can make today to reduce plastic waste
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Reusable Water Bottle",
                description: "Replace 1,000+ plastic bottles per year with one reusable bottle",
                icon: "💧",
                category: "Daily Habits"
              },
              {
                title: "Bring Your Own Bags",
                description: "Keep reusable bags in your car, purse, or backpack for shopping",
                icon: "🛍️",
                category: "Shopping"
              },
              {
                title: "Choose Loose Produce",
                description: "Skip plastic bags for fruits and vegetables when possible",
                icon: "🥕",
                category: "Grocery"
              },
              {
                title: "Refillable Containers",
                description: "Use glass or metal containers for food storage and leftovers",
                icon: "📦",
                category: "Kitchen"
              },
              {
                title: "Bamboo Utensils",
                description: "Carry reusable utensils to avoid single-use plastic cutlery",
                icon: "🥢",
                category: "On-the-Go"
              },
              {
                title: "Bar Soap & Shampoo",
                description: "Switch to package-free soap bars and shampoo bars",
                icon: "🧼",
                category: "Personal Care"
              }
            ].map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-white to-green-50">
                <CardHeader>
                  <div className="text-4xl mb-2">{tip.icon}</div>
                  <Badge variant="secondary" className="w-fit mb-2 bg-green-100 text-green-700">
                    {tip.category}
                  </Badge>
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pledge Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-12 text-green-100">
            Join thousands of people committed to reducing plastic waste
          </p>

          {!hasPledged ? (
            <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Take the Plastic-Free Pledge</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={pledgeName}
                    onChange={(e) => setPledgeName(e.target.value)}
                    className="w-full p-3 rounded-lg border-0 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button 
                    onClick={handlePledge}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg"
                    disabled={!pledgeName.trim()}
                  >
                    Make My Pledge
                  </Button>
                </div>
                
                <div className="mt-6 text-sm text-white/80">
                  <p className="mb-2">I pledge to:</p>
                  <ul className="text-left space-y-1">
                    <li>• Use reusable bags and water bottles</li>
                    <li>• Choose products with less packaging</li>
                    <li>• Share this message with friends</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="animate-fade-in">
              <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <HandHeart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Thank you for joining the movement!
              </h3>
              <p className="text-xl text-green-100 mb-8">
                Together, we're creating a cleaner, healthier planet for future generations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Share on Social Media
                </Button>
                <Button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md"
                >
                  Back to Top
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
