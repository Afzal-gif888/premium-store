import React, { useState, useEffect } from 'react';
import Header from 'components/Header';

import Button from 'components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';

const Collection = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: 'all',
    sizes: [],
    priceRange: 'all',
    availability: []
  });

  const productsPerPage = 12;

  const mockProducts = [
  {
    id: 1,
    name: "Classic Leather Sneakers",
    category: "Sneakers",
    price: 129.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1581954813630-14c9bd135692",
      alt: "White leather sneakers with red accent stripe on clean white background, side view showing premium stitching details"
    },
    {
      url: "https://images.unsplash.com/photo-1553098247-7edd03447401",
      alt: "White leather sneakers top view showing lace pattern and cushioned insole on wooden surface"
    }],

    sizes: [
    { size: "8", stock: 5 },
    { size: "9", stock: 8 },
    { size: "10", stock: 12 },
    { size: "11", stock: 3 }],

    dateAdded: new Date('2026-01-15')
  },
  {
    id: 2,
    name: "Premium Suede Boots",
    category: "Boots",
    price: 249.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1537192490958-6371976c3e65",
      alt: "Brown suede ankle boots with leather laces on rustic wooden floor, showcasing premium texture and craftsmanship"
    },
    {
      url: "https://images.unsplash.com/photo-1664961974467-95bd40c3282f",
      alt: "Brown suede boots close-up detail of stitching and sole construction on neutral background"
    }],

    sizes: [
    { size: "7", stock: 2 },
    { size: "8", stock: 4 },
    { size: "9", stock: 6 },
    { size: "10", stock: 8 }],

    dateAdded: new Date('2026-01-14')
  },
  {
    id: 3,
    name: "Elegant Leather Loafers",
    category: "Loafers",
    price: 179.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1677203232939-f5c8a2e1c1e3",
      alt: "Black leather penny loafers with gold hardware detail on marble surface, professional business footwear"
    }],

    sizes: [
    { size: "8", stock: 10 },
    { size: "9", stock: 15 },
    { size: "10", stock: 12 },
    { size: "11", stock: 8 }],

    dateAdded: new Date('2026-01-13')
  },
  {
    id: 4,
    name: "Summer Comfort Sandals",
    category: "Sandals",
    price: 79.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1571387779893-ff6f7da689e6",
      alt: "Brown leather strappy sandals on beach sand with ocean waves in background, casual summer footwear"
    },
    {
      url: "https://images.unsplash.com/photo-1613912804931-c3512f360cd3",
      alt: "Brown leather sandals top view showing adjustable buckle straps and cushioned footbed"
    }],

    sizes: [
    { size: "7", stock: 0 },
    { size: "8", stock: 0 },
    { size: "9", stock: 0 },
    { size: "10", stock: 0 }],

    dateAdded: new Date('2026-01-12')
  },
  {
    id: 5,
    name: "Executive Oxford Shoes",
    category: "Formal",
    price: 299.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1677203006929-fd0d9f4f350d",
      alt: "Black polished leather oxford dress shoes with brogue detailing on dark wooden floor, formal business attire"
    }],

    sizes: [
    { size: "8", stock: 6 },
    { size: "9", stock: 8 },
    { size: "10", stock: 10 },
    { size: "11", stock: 5 },
    { size: "12", stock: 3 }],

    dateAdded: new Date('2026-01-11')
  },
  {
    id: 6,
    name: "Athletic Running Sneakers",
    category: "Sneakers",
    price: 159.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1591852699151-6791979ae0a0",
      alt: "Blue and white mesh running sneakers with orange accent on gym floor, athletic performance footwear"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_19d012242-1764677610915.png",
      alt: "Blue running sneakers side profile showing cushioned sole and breathable mesh upper design"
    }],

    sizes: [
    { size: "7", stock: 4 },
    { size: "8", stock: 7 },
    { size: "9", stock: 10 },
    { size: "10", stock: 8 },
    { size: "11", stock: 5 }],

    dateAdded: new Date('2026-01-10')
  },
  {
    id: 7,
    name: "Casual Canvas Sneakers",
    category: "Sneakers",
    price: 89.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1581088293328-6b27697b4160",
      alt: "Navy blue canvas low-top sneakers with white rubber sole on concrete surface, casual everyday wear"
    }],

    sizes: [
    { size: "8", stock: 2 },
    { size: "9", stock: 1 },
    { size: "10", stock: 3 },
    { size: "11", stock: 0 }],

    dateAdded: new Date('2026-01-09')
  },
  {
    id: 8,
    name: "Winter Hiking Boots",
    category: "Boots",
    price: 279.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1524593024131-a2a3d2e2b11f",
      alt: "Brown waterproof hiking boots with red laces on mountain trail, outdoor adventure footwear with rugged sole"
    },
    {
      url: "https://images.unsplash.com/photo-1583356016392-d3ab107463b6",
      alt: "Brown hiking boots close-up of ankle support and tread pattern on rocky terrain"
    }],

    sizes: [
    { size: "8", stock: 8 },
    { size: "9", stock: 12 },
    { size: "10", stock: 15 },
    { size: "11", stock: 10 },
    { size: "12", stock: 6 }],

    dateAdded: new Date('2026-01-08')
  },
  {
    id: 9,
    name: "Minimalist Slip-On Loafers",
    category: "Loafers",
    price: 139.99,
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0fa676e-1768581822017.png",
      alt: "Tan leather slip-on loafers on white marble floor, minimalist design with elastic side panels"
    }],

    sizes: [
    { size: "7", stock: 5 },
    { size: "8", stock: 8 },
    { size: "9", stock: 10 },
    { size: "10", stock: 7 }],

    dateAdded: new Date('2026-01-07')
  },
  {
    id: 10,
    name: "Sport Slide Sandals",
    category: "Sandals",
    price: 59.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1532185080977-d0494f2871c4",
      alt: "Black rubber sport slide sandals with contoured footbed on poolside tiles, casual athletic wear"
    }],

    sizes: [
    { size: "8", stock: 12 },
    { size: "9", stock: 15 },
    { size: "10", stock: 18 },
    { size: "11", stock: 14 }],

    dateAdded: new Date('2026-01-06')
  },
  {
    id: 11,
    name: "Derby Dress Shoes",
    category: "Formal",
    price: 259.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1696271026707-1006ca528778",
      alt: "Brown leather derby shoes with open lacing system on hardwood floor, business casual formal footwear"
    }],

    sizes: [
    { size: "8", stock: 4 },
    { size: "9", stock: 6 },
    { size: "10", stock: 8 },
    { size: "11", stock: 5 }],

    dateAdded: new Date('2026-01-05')
  },
  {
    id: 12,
    name: "High-Top Basketball Sneakers",
    category: "Sneakers",
    price: 189.99,
    images: [
    {
      url: "https://images.unsplash.com/photo-1647238384941-adfd9288341b",
      alt: "Red and black high-top basketball sneakers on indoor court floor, athletic performance footwear with ankle support"
    }],

    sizes: [
    { size: "9", stock: 6 },
    { size: "10", stock: 8 },
    { size: "11", stock: 10 },
    { size: "12", stock: 7 },
    { size: "13", stock: 4 }],

    dateAdded: new Date('2026-01-04')
  }];


  const searchSuggestions = [
  "Classic Leather Sneakers",
  "Premium Suede Boots",
  "Elegant Leather Loafers",
  "Summer Comfort Sandals",
  "Executive Oxford Shoes",
  "Athletic Running Sneakers",
  "Casual Canvas Sneakers",
  "Winter Hiking Boots",
  "Minimalist Slip-On Loafers",
  "Sport Slide Sandals",
  "Derby Dress Shoes",
  "High-Top Basketball Sneakers"];


  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [filters, sortBy, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      sizes: [],
      priceRange: 'all',
      availability: []
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const filterProducts = () => {
    let filtered = [...mockProducts];

    if (searchTerm?.trim()) {
      filtered = filtered?.filter((product) =>
      product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      product?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (filters?.category !== 'all') {
      filtered = filtered?.filter((product) =>
      product?.category?.toLowerCase() === filters?.category?.toLowerCase()
      );
    }

    if (filters?.sizes?.length > 0) {
      filtered = filtered?.filter((product) =>
      product?.sizes?.some((size) => filters?.sizes?.includes(size?.size))
      );
    }

    if (filters?.priceRange !== 'all') {
      filtered = filtered?.filter((product) => {
        const price = product?.price;
        if (filters?.priceRange === '0-100') return price < 100;
        if (filters?.priceRange === '100-200') return price >= 100 && price < 200;
        if (filters?.priceRange === '200-300') return price >= 200 && price < 300;
        if (filters?.priceRange === '300-500') return price >= 300 && price < 500;
        if (filters?.priceRange === '500+') return price >= 500;
        return true;
      });
    }

    if (filters?.availability?.length > 0) {
      filtered = filtered?.filter((product) => {
        const totalStock = product?.sizes?.reduce((sum, size) => sum + size?.stock, 0);

        if (filters?.availability?.includes('out-of-stock') && totalStock === 0) return true;
        if (filters?.availability?.includes('low-stock') && totalStock > 0 && totalStock <= 5) return true;
        if (filters?.availability?.includes('in-stock') && totalStock > 5) return true;

        return false;
      });
    }

    return filtered;
  };

  const sortProducts = (products) => {
    const sorted = [...products];

    switch (sortBy) {
      case 'newest':
        return sorted?.sort((a, b) => b?.dateAdded - a?.dateAdded);
      case 'price-low':
        return sorted?.sort((a, b) => a?.price - b?.price);
      case 'price-high':
        return sorted?.sort((a, b) => b?.price - a?.price);
      case 'name-asc':
        return sorted?.sort((a, b) => a?.name?.localeCompare(b?.name));
      case 'name-desc':
        return sorted?.sort((a, b) => b?.name?.localeCompare(a?.name));
      case 'availability':
        return sorted?.sort((a, b) => {
          const stockA = a?.sizes?.reduce((sum, size) => sum + size?.stock, 0);
          const stockB = b?.sizes?.reduce((sum, size) => sum + size?.stock, 0);
          return stockB - stockA;
        });
      default:
        return sorted;
    }
  };

  const filteredProducts = filterProducts();
  const sortedProducts = sortProducts(filteredProducts);
  const totalPages = Math.ceil(sortedProducts?.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = sortedProducts?.slice(startIndex, startIndex + productsPerPage);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const activeFilterCount =
  (filters?.category !== 'all' ? 1 : 0) +
  filters?.sizes?.length + (
  filters?.priceRange !== 'all' ? 1 : 0) +
  filters?.availability?.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-8 md:py-12 lg:py-16">
          <div className="gradient-mesh" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: 'var(--font-headline)' }}>
                Our Collection
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                Discover premium footwear with real-time availability. Know before you go.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isMobileFilterOpen={isMobileFilterOpen}
              onCloseMobileFilter={() => setIsMobileFilterOpen(false)} />


            <div className="flex-1 min-w-0">
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <div className="flex-1">
                    <SearchBar
                      onSearch={handleSearch}
                      suggestions={searchSuggestions} />

                  </div>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => setIsMobileFilterOpen(true)}
                    iconName="SlidersHorizontal"
                    iconPosition="left"
                    iconSize={18}
                    className="lg:hidden">

                    Filters
                    {activeFilterCount > 0 &&
                    <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                        {activeFilterCount}
                      </span>
                    }
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm md:text-base text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                      {sortedProducts?.length} {sortedProducts?.length === 1 ? 'product' : 'products'} found
                    </p>
                    {activeFilterCount > 0 &&
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      iconName="X"
                      iconSize={14}>

                        Clear filters
                      </Button>
                    }
                  </div>
                  <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
                </div>

                <ProductGrid products={displayedProducts} isLoading={isLoading} />

                {!isLoading && sortedProducts?.length > displayedProducts?.length &&
                <div className="flex justify-center pt-6 md:pt-8">
                    <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoadMore}
                    iconName="ChevronDown"
                    iconPosition="right"
                    iconSize={20}>

                      Load More Products
                    </Button>
                  </div>
                }

                {!isLoading && displayedProducts?.length > 0 &&
                <div className="text-center pt-4">
                    <p className="text-xs md:text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                      Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts?.length)} of {sortedProducts?.length} products
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default Collection;