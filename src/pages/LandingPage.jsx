import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, BarChart2, Users, Star } from 'lucide-react';



const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-800 hover:-translate-y-2">
        <div className="bg-blue-600/20 text-blue-400 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
);


const TestimonialCard = ({ name, role, children }) => (
    <div className="bg-gray-800 p-8 rounded-2xl">
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white mr-4">
                {name.charAt(0)}
            </div>
            <div>
                <p className="font-bold text-white">{name}</p>
                <p className="text-sm text-gray-400">{role}</p>
            </div>
        </div>
        <p className="text-gray-300 italic">"{children}"</p>
    </div>
);



const LandingPage = () => {
    useEffect(() => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        const toggleMenu = () => {
            mobileMenu.classList.toggle('hidden');
        };

        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', toggleMenu);
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        return () => {
            if (mobileMenuButton) {
                mobileMenuButton.removeEventListener('click', toggleMenu);
            }
        };
    }, []);

    return (
        <div className="bg-gray-900 text-white font-sans">
            
            <header className="fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-lg bg-gray-900/50 border-b border-gray-800/50">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <a href="#home" className="text-2xl font-bold tracking-wider">SyncTask</a>
                    <nav className="hidden md:flex space-x-8 items-center text-sm font-medium text-gray-300">
                        <a href="#home" className="hover:text-white transition">Home</a>
                        <a href="#features" className="hover:text-white transition">Features</a>
                        <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
                    </nav>
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/login" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition">Login</Link>
                        <Link to="/register" className="px-5 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-500 transition shadow-lg shadow-blue-600/20">Register</Link>
                    </div>
                    <button id="mobile-menu-button" className="md:hidden p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                <div id="mobile-menu" className="hidden md:hidden">
                    <a href="#home" className="block p-4 hover:bg-gray-800">Home</a>
                    <a href="#features" className="block p-4 hover:bg-gray-800">Features</a>
                    <a href="#testimonials" className="block p-4 hover:bg-gray-800">Testimonials</a>
                    <div className="p-4 border-t border-gray-700 flex flex-col gap-2">
                        <Link to="/login" className="block w-full text-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">Login</Link>
                        <Link to="/register" className="block w-full text-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition">Register</Link>
                    </div>
                </div>
            </header>

            <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden p-4">
                <div className="absolute inset-0 bg-gray-900">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-blue-900/50 to-purple-900/50 animate-gradient-xy"></div>
                </div>
                <div className="relative z-10 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Synchronize Your Success with SyncTask
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        The ultimate platform for seamless task management and team collaboration. Turn your goals into achievements.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition transform hover:scale-105">
                            Get Started for Free
                        </Link>
                    </div>
                
                    <div className="mt-16 w-full max-w-2xl mx-auto p-2 rounded-xl bg-gray-800/50 border border-gray-700/50 shadow-2xl">
                        <div className="h-8 bg-gray-700 rounded-t-lg flex items-center px-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="p-6 bg-gray-900/80 rounded-b-lg">
                            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
                            <div className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse delay-75"></div>
                            <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse delay-150"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-24 bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white">Powerful Features for Peak Performance</h2>
                        <p className="text-gray-400 mt-2">Everything you need to keep your team aligned and productive.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard icon={<CheckCircle size={28} />} title="Real-time Collaboration">
                            Work together with your team in real-time. See updates as they happen and keep everyone in sync.
                        </FeatureCard>
                        <FeatureCard icon={<BarChart2 size={28} />} title="Advanced Task Tracking">
                            Monitor progress with detailed task tracking, including statuses, deadlines, and assignments.
                        </FeatureCard>
                        <FeatureCard icon={<Users size={28} />} title="Insightful Analytics">
                            Gain valuable insights into your team's productivity with our comprehensive analytics dashboard.
                        </FeatureCard>
                    </div>
                </div>
            </section>

            
            <section id="testimonials" className="py-24 bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white">Loved by Teams Worldwide</h2>
                        <p className="text-gray-400 mt-2">Don't just take our word for it. Here's what our users say.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <TestimonialCard name="Sarah J." role="Project Manager">
                            "SyncTask has revolutionized how our team works. The real-time updates and clear interface have boosted our productivity by over 40%!"
                        </TestimonialCard>
                        <TestimonialCard name="Mike R." role="Lead Developer">
                            "As a developer, I appreciate tools that just work. SyncTask is intuitive, fast, and has all the features we need without the bloat."
                        </TestimonialCard>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Boost Your Productivity?</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join thousands of teams who are achieving their goals faster with SyncTask. Sign up today and get started in minutes.</p>
                    <Link to="/register" className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
                        Sign Up Now - It's Free
                    </Link>
                </div>
            </section>

          
            <footer className="bg-gray-900 border-t border-gray-800 py-8">
                <div className="container mx-auto text-center text-gray-500 text-sm">
                    <p>&copy; 2024 SyncTask. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

