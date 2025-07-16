import React, { useEffect, useState, useCallback } from 'react';
import { getMainCategories, products } from '@/data/mockData';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const mainCategories = getMainCategories();
  const featuredProducts = products.slice(0, 6);

  const carouselContent = [
    {
      image: '/images/img2.jpg',
      heading: 'Premium Auto Accessories',
      subheading: 'Upgrade your car with high-quality custom products.',
      headingClass: 'text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg',
      subheadingClass: 'text-lg md:text-xl text-white/90 italic',
    },
    {
      image: '/images/img3.jpg',
      heading: 'Tailored Seat Covers',
      subheading: 'Perfect fit, unmatched comfort and style.',
      headingClass: 'text-4xl md:text-6xl font-bold text-yellow-300 shadow-xl',
      subheadingClass: 'text-white text-md font-medium',
    },
    {
      image: '/images/img4.jpg',
      heading: 'All-Weather Floor Mats',
      subheading: 'Durable. Waterproof. Designed for your car.',
      headingClass: 'text-3xl md:text-5xl font-semibold text-brand-yellow',
      subheadingClass: 'text-white/80 text-base',
    },
    {
      image: '/images/img5.jpg',
      heading: 'Drive with Style',
      subheading: 'Performance accessories built for comfort and power.',
      headingClass: 'text-4xl md:text-5xl font-bold text-white',
      subheadingClass: 'text-brand-orange font-semibold',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Enhanced slide change handler with proper animation timing
  const handleSlideChange = useCallback((slideCalculator) => {
    if (isTransitioning) return; // Prevent rapid clicks
    
    setIsTransitioning(true);
    
    // Start exit animation
    setTimeout(() => {
      setCurrentSlide(slideCalculator);
      setAnimationKey(prev => prev + 1); // Force re-render for entrance animation
      
      // Complete transition after entrance animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Match with entrance animation duration
    }, 300); // Exit animation duration
  }, [isTransitioning]);

  // Auto-change slides with transition awareness
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleSlideChange((prev) => (prev + 1) % carouselContent.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselContent.length, isTransitioning, handleSlideChange]);

  const nextSlide = useCallback((e) => {
    e.stopPropagation();
    handleSlideChange((prev) => (prev + 1) % carouselContent.length);
  }, [handleSlideChange, carouselContent.length]);

  const prevSlide = useCallback((e) => {
    e.stopPropagation();
    handleSlideChange((prev) => (prev - 1 + carouselContent.length) % carouselContent.length);
  }, [handleSlideChange, carouselContent.length]);

  const goToSlide = useCallback((index, e) => {
    e.stopPropagation();
    if (index === currentSlide) return; // Don't animate if same slide
    handleSlideChange(() => index);
  }, [currentSlide, handleSlideChange]);

  return (
    <div className="space-y-12">
      {/* Hero Section with Carousel */}
      <section className="relative h-[400px] md:h-[450px] overflow-hidden rounded-[10px]">
        <div className="absolute inset-0 z-0 rounded-[10px] overflow-hidden">
          {carouselContent.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={`Slide ${index}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out rounded-[10px] ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={prevSlide}
          disabled={isTransitioning}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <ChevronLeft className="w-6 h-6 text-white drop-shadow-lg" />
        </button>
        <button
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={nextSlide}
          disabled={isTransitioning}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
          {carouselContent.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60 backdrop-blur-sm'
              }`}
              onClick={(e) => goToSlide(index, e)}
              onMouseDown={(e) => e.stopPropagation()}
            />
          ))}
        </div>

        {/* Hero Content with Unique Animations for Each Element */}
        <div className="relative z-5 container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-xl ml-16 md:ml-20">
            <div key={animationKey}>
              {/* Heading - Slide in from left with rotation */}
              <h1 
                className={`${carouselContent[currentSlide].headingClass} mb-4 transform transition-all duration-900 ${
                  isTransitioning 
                    ? '-translate-x-12 opacity-0 rotate-3 scale-110' 
                    : 'translate-x-0 opacity-100 rotate-0 scale-100'
                }`}
                style={{ 
                  transitionDelay: isTransitioning ? '0ms' : '150ms',
                  transitionTimingFunction: isTransitioning ? 'ease-in' : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  filter: isTransitioning ? 'blur(3px) brightness(0.8)' : 'blur(0px) brightness(1)'
                }}
              >
                {carouselContent[currentSlide].heading}
              </h1>

              {/* Subheading - Fade up with elastic bounce */}
              <p 
                className={`${carouselContent[currentSlide].subheadingClass} mb-6 transform transition-all duration-1000 ${
                  isTransitioning 
                    ? 'translate-y-8 opacity-0 skew-x-2' 
                    : 'translate-y-0 opacity-100 skew-x-0'
                }`}
                style={{ 
                  transitionDelay: isTransitioning ? '50ms' : '350ms',
                  transitionTimingFunction: isTransitioning ? 'ease-in-out' : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  filter: isTransitioning ? 'blur(2px) saturate(0.5)' : 'blur(0px) saturate(1)'
                }}
              >
                {carouselContent[currentSlide].subheading}
              </p>

              {/* Buttons - Scale up with spring effect */}
              <div 
                className={`flex flex-wrap gap-4 transform transition-all duration-800 ${
                  isTransitioning 
                    ? 'scale-75 opacity-0 translate-x-4 -rotate-1' 
                    : 'scale-100 opacity-100 translate-x-0 rotate-0'
                }`}
                style={{ 
                  transitionDelay: isTransitioning ? '100ms' : '550ms',
                  transitionTimingFunction: isTransitioning ? 'ease-out' : 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  filter: isTransitioning ? 'blur(1px) contrast(0.8)' : 'blur(0px) contrast(1)'
                }}
              >
                <Link to="/category/seat-cover">
                  {/* <Button className="bg-white text-primary hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1">
                    Shop Now
                  </Button> */}
                </Link>
                <a 
                  href="https://www.autoformindia.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-white/80 hover:rotate-1">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          {/* <Link to="/" className="text-brand-orange flex items-center hover:text-brand-orange/80 transition-colors">
            View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link> */}
        </div>
        <CategoryGrid categories={mainCategories} />
      </section>

      {/* Featured Products */}
      <section className="bg-accent py-12 px-6 rounded-lg">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          {/* <Link to="/" className="text-brand-orange flex items-center hover:text-brand-orange/80 transition-colors group">
            View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link> */}
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {featuredProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-5" />
          <CarouselNext className="-right-4 md:-right-5" />
        </Carousel>
      </section>

      {/* Why Choose Us */}
      {/* <section className="py-12">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quality Products',
              desc: 'We source only the highest quality automotive accessories for your vehicle.',
            },
            {
              title: 'Trusted by Millions',
              desc: 'We’ve earned the trust of million of happy customers across the country.',
            },
            {
              title: 'Premium Craftsmanship',
              desc: 'Each product is made with precision and quality for a premium experience.',
            },

          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md border border-muted hover:border-brand-orange transition-all duration-300 text-center hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-brand-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                <Check className="text-brand-orange h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Customers Love Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Prabhat',
              quote:
                'These seat covers are absolutely perfect! They fit my car like a glove and the quality is outstanding.',
            },
            {
              name: 'Sky',
              quote:
                'The audio system I purchased transformed my driving experience. The sound quality is incredible!',
            },
            {
              name: 'Ravindra patel',
              quote:
                'Top-notch customer service and amazing quality. The seat covers fit perfectly and the premium accessories really elevate my car’s interior. Highly recommend!',
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-muted hover:border-brand-orange transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-brand-yellow"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <p className="font-medium">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Index;