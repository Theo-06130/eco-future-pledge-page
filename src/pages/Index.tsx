
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Trash, HandCoins, HandHeart, Gift, Recycle } from "lucide-react";
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
      question: "Quelle est la meilleure alternative aux sacs plastique jetables ?",
      options: ["Sacs en papier", "Sacs réutilisables en tissu", "Sacs biodégradables", "Cartons"],
      correctAnswer: 1
    },
    {
      question: "Combien de temps met une bouteille plastique à se décomposer dans la nature ?",
      options: ["50 ans", "100 ans", "450 ans", "1000 ans"],
      correctAnswer: 2
    },
    {
      question: "Quel geste simple permet d'éviter les emballages plastique au supermarché ?",
      options: ["Acheter en vrac", "Choisir les produits les moins chers", "Prendre des sacs plastique gratuits", "Acheter en grande quantité"],
      correctAnswer: 0
    },
    {
      question: "Comment remplacer les bouteilles d'eau plastique au quotidien ?",
      options: ["Boire moins d'eau", "Utiliser une gourde réutilisable", "Acheter de l'eau en canettes", "Boire uniquement du robinet"],
      correctAnswer: 1
    },
    {
      question: "Que faire avec les contenants plastique alimentaires vides ?",
      options: ["Les jeter à la poubelle", "Les réutiliser pour le stockage", "Les brûler", "Les enterrer dans le jardin"],
      correctAnswer: 1
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === quizQuestions[quizStep].correctAnswer;
    const newScore = quizScore + (isCorrect ? 1 : 0);
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
        title: "Merci pour votre engagement !",
        description: `Bienvenue dans le mouvement, ${pledgeName} ! Ensemble, nous pouvons faire la différence.`,
      });
    }
  };

  const getQuizResult = () => {
    if (quizScore === 5) return { 
      level: "Expert Éco-responsable", 
      color: "bg-green-500", 
      message: "Félicitations ! Vous maîtrisez parfaitement les gestes éco-responsables !" 
    };
    if (quizScore >= 3) return { 
      level: "Guerrier Vert", 
      color: "bg-blue-500", 
      message: "Très bien ! Vous êtes sur la bonne voie, continuez vos efforts !" 
    };
    if (quizScore >= 1) return { 
      level: "Apprenti Écolo", 
      color: "bg-orange-500", 
      message: "C'est un bon début ! Il y a encore quelques gestes à apprendre." 
    };
    return { 
      level: "Futur Protecteur", 
      color: "bg-purple-500", 
      message: "Chaque voyage commence par un premier pas ! Découvrez nos conseils." 
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      {/* Section Héro */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-green-600 via-blue-700 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6">
              <Leaf className="h-5 w-5 text-green-300" />
              <span className="text-sm font-medium">Campagne Environnementale</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent leading-tight">
            Moins de plastique,<br />Plus de vie
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Chaque minute, l'équivalent d'un camion poubelle de plastique finit dans nos océans. 
            Ensemble, inversons la tendance et préservons la vie marine pour les générations futures.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Agir Maintenant
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-md"
              onClick={() => document.getElementById('facts')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir les Chiffres
            </Button>
          </div>
        </div>
        
        {/* Éléments flottants */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-teal-400/20 rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Section Chiffres Clés */}
      <section id="facts" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              La Crise du Plastique en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprendre l'ampleur du problème nous aide à réaliser pourquoi chaque petit geste compte
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader>
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-red-600">8 Millions</CardTitle>
                <CardDescription className="text-lg">de tonnes de plastique dans les océans chaque année</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Cela équivaut à déverser un camion poubelle de plastique dans l'océan chaque minute.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HandCoins className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-orange-600">1 Million</CardTitle>
                <CardDescription className="text-lg">de bouteilles plastique vendues chaque minute</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">La plupart sont utilisées une seule fois puis jetées, mettant 450+ ans à se décomposer.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-blue-600">90%</CardTitle>
                <CardDescription className="text-lg">des oiseaux marins ont du plastique dans l'estomac</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">La vie marine confond le plastique avec de la nourriture, causant malnutrition et mort.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Quiz */}
      <section id="quiz" className="py-20 px-4 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Quiz : Êtes-vous un Expert Anti-Plastique ?
            </h2>
            <p className="text-xl text-gray-600">
              Testez vos connaissances sur les gestes éco-responsables
            </p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-xl border-0">
            <CardContent className="p-8">
              {!showQuizResult ? (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Question {quizStep + 1} sur {quizQuestions.length}
                      </span>
                      <Badge variant="outline" className="bg-green-50">
                        Quiz Écolo
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
                    Vous êtes un {getQuizResult().level} !
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-4">
                    Score : {quizScore}/5 points
                  </p>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {getQuizResult().message}
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={resetQuiz}
                      variant="outline" 
                      className="mr-4"
                    >
                      Refaire le Quiz
                    </Button>
                    <Button 
                      onClick={() => document.getElementById('tips')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Découvrir les Conseils
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section Conseils */}
      <section id="tips" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              7 Gestes Simples, Impact Énorme
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des changements faciles à adopter dès aujourd'hui pour réduire votre empreinte plastique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Gourde Réutilisable",
                description: "Remplacez plus de 1000 bouteilles plastique par an avec une seule gourde",
                icon: "💧",
                category: "Quotidien"
              },
              {
                title: "Sacs Réutilisables",
                description: "Gardez des sacs en tissu dans votre voiture, sac à main ou sac à dos",
                icon: "🛍️",
                category: "Courses"
              },
              {
                title: "Achat en Vrac",
                description: "Évitez les emballages plastique en choisissant les produits en vrac",
                icon: "🥕",
                category: "Alimentation"
              },
              {
                title: "Contenants en Verre",
                description: "Utilisez des récipients en verre ou métal pour conserver vos aliments",
                icon: "📦",
                category: "Cuisine"
              },
              {
                title: "Couverts en Bambou",
                description: "Emportez des couverts réutilisables pour éviter le plastique jetable",
                icon: "🥢",
                category: "Nomade"
              },
              {
                title: "Savons Solides",
                description: "Passez aux savons et shampoings solides sans emballage plastique",
                icon: "🧼",
                category: "Hygiène"
              },
              {
                title: "Tri et Recyclage",
                description: "Triez correctement vos déchets et donnez une seconde vie au plastique",
                icon: "♻️",
                category: "Recyclage"
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

      {/* Section Engagement */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt(e) à Faire la Différence ?
          </h2>
          <p className="text-xl mb-12 text-green-100">
            Rejoignez des milliers de personnes engagées pour réduire les déchets plastique
          </p>

          {!hasPledged ? (
            <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Je m'engage pour moins de plastique</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Entrez votre prénom"
                    value={pledgeName}
                    onChange={(e) => setPledgeName(e.target.value)}
                    className="w-full p-3 rounded-lg border-0 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button 
                    onClick={handlePledge}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg"
                    disabled={!pledgeName.trim()}
                  >
                    Prendre Mon Engagement
                  </Button>
                </div>
                
                <div className="mt-6 text-sm text-white/80">
                  <p className="mb-2">Je m'engage à :</p>
                  <ul className="text-left space-y-1">
                    <li>• Utiliser des sacs et gourdes réutilisables</li>
                    <li>• Choisir des produits avec moins d'emballages</li>
                    <li>• Partager ce message avec mes proches</li>
                    <li>• Adopter les gestes éco-responsables au quotidien</li>
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
                Merci de rejoindre le mouvement !
              </h3>
              <p className="text-xl text-green-100 mb-8">
                Ensemble, nous créons une planète plus propre et plus saine pour les générations futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Partager sur les Réseaux
                </Button>
                <Button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md"
                >
                  Retour en Haut
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
