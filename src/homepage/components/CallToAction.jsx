import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { useNavigate } from 'react-router-dom';
import StoreLocationModal from 'components/StoreLocationModal';

const CallToAction = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="gradient-mesh opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center scroll-reveal">

          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/20 mb-6 md:mb-8">
            <Icon name="Store" size={40} color="var(--color-accent)" strokeWidth={2} />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Visit Our Store Today
          </h2>

          <p className="text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto mb-8 md:mb-10 lg:mb-12">
            Experience premium quality footwear in person. Check our collection online, then visit us to try on your favorites with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
              iconName="ShoppingBag"
              iconPosition="left"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Check Collection
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              iconName="Navigation"
              iconPosition="left"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Visit Store
            </Button>
          </div>

          <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-primary-foreground/10 pt-12">
            <div className="flex flex-col items-center gap-3">
              <Icon name="MapPin" size={32} color="var(--color-accent)" />
              <h3 className="text-lg md:text-xl font-semibold">Location</h3>
              <p className="text-sm md:text-base opacity-80 max-w-[200px] text-center">Beside Bharath Theatre Street, Upstairs Of RI Fashion Mydukur</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Icon name="Clock" size={32} color="var(--color-accent)" />
              <h3 className="text-lg md:text-xl font-semibold">Open Hours</h3>
              <p className="text-sm md:text-base opacity-80">Mon-Sat: 10AM-8PM<br />Sun: 10AM-6PM</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Icon name="Phone" size={32} color="var(--color-accent)" />
              <h3 className="text-lg md:text-xl font-semibold">Help Line</h3>
              <p className="text-sm md:text-base opacity-80">+91 9701645812</p>
            </div>
          </div>

        </div>
      </div>

      <StoreLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default CallToAction;