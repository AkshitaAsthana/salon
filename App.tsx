
import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, 
  Sparkles, 
  Heart, 
  Clock, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Star, 
  ChevronRight, 
  Calendar, 
  MessageSquare, 
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Bot
} from 'lucide-react';
import { SALON_DETAILS, SERVICES, REVIEWS, GALLERY_IMAGES } from './constants';
import { storageService } from './services/storageService';
import { geminiService } from './services/geminiService';
import { Service, Appointment } from './types';

// --- Components ---

const Navbar: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col">
          <span className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>GENERATIONS</span>
          <span className={`text-xs tracking-[0.2em] font-light ${isScrolled ? 'text-gold' : 'text-gold'}`}>SALON</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-widest transition-colors duration-200 ${isScrolled ? 'text-gray-700 hover:text-gold' : 'text-white hover:text-gold'}`}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onBookNow}
            className={`px-6 py-2 border ${isScrolled ? 'border-gold text-gold hover:bg-gold hover:text-white' : 'border-white text-white hover:bg-white hover:text-gray-900'} transition-all duration-300 text-sm tracking-widest uppercase font-medium`}
          >
            Book Now
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={isScrolled ? 'text-gray-900' : 'text-white'}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-900">
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-serif text-gray-800"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => { setIsOpen(false); onBookNow(); }}
            className="px-8 py-3 bg-gold text-white tracking-widest uppercase font-medium"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://picsum.photos/seed/salon-hero/1920/1080" 
          className="w-full h-full object-cover"
          alt="Luxury Salon"
        />
      </div>
      
      <div className="relative z-20 text-center text-white px-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />)}
          <span className="text-sm tracking-widest uppercase ml-2">Rated 5.0 in Stuart</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">Crafting Your Best Self</h1>
        <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto tracking-wide opacity-90">
          Experience the art of hair and beauty at Generations Salon. Where timeless elegance meets modern style.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={onBookNow}
            className="w-full md:w-auto px-10 py-4 bg-gold text-white text-sm tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-gold transition-all duration-300 shadow-xl"
          >
            Reserve Your Experience
          </button>
          <a 
            href="#services"
            className="w-full md:w-auto px-10 py-4 border border-white text-white text-sm tracking-[0.2em] uppercase font-bold hover:bg-white/10 transition-all duration-300"
          >
            View Services
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <Clock className="text-white opacity-50" size={32} />
      </div>
    </section>
  );
};

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const result = await geminiService.getServiceRecommendation(input);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isOpen ? 'w-80 md:w-96' : 'w-16 h-16'}`}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gold text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          <Bot size={32} />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[450px]">
          <div className="bg-gold p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-semibold">Beauty Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!recommendation && !loading ? (
              <p className="text-gray-500 text-sm text-center mt-10">
                Ask me anything! "What's best for frizzy hair?" or "I need a glow for my wedding."
              </p>
            ) : null}
            
            {loading && (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
              </div>
            )}

            {recommendation && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                  {recommendation.friendlyMessage}
                </div>
                {recommendation.recommendations.map((rec: any, idx: number) => (
                  <div key={idx} className="border-l-4 border-gold bg-gold/5 p-3 rounded-r-lg">
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">{rec.serviceName}</h4>
                    <p className="text-xs text-gray-600 mt-1">{rec.reasoning}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="p-3 border-t bg-gray-50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="How can we help?"
                className="w-full pl-3 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gold hover:text-gold-dark"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', serviceId: '', date: '', time: '', notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveAppointment({
      ...formData,
      serviceId: formData.serviceId || 'Generic'
    } as any);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-serif mb-4">Appointment Requested!</h2>
            <p className="text-gray-600">We've received your request. Our stylist will contact you shortly to confirm.</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:block md:w-1/3 bg-gold p-8 text-white">
              <h3 className="text-2xl font-serif mb-6">Your Visit</h3>
              <ul className="space-y-4 opacity-90 text-sm">
                <li className="flex items-start">
                  <Clock size={16} className="mt-1 mr-2 flex-shrink-0" />
                  <span>Mon-Fri: 9am - 5pm</span>
                </li>
                <li className="flex items-start">
                  <MapPin size={16} className="mt-1 mr-2 flex-shrink-0" />
                  <span>4229 SE Federal Hwy, Stuart, FL</span>
                </li>
              </ul>
              <div className="mt-20 border-t border-white/20 pt-8">
                <p className="italic text-sm">"Your beauty is our generation's passion."</p>
              </div>
            </div>

            <div className="flex-1 p-8">
              <h2 className="text-2xl font-serif mb-6 text-gray-800">Book Appointment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full p-3 border border-gray-200 rounded focus:border-gold focus:outline-none transition-colors"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full p-3 border border-gray-200 rounded focus:border-gold focus:outline-none transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full p-3 border border-gray-200 rounded focus:border-gold focus:outline-none transition-colors"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                  <select 
                    className="w-full p-3 border border-gray-200 rounded focus:border-gold focus:outline-none transition-colors text-gray-500"
                    value={formData.serviceId}
                    onChange={e => setFormData({...formData, serviceId: e.target.value})}
                  >
                    <option value="">Select Service</option>
                    {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required 
                    type="date" 
                    className="w-full p-3 border border-gray-200 rounded focus:border-gold focus:outline-none transition-colors text-gray-500"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                  <input 
                    required 
                    type="time" 
                    className="w-full p-3 border border-gray-200 rounded focus:border-gold focus:outline-none transition-colors text-gray-500"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  />
                </div>
                <textarea 
                  placeholder="Special notes or requests..." 
                  className="w-full p-3 border border-gray-200 rounded focus:border-gold focus:outline-none transition-colors h-24"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-gold text-white tracking-widest font-bold uppercase hover:bg-black transition-colors"
                >
                  Send Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MainApp: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white selection:bg-gold/30">
      <Navbar onBookNow={() => setIsBookingOpen(true)} />
      <Hero onBookNow={() => setIsBookingOpen(true)} />

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-[0.3em] uppercase text-gold font-bold mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Salon Services</h3>
            <div className="w-24 h-px bg-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-bold text-gold">
                    {service.price}
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] tracking-widest uppercase text-gold font-bold mb-2 block">{service.category}</span>
                  <h4 className="text-xl font-serif mb-3 text-gray-900">{service.name}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center text-xs text-gray-400 font-medium tracking-wide">
                      <Clock size={14} className="mr-1" /> {service.duration}
                    </div>
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className="text-xs uppercase tracking-widest text-gold font-bold flex items-center group-hover:translate-x-1 transition-transform"
                    >
                      Book <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Stats */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-gold/10 -z-10 rounded-full" />
              <img 
                src="https://picsum.photos/seed/sal-int/800/1000" 
                alt="Salon Interior" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-xl hidden md:block border-l-4 border-gold">
                <div className="flex items-center space-x-2 text-gold mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="font-serif text-2xl">5.0 Rating</p>
                <p className="text-gray-500 text-sm">29+ Verified Reviews</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-sm tracking-[0.3em] uppercase text-gold font-bold mb-4">Our Legacy</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">Decades of Style in Stuart, Florida</h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Generations Salon is more than just a beauty parlour. We are a community of artists dedicated to making every client feel like royalty. From precision cuts to custom color, we combine classic techniques with modern trends.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="text-3xl font-serif text-gold mb-1">29+</h4>
                  <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Five Star Reviews</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-gold mb-1">10k+</h4>
                  <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Happy Clients</p>
                </div>
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="px-10 py-4 bg-gray-900 text-white tracking-widest uppercase font-bold text-sm hover:bg-gold transition-colors flex items-center group"
              >
                Learn More About Us <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Scissors size={400} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-[0.3em] uppercase text-gold font-bold mb-4">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-6">What Our Clients Say</h3>
            <p className="text-gray-400 max-w-xl mx-auto">Join our list of satisfied clients in Stuart who trust us with their aesthetic journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-gold/50 transition-colors">
                <div className="flex items-center space-x-1 text-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic leading-relaxed mb-8 text-gray-300">"{review.content}"</p>
                <div className="flex items-center">
                  <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full mr-4 border-2 border-gold/30" />
                  <div>
                    <p className="font-bold tracking-wide">{review.author}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <a 
              href="https://www.google.com/search?q=Generations+Salon+Stuart+FL+reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gold font-bold tracking-widest uppercase hover:text-white transition-colors"
            >
              <span>View All 29 Reviews</span> <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-[0.3em] uppercase text-gold font-bold mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Salon Artistry</h3>
            <div className="w-24 h-px bg-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg">
                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Work" />
                <div className="absolute inset-0 bg-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Instagram className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Directions */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-white shadow-2xl flex flex-col lg:flex-row overflow-hidden rounded-xl">
            <div className="lg:w-1/2 p-8 md:p-16">
              <h3 className="text-4xl font-serif mb-8 text-gray-900">Visit Us</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-gold/10 p-4 rounded-full text-gold mr-6">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Our Location</h4>
                    <p className="text-gray-600">{SALON_DETAILS.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gold/10 p-4 rounded-full text-gold mr-6">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">{SALON_DETAILS.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gold/10 p-4 rounded-full text-gold mr-6">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Hours</h4>
                    <div className="text-gray-600 grid grid-cols-2 gap-x-4">
                      <span>Mon - Fri:</span>
                      <span>9 AM - 5 PM</span>
                      <span>Sat - Sun:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 tracking-widest uppercase text-sm">Follow the Style</h4>
                <div className="flex space-x-6">
                  <a href={SALON_DETAILS.socials.instagram} className="text-gray-400 hover:text-gold transition-colors"><Instagram size={24} /></a>
                  <a href={SALON_DETAILS.socials.facebook} className="text-gray-400 hover:text-gold transition-colors"><Facebook size={24} /></a>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 min-h-[400px]">
              {/* Using a placeholder for map integration. In production, use Google Maps Iframe */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.686445964893!2d-80.2078508!3d27.1352427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dec2a433d71971%3A0xc3f1c8f498114f85!2s4229%20SE%20Federal%20Hwy%2C%20Stuart%2C%20FL%2034997%2C%20USA!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center mb-12">
            <span className="text-4xl font-serif font-bold tracking-tight mb-2">GENERATIONS</span>
            <span className="text-sm tracking-[0.4em] font-light text-gold">SALON</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 mb-12 text-sm tracking-widest uppercase font-medium">
            <a href="#home" className="hover:text-gold transition-colors">Home</a>
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#reviews" className="hover:text-gold transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </nav>

          <div className="w-full max-w-lg mx-auto h-px bg-white/10 mb-12" />
          
          <p className="text-gray-500 text-sm tracking-wide">
            &copy; {new Date().getFullYear()} Generations Salon. All rights reserved. 
            <br />
            Beauty is timeless.
          </p>
        </div>
      </footer>

      <AIAssistant />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default MainApp;
