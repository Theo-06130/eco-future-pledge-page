import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PhotoCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Placeholder images from Unsplash
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      alt: "Nature landscape with clear water",
      title: "Protégeons nos eaux"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=600&fit=crop",
      alt: "Green meadow with animals",
      title: "Préservons la nature"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop",
      alt: "Cat in natural environment",
      title: "Sauvons la faune"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
      alt: "Person with laptop in nature",
      title: "Un futur plus vert"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      alt: "Clean living space",
      title: "Un monde plus propre"
    }
  ];

  // Auto-slide every 8 seconds
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [api]);

  // Update current slide when carousel changes
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Un Monde Sans Plastique
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez la beauté de notre planète que nous devons protéger ensemble
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              loop: true
            }}
          >
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id}>
                  <Card className="border-0 shadow-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-[400px] md:h-[500px] object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {image.title}
                          </h3>
                          <p className="text-lg text-white/90">
                            Chaque geste compte pour préserver cette beauté naturelle
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white shadow-lg" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white shadow-lg" />
          </Carousel>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "bg-green-500 scale-125" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;
