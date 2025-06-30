import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Gauge,
  LayoutList,
  Phone,
  Heart,
  Search,
  ChevronDown,
  Menu,
  X,
  Settings,
  Wrench,
  Zap,
  Shield,
  Wind,
  Eye,
  Lightbulb,
  Radio,
  Volume2,
  Fuel,
  Cog,
  Battery,
  Camera,
  Navigation,
  Truck,
  Lock,
  Key,
  Compass,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getMainCategories, getSubcategories } from '@/data/mockData';
import NavWishlist from './NavWishlist';
import logo from '/autologo-removebg-preview.png'; // adjust the path as per your project

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState(null);
  const mainCategories = getMainCategories();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileExpandedCategory(null);
  };

  const toggleMobileCategory = (categoryId) => {
    setMobileExpandedCategory(
      mobileExpandedCategory === categoryId ? null : categoryId
    );
  };

const getCategoryIcon = (name) => {
  const lowerName = name.toLowerCase();
  
  // Engine & Performance
  if (lowerName.includes('engine') || lowerName.includes('motor')) return <Cog className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('turbo') || lowerName.includes('supercharger')) return <Zap className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('exhaust') || lowerName.includes('muffler')) return <Wind className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('fuel') || lowerName.includes('gas') || lowerName.includes('diesel')) return <Fuel className="h-4 w-4 inline mr-2" />;
  
  // Body & Exterior
  if (lowerName.includes('body') || lowerName.includes('panel') || lowerName.includes('door')) return <Car className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('bumper') || lowerName.includes('fender')) return <Shield className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('light') || lowerName.includes('headlight') || lowerName.includes('taillight')) return <Lightbulb className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('mirror') || lowerName.includes('window')) return <Eye className="h-4 w-4 inline mr-2" />;
  
  // Interior & Comfort
  if (lowerName.includes('seat') || lowerName.includes('cushion')) return <Car className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('steering') || lowerName.includes('wheel')) return <Gauge className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('dashboard') || lowerName.includes('console')) return <Settings className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('audio') || lowerName.includes('speaker') || lowerName.includes('radio')) return <Volume2 className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('navigation') || lowerName.includes('gps')) return <Navigation className="h-4 w-4 inline mr-2" />;
  
  // Electronics & Accessories
  if (lowerName.includes('battery') || lowerName.includes('alternator')) return <Battery className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('camera') || lowerName.includes('sensor')) return <Camera className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('alarm') || lowerName.includes('security')) return <Lock className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('key') || lowerName.includes('remote')) return <Key className="h-4 w-4 inline mr-2" />;
  
  // Tools & Maintenance
  if (lowerName.includes('tool') || lowerName.includes('repair') || lowerName.includes('maintenance')) return <Wrench className="h-4 w-4 inline mr-2" />;
  if (lowerName.includes('oil') || lowerName.includes('filter') || lowerName.includes('fluid')) return <Settings className="h-4 w-4 inline mr-2" />;
  
  // Commercial Vehicles
  if (lowerName.includes('truck') || lowerName.includes('commercial') || lowerName.includes('heavy')) return <Truck className="h-4 w-4 inline mr-2" />;
  
  // Default fallback
  return <LayoutList className="h-4 w-4 inline mr-2" />;
};

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Autoform Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 inline mr-1" /> Contact
              </Link>
              <NavWishlist />
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Category navigation with hover dropdowns */}
        <nav className="hidden md:block py-2 border-t">
          <div className="flex items-center space-x-8">
            {mainCategories.map((category) => {
              const subcategories = getSubcategories(category.id);
              const icon = getCategoryIcon(category.name);

              if (subcategories.length > 0) {
                return (
                  <div
                    key={category.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <Link
                      to={`/category/${category.id}`}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer py-2"
                    >
                      {icon}
                      {category.name}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Link>
                    <div
                      className={`absolute top-full left-0 w-80 bg-background border rounded-md shadow-lg transition-all duration-200 ${
                        hoveredCategory === category.id
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                      style={{ zIndex: 60 }}
                    >
                      <div className="grid gap-2 p-4">
                        {subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            to={`/category/${subcategory.id}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{subcategory.name}</div>
                            {subcategory.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subcategory.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="flex items-center text-sm text-muted-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-colors whitespace-nowrap"
                  >
                    {getCategoryIcon(category.name)}
                    {category.name}
                  </Link>
                );
              }
            })}
          </div>
        </nav>

        {/* Mobile Search bar */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t bg-background">
            <div className="space-y-2">
              {mainCategories.map((category) => {
                const subcategories = getSubcategories(category.id);
                const icon = getCategoryIcon(category.name);

                if (subcategories.length > 0) {
                  return (
                    <div key={category.id} className="space-y-2">
                      <button
                        onClick={() => toggleMobileCategory(category.id)}
                        className="flex items-center justify-between w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                      >
                        <span className="flex items-center gap-2">
                          {icon}
                          {category.name}
                        </span>
                        <ChevronDown
                          className={`h-3 w-3 transition-transform ${
                            mobileExpandedCategory === category.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileExpandedCategory === category.id && (
                        <div className="pl-4 space-y-1">
                          {subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              to={`/category/${subcategory.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                    >
                      {icon}
                      {category.name}
                    </Link>
                  );
                }
              })}

              {/* Mobile navigation items */}
              <div className="pt-4 border-t space-y-2">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent"
                >
                  <Phone className="h-4 w-4" />
                  Contact
                </Link>
                <div className="px-3 py-2">
                  <NavWishlist />
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;