/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Filter, 
  ChevronRight, 
  Info, 
  ExternalLink, 
  CheckCircle2, 
  Users, 
  Heart,
  Globe,
  Building2,
  Backpack,
  ArrowRight,
  Download,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { SDGS, BANGLADESH_DISTRICTS } from './constants.ts';
import { MOCK_NGOS, MOCK_VOLUNTEER_OPPS, MOCK_USER_CONTRIBUTIONS } from './data.ts';
import { FilterState, NGO, VolunteerOpportunity, VolunteerContribution } from './types.ts';

const PARTNERS = [
  { name: 'UNDP' },
  { name: 'EU' },
  { name: 'Embassy of Netherlands' },
  { name: 'Embassy of Sweden' },
  { name: 'Embassy of Switzerland' },
  { name: 'YY Venture' },
  { name: 'Orange Corner Bangladesh' }
];

const OrgLogo = ({ logo, name, color, bg, text, logoUrl, className = "" }: { logo?: string, name: string, color?: string, bg?: string, text?: string, logoUrl?: string, className?: string }) => {
  const firstLetter = logo || name.charAt(0);
  const style = {
    backgroundColor: bg || '#FFFFFF',
    color: text || color || '#006A4E',
    borderColor: bg ? 'transparent' : '#F3F4F6'
  };
  return (
    <div 
      className={`flex-shrink-0 flex items-center justify-center rounded-xl font-bold border shadow-sm overflow-hidden ${className}`}
      style={style}
    >
      {logoUrl ? (
        <img src={logoUrl} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      ) : (
        firstLetter
      )}
    </div>
  );
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>({
    sdg: null,
    district: '',
    search: ''
  });

  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [isDonating, setIsDonating] = useState(false);
  const [isVolunteering, setIsVolunteering] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [footerDetail, setFooterDetail] = useState<{ title: string; content: string } | null>(null);
  const [showVolunteerForm, setShowVolunteerForm] = useState<VolunteerOpportunity | null>(null);

  const totalImpactHours = useMemo(() => 
    MOCK_USER_CONTRIBUTIONS.reduce((sum, item) => sum + item.hours, 0), []
  );

  const downloadImpactReport = () => {
    const content = MOCK_USER_CONTRIBUTIONS.map(c => 
      `${c.date}: ${c.role} at ${c.ngoName} (${c.projectName}) - ${c.hours} hours`
    ).join('\n');
    const blob = new Blob([`JATRA CONNECT IMPACT REPORT\nTotal Hours: ${totalImpactHours}\n\n${content}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jatra_connect_impact_report.txt';
    link.click();
  };

  const filteredNGOs = useMemo(() => {
    return MOCK_NGOS.filter((ngo) => {
      const matchSearch = ngo.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          ngo.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchDistrict = !filters.district || ngo.district === filters.district;
      const matchSDG = filters.sdg === null || ngo.sdgs.includes(filters.sdg);
      return matchSearch && matchDistrict && matchSDG;
    });
  }, [filters]);

  const resetFilters = () => setFilters({ sdg: null, district: '', search: '' });

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#006A4E] rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              J
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Jatra Connect</h1>
              <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Collective Impact</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setFooterDetail({ title: 'About Network', content: 'Jatra Connect is a unified NGO network dedicated to transparency and collective impact in Bangladesh.' })} className="text-sm font-medium text-gray-600 hover:text-black">About Network</button>
            <button onClick={() => setFooterDetail({ title: 'Register NGO', content: 'Apply to join the Jatra Connect network. Our verification process ensures credibility for donors and partners.' })} className="text-sm font-medium text-gray-600 hover:text-black">Register NGO</button>
            <button 
              onClick={() => setIsDashboardOpen(true)}
              className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Impact Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full mb-6 border border-green-100">
                Unified NGO Hub of Bangladesh
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-medium leading-[0.95] mb-6">
                Connecting those who <span className="italic text-[#006A4E]">Care</span> with those who <span className="italic text-[#006A4E]">Act</span>.
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mb-8 leading-relaxed">
                A definitive directory of every NGO, community project, and student initiative across Bangladesh. Search by SDG, location, and mission.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIsDonating(true)}
                  className="flex items-center gap-2 bg-[#006A4E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#005a42] transition-transform active:scale-95 shadow-xl shadow-green-900/10"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  Donate & Support
                </button>
                <button 
                  onClick={() => setIsVolunteering(true)}
                  className="flex items-center gap-2 bg-white border border-gray-200 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-transform active:scale-95"
                >
                  <Users className="w-5 h-5" />
                  Volunteer Now
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block relative"
            >
              <div className="aspect-square bg-gray-50 rounded-[40px] flex flex-col p-8 border border-gray-100">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-500 uppercase text-xs tracking-widest">Global Goals</h3>
                  <Globe className="w-4 h-4 text-gray-300" />
                </div>
                <div className="grid grid-cols-4 gap-2 flex-1">
                  {SDGS.slice(0, 16).map(sdg => (
                    <div 
                      key={sdg.id} 
                      className="rounded-lg shadow-sm flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: sdg.color }}
                      title={sdg.name}
                    >
                      {sdg.id}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-gray-600">Join 12,000+ Jatra Connect members</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Partners Ribbon - Floating/Marquee */}
          <div className="bg-gray-50/50 py-8 border-t border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-4">
               <p className="text-center text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">Supporting Development Partners</p>
            </div>
            <div className="flex w-full overflow-hidden whitespace-nowrap">
              <motion.div 
                className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...PARTNERS, ...PARTNERS].map((p, idx) => (
                  <button 
                    key={`${p.name}-${idx}`} 
                    onClick={() => setFooterDetail({ title: p.name, content: `${p.name} is a key international partner supporting humanitarian and development efforts in Bangladesh.` })}
                    className="flex items-center gap-4 hover:scale-105 transition-transform"
                  >
                    <span className="font-display font-extrabold text-xl md:text-3xl text-gray-300 hover:text-gray-900 transition-colors">
                      {p.name}
                    </span>
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Discovery Filter UI */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 mb-12">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search by NGO name, mission, or keyword..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>
              <div className="relative md:w-64">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select 
                  value={filters.district}
                  onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Regions</option>
                  {BANGLADESH_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2">
                  <Filter className="w-4 h-4 text-green-600" />
                  Filter by SDG Goals
                </h3>
                {filters.sdg !== null && (
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, sdg: null }))}
                    className="text-sm font-medium text-green-600 hover:underline"
                  >
                    Clear Goal
                  </button>
                )}
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar">
                {SDGS.map(sdg => (
                  <button
                    key={sdg.id}
                    onClick={() => setFilters(prev => ({ ...prev, sdg: prev.sdg === sdg.id ? null : sdg.id }))}
                    style={{ 
                      backgroundColor: filters.sdg === sdg.id ? sdg.color : 'transparent',
                      borderColor: filters.sdg === sdg.id ? sdg.color : '#E5E7EB',
                      color: filters.sdg === sdg.id ? 'white' : '#4B5563'
                    }}
                    className={`flex-shrink-0 px-6 py-3 rounded-full border text-sm font-semibold transition-all hover:shadow-md ${
                      filters.sdg === sdg.id ? 'shadow-lg' : 'bg-white'
                    }`}
                  >
                    {sdg.id}. {sdg.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NGO List */}
        <section className="py-16 bg-[#FBFBF9]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-2xl font-display font-medium">
                Found <span className="text-[#006A4E] font-bold">{filteredNGOs.length}</span> Organizations
              </h4>
            </div>

            {filteredNGOs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNGOs.map(ngo => (
                  <motion.div
                    layout
                    key={ngo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <OrgLogo logo={ngo.logo} name={ngo.name} color={ngo.color} logoUrl={ngo.logoUrl} className="w-14 h-14 text-lg" />
                      {ngo.isVerified && (
                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-green-100">
                          <CheckCircle2 className="w-3 h-3" />
                          VERIFIED
                        </div>
                      )}
                    </div>

                    <h5 className="text-xl font-bold mb-2 group-hover:text-[#006A4E] transition-colors">{ngo.name}</h5>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                      {ngo.description}
                    </p>

                    <div className="mt-auto space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {ngo.sdgs.map(sdgId => {
                          const sdg = SDGS.find(s => s.id === sdgId);
                          return (
                            <span 
                              key={sdgId} 
                              className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600"
                              title={sdg?.name}
                            >
                              SDG {sdgId}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                          <MapPin className="w-3 h-3" />
                          {ngo.district}
                        </div>
                        <button 
                          onClick={() => setSelectedNGO(ngo)}
                          className="text-sm font-bold text-[#006A4E] flex items-center group-hover:translate-x-1 transition-transform"
                        >
                          Details <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center py-20">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h5 className="text-xl font-bold mb-2">No matching organizations</h5>
                <p className="text-gray-500 mb-8">We couldn't find any NGO or project matching your current filters. Try resetting or adjusting your search.</p>
                <button 
                  onClick={resetFilters}
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#006A4E] rounded-lg flex items-center justify-center text-white font-bold">J</div>
                <h2 className="font-bold text-xl tracking-tight">Jatra Connect</h2>
              </div>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                The unified platform for social impact in Bangladesh. Supporting small community projects and large NGOs alike to build a better future together.
              </p>
            </div>
            <div>
              <h6 className="font-bold text-sm uppercase tracking-widest mb-6">Explore Impact</h6>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><button onClick={() => setFooterDetail({ title: 'Global Funding', content: 'Our network attracts global funding from international development agencies to support local grassroots projects.' })} className="hover:text-black transition-colors">Global Funding</button></li>
                <li><button onClick={() => setFooterDetail({ title: 'Embassy Support', content: 'We work closely with the Embassies of the Netherlands, Sweden, and Switzerland to align with diplomatic development goals.' })} className="hover:text-black transition-colors">Embassy Support</button></li>
                <li><button onClick={() => setFooterDetail({ title: 'UNDP Projects', content: 'Many projects in our network are part of the UNDP Sustainable Development framework in Bangladesh.' })} className="hover:text-black transition-colors">UNDP Projects</button></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-sm uppercase tracking-widest mb-6">Organization</h6>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><button onClick={() => setFooterDetail({ title: 'Relationship', content: 'Jatra Connect fosters deep relationships between NGOs, community leaders, and international donors.' })} className="hover:text-black transition-colors">Relationship</button></li>
                <li><button onClick={() => setFooterDetail({ title: 'Transparency', content: 'Transparency is our core value. Every donation and impact report is fully verifiable through the Jatra Connect platform.' })} className="hover:text-black transition-colors">Transparency</button></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <p>© 2026 Jatra Connect, Bangladesh. All rights Reserved.</p>
            <div className="flex flex-wrap gap-8 mt-4 md:mt-0">
              <button 
                onClick={() => setFooterDetail({ 
                  title: 'About Jatra Connect', 
                  content: "Many people want to begin volunteering for the first time in their lives, but they struggle to find opportunities through Facebook groups or other platforms that don't accommodate their specific time and location. After one or two attempts, they often get frustrated and decide not to volunteer at all.\n\nWhat if they could find every volunteering opportunity in one website and one place where they can see the time, location, and specific tasks required? This would encourage them to contribute more to Bangladesh, the economy, and the community.\n\nAdditionally, some people want to contribute but cannot find a trusted agent. By finding these projects through this website, it will: 1. Build trust, 2. Help projects grow, 3. Assist NGOs in securing funds, and 4. Allow people to get help directly." 
                })} 
                className="hover:text-black text-green-700 font-extrabold"
              >
                About
              </button>
              <button onClick={() => setFooterDetail({ title: 'Privacy Policy', content: 'Your data is secured with enterprise-grade encryption. We never share donor details with third parties without consent.' })} className="hover:text-black">Privacy</button>
              <button onClick={() => setFooterDetail({ title: 'Terms of Use', content: 'By using Jatra Connect, you agree to our community guidelines and code of conduct for social impact.' })} className="hover:text-black">Terms</button>
              <button onClick={() => setFooterDetail({ title: 'Transparency Report', content: 'Read our annual transparency report on network growth and impact metrics.' })} className="hover:text-black">Transparency</button>
              <button onClick={() => setFooterDetail({ title: 'Relationship Disclosure', content: 'Jatra Connect maintains impartial relationships with all registered NGOs and community projects.' })} className="hover:text-black">Relationship</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal - Details */}
      <AnimatePresence>
        {isDonating && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDonating(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-[10%_20%] lg:inset-[15%_30%] bg-white z-[101] rounded-[32px] p-8 md:p-12 shadow-2xl flex flex-col overflow-hidden"
            >
              <h3 className="text-3xl font-display font-bold mb-2">Support the Cause</h3>
              <p className="text-gray-500 mb-8">Choose your preferred secure payment method to donate directly to verified projects.</p>
              
              <div className="grid grid-cols-2 gap-4 h-full overflow-y-auto pr-2 custom-scrollbar">
                {[
                  { name: 'bKash', color: '#D12053', icon: '৳' },
                  { name: 'Visa', color: '#1A1F71', icon: 'V' },
                  { name: 'Google Pay', color: '#4285F4', icon: 'G' },
                  { name: 'Stripe', color: '#635BFF', icon: 'S' },
                  { name: 'PayPal', color: '#003087', icon: 'P' },
                  { name: 'Nagad', color: '#F7941D', icon: 'N' },
                  { name: 'Mastercard', color: '#EB001B', icon: 'M' },
                  { name: 'Rocket', color: '#8E248D', icon: 'R' }
                ].map((method) => (
                  <button 
                    key={method.name}
                    className="p-6 border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-green-500 hover:bg-green-50/30 transition-all group"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: method.color }}
                    >
                      {method.icon}
                    </div>
                    <span className="font-bold text-sm text-gray-700">{method.name}</span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setIsDonating(false)}
                className="mt-8 w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </>
        )}

        {isVolunteering && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsVolunteering(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
            />
            <motion.div 
              initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
              className="fixed inset-4 md:inset-[5%] bg-white z-[101] rounded-[32px] p-8 md:p-12 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-display font-bold mb-2">Volunteer Opportunities</h3>
                  <p className="text-gray-500 italic">Open positions across our network projects.</p>
                </div>
                <button onClick={() => setIsVolunteering(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <Filter className="w-6 h-6 rotate-45 text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
                {MOCK_VOLUNTEER_OPPS.map((opp) => (
                  <div key={opp.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">{opp.type}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{opp.ngoName}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{opp.title}</h4>
                    <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">{opp.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <MapPin className="w-3 h-3" /> {opp.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Info className="w-3 h-3" /> {opp.date} | {opp.time}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowVolunteerForm(opp)}
                      className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:border-[#006A4E] hover:text-[#006A4E] transition-all"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {showVolunteerForm && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowVolunteerForm(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-[15%] md:inset-x-[30%] bg-white z-[201] rounded-3xl p-8 shadow-2xl flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-2">Apply for {showVolunteerForm.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{showVolunteerForm.ngoName} • {showVolunteerForm.location}</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Application sent successfully!'); setShowVolunteerForm(null); }}>
                <input type="text" placeholder="Full Name" required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-green-500" />
                <input type="email" placeholder="Email Address" required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-green-500" />
                <input type="tel" placeholder="Phone Number" required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-green-500" />
                <textarea placeholder="Why do you want to join?" rows={3} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-green-500" />
                <div className="flex gap-4 mt-4">
                  <button type="button" onClick={() => setShowVolunteerForm(null)} className="flex-1 py-3 font-bold text-gray-400">Cancel</button>
                  <button type="submit" className="flex-[2] py-3 bg-[#006A4E] text-white rounded-xl font-bold hover:bg-[#005a42]">Submit Application</button>
                </div>
              </form>
            </motion.div>
          </>
        )}

        {footerDetail && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFooterDetail(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300]" 
            />
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-4 bottom-8 md:inset-x-auto md:right-8 md:w-[400px] bg-white z-[301] rounded-2xl p-8 shadow-2xl border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{footerDetail.title}</h3>
                <button onClick={() => setFooterDetail(null)} className="text-gray-400 hover:text-black">
                   <Filter className="w-4 h-4 rotate-45" />
                </button>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm mb-6">{footerDetail.content}</p>
              <button 
                onClick={() => setFooterDetail(null)}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm"
              >
                Got it
              </button>
            </motion.div>
          </>
        )}

        {isDashboardOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDashboardOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400]" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-[5%_10%] lg:inset-[10%_20%] bg-white z-[401] rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-8 md:p-12 overflow-y-auto h-full custom-scrollbar">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-4xl font-display font-bold mb-2">My Impact</h2>
                    <p className="text-gray-500">Your journey through the Jatra Connect network since joining.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                       <button title="Share on Facebook" className="p-2 bg-[#1877F2]/10 text-[#1877F2] rounded-full hover:bg-[#1877F2] hover:text-white transition-colors"><Facebook className="w-5 h-5" /></button>
                       <button title="Share on Instagram" className="p-2 bg-[#E4405F]/10 text-[#E4405F] rounded-full hover:bg-[#E4405F] hover:text-white transition-colors"><Instagram className="w-5 h-5" /></button>
                       <button title="Share on LinkedIn" className="p-2 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full hover:bg-[#0A66C2] hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></button>
                    </div>
                    <button 
                      onClick={() => setIsDashboardOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Filter className="w-6 h-6 rotate-45 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-green-50 rounded-3xl p-8 border border-green-100">
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-2">Total Contributions</p>
                    <div className="flex items-end gap-3">
                       <h4 className="text-6xl font-display font-bold text-green-900">{MOCK_USER_CONTRIBUTIONS.length}</h4>
                       <span className="text-green-700 font-bold mb-2 text-sm italic">Projects</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">Time Dedicated</p>
                    <div className="flex items-end gap-3">
                       <h4 className="text-6xl font-display font-bold text-blue-900">{totalImpactHours}</h4>
                       <span className="text-blue-700 font-bold mb-2 text-sm italic">Hours</span>
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100 flex flex-col justify-center">
                    <button 
                      onClick={downloadImpactReport}
                      className="flex items-center justify-center gap-3 bg-white border border-orange-200 py-4 rounded-2xl font-bold text-orange-700 hover:bg-orange-100 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download Report
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h5 className="font-bold text-lg border-b border-gray-100 pb-4">Contribution History</h5>
                  {MOCK_USER_CONTRIBUTIONS.map((c) => (
                    <div key={c.id} className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                      <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <OrgLogo 
                          name={c.ngoName} 
                          color={MOCK_NGOS.find(n => n.name === c.ngoName)?.color} 
                          logoUrl={MOCK_NGOS.find(n => n.name === c.ngoName)?.logoUrl}
                          className="w-12 h-12 text-sm shadow-sm" 
                        />
                        <div>
                          <h6 className="font-bold text-gray-900">{c.projectName}</h6>
                          <p className="text-xs text-gray-400 font-medium">{c.ngoName} • {c.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-12 text-right">
                        <div>
                          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none">Date</p>
                          <p className="font-bold text-sm text-gray-700">{c.date}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none">Duration</p>
                          <p className="font-bold text-sm text-gray-700">{c.hours} hrs</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {selectedNGO && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNGO(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed inset-4 md:inset-[10%] lg:inset-[15%_25%] bg-white z-[101] rounded-[32px] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="h-4 w-full" style={{ backgroundColor: SDGS.find(s => s.id === selectedNGO.sdgs[0])?.color || '#006A4E' }} />
              <div className="overflow-y-auto p-8 md:p-12 h-full">
                <button 
                  onClick={() => setSelectedNGO(null)}
                  className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Filter className="w-6 h-6 rotate-45" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{selectedNGO.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{selectedNGO.district}</span>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <OrgLogo logo={selectedNGO.logo} name={selectedNGO.name} color={selectedNGO.color} logoUrl={selectedNGO.logoUrl} className="w-20 h-20 text-2xl border-2" />
                  <h3 className="text-4xl font-display font-bold">{selectedNGO.name}</h3>
                </div>
                
                <div className="prose prose-sm max-w-none text-gray-600 mb-8 leading-relaxed">
                  <p>{selectedNGO.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                       <Globe className="w-4 h-4 text-blue-500" />
                       Primary SDG Goals
                    </h4>
                    <div className="space-y-4">
                      {selectedNGO.sdgs.map(id => {
                        const sdg = SDGS.find(s => s.id === id);
                        return (
                          <div key={id} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: sdg?.color }}>
                              {id}
                            </div>
                            <span className="text-xs font-semibold text-gray-700">{sdg?.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                         <Info className="w-4 h-4 text-orange-500" />
                         Impact Location
                      </h4>
                      <p className="text-sm font-medium text-gray-600 mb-2">{selectedNGO.location}</p>
                      <p className="text-xs text-gray-400 italic">Operating in {selectedNGO.district} District</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-gray-200">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2">Network Status</p>
                      <div className="flex items-center gap-2 text-green-700 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        Official Jatra Connect Registered NGO
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  {selectedNGO.website && (
                    <a 
                      href={selectedNGO.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button className="flex-1 bg-[#006A4E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#005a42]">
                    Register Interest <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

