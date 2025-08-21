import { Smartphone, Monitor, Download, Heart, Users, Lock, CheckCircle, BookOpen, Clock, Mail, Star, Crown, Facebook } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeartBackground from "@/components/HeartBackground";
import storiesImage from "@assets/stories-updated.png";
import debatesImage from "@assets/debates-new.png";
import guidesImage from "@assets/Screenshot_14_1755234349059.png";
import mealPlannerImage from "@assets/Screenshot_21_1755234508674.png";
import contractionTrackerImage from "@assets/Screenshot_18_1755234564029.png";
import feedingTrackerImage from "@assets/Screenshot_20_1755234646909.png";
import mumsToBeImage from "@assets/mums-to-be-final.png";
import stage01Image from "@assets/zero-one-new.png";
import stage25Image from "@assets/two-five-updated.png";
import reviewsImage from "@assets/Screenshot_36_1755235233351.png";
import downloadImage from "@assets/Screenshot_37_1755235284470.png";
import babyIsHereImage from "@assets/Screenshot_38_1755235350831.png";
import communityMothersImage from "@assets/community-mothers.png";
import foundersImage from "@assets/Screenshot_33_1755718284955.png";
import logo2Image from "@assets/logo2_1755761390516.png";

import NewsletterSignup from "@/components/NewsletterSignup";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { DownloadStats } from "@shared/schema";

const Home = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: downloadStats } = useQuery<DownloadStats[]>({
    queryKey: ['/api/download-stats'],
  });

  const downloadMutation = useMutation({
    mutationFn: async (platform: string) => {
      const response = await fetch(`/api/download/${platform}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Download failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/download-stats'] });
    },
  });

  const totalDownloads = downloadStats?.reduce((sum, stat) => sum + stat.downloadCount, 0) || 0;

  const handleDownload = async (platform: string) => {
    toast({
      title: "App Not Ready Yet",
      description: "Our app is still in development. Join our newsletter to be notified when it launches!",
      variant: "default",
    });
    
    setTimeout(() => {
      document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-mums-pink">
      <Navigation />
      
      {/* Home Section */}
      <section id="home" className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo Section with Hearts */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <HeartBackground />
              <div className="w-64 md:w-80 h-auto mx-auto relative z-10">
                <img 
                  src={logo2Image}
                  alt="Mum's Space Logo - Mother and baby in heart shape" 
                  className="w-full h-auto filter drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <Card className="section-card rounded-3xl p-8 md:p-12 text-center shadow-xl max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mums-dark">Welcome to Mum's Space</h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">The private support space for mums and women—by mums, for mums. Connect, share, and find your community in a safe, supportive environment.</p>
            
            <Button 
              onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-mums-accent hover:bg-mums-dark text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              data-testid="button-explore-features"
              aria-label="Download Mum's Space app"
            >
              Get The App
            </Button>
            
            <div className="mt-8 p-4 bg-mums-light bg-opacity-50 rounded-2xl">
              <p className="text-sm md:text-base text-mums-dark font-medium">
                <strong>Important:</strong> Mum's Space is a women-only community. By joining, you affirm you are a woman/mum and agree to our community guidelines.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mums-dark">Download Mum's Space</h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700">Get instant access to our supportive community on your preferred device.</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-mums-light bg-opacity-50 rounded-2xl">
                <Smartphone className="w-16 h-16 mx-auto mb-4 text-mums-accent" />
                <h3 className="text-xl font-semibold mb-3 text-mums-dark">iPhone</h3>
                <Button 
                  onClick={() => handleDownload('ios')}
                  className="w-full bg-mums-accent hover:bg-mums-dark text-white"
                  data-testid="button-download-ios"
                >
                  Download for iOS
                </Button>
              </div>
              
              <div className="text-center p-6 bg-mums-light bg-opacity-50 rounded-2xl">
                <Smartphone className="w-16 h-16 mx-auto mb-4 text-mums-accent" />
                <h3 className="text-xl font-semibold mb-3 text-mums-dark">Android</h3>
                <Button 
                  onClick={() => handleDownload('android')}
                  className="w-full bg-mums-accent hover:bg-mums-dark text-white"
                  data-testid="button-download-android"
                >
                  Download for Android
                </Button>
              </div>
              
              <div className="text-center p-6 bg-mums-light bg-opacity-50 rounded-2xl">
                <Monitor className="w-16 h-16 mx-auto mb-4 text-mums-accent" />
                <h3 className="text-xl font-semibold mb-3 text-mums-dark">PC</h3>
                <Button 
                  onClick={() => handleDownload('pc')}
                  className="w-full bg-mums-accent hover:bg-mums-dark text-white"
                  data-testid="button-download-pc"
                >
                  Download for PC
                </Button>
              </div>
            </div>
            
            {totalDownloads > 0 && (
              <div className="text-center mt-6 p-4 bg-mums-accent bg-opacity-10 rounded-xl">
                <p className="text-mums-dark font-semibold">
                  <Download className="inline w-5 h-5 mr-2" />
                  {totalDownloads} downloads so far!
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-mums-dark">About Mum's Space</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-mums-dark">Our Mission</h3>
                <p className="text-lg mb-6 leading-relaxed text-gray-700">
                  Mum's Space was created by mums, for mums. We understand the unique challenges, joys, and questions that come with motherhood because we've been there too.
                </p>
                <p className="text-lg mb-6 leading-relaxed text-gray-700">
                  Our platform provides a safe, private space where women can connect, share experiences, ask questions, and support each other through every stage of the parenting journey.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-mums-accent mt-1 flex-shrink-0" />
                    <p className="text-gray-700">100% women-only community</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-mums-accent mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Private and secure environment</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-mums-accent mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Real support from real mums</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <img 
                  src={logo2Image}
                  alt="Mum's Space Community" 
                  className="w-full max-w-sm mx-auto"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Explore Mums Space Section - Library Features */}
      <section id="library" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mums-dark">Explore Mum's Space</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover all the features designed specifically to support you through your motherhood journey.
            </p>
          </div>

          {/* Feature showcase with alternating layout */}
          <div className="space-y-16">
            {/* Stories Feature */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-mums-dark">Share Your Stories</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Connect with other mums by sharing your experiences, milestones, and daily moments. Every story matters in our supportive community.
                </p>
              </div>
              <div>
                <img 
                  src={storiesImage}
                  alt="Mum's Space Stories Feature" 
                  className="w-full h-auto rounded-2xl shadow-lg border border-mums-accent border-opacity-20"
                />
              </div>
            </div>

            {/* Community Discussions */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src={debatesImage}
                  alt="Community Discussions in Mum's Space" 
                  className="w-full h-auto rounded-2xl shadow-lg border border-mums-accent border-opacity-20"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold mb-4 text-mums-dark">Join Discussions</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Participate in meaningful conversations about parenting topics that matter to you. Get advice and share your wisdom with fellow mums.
                </p>
              </div>
            </div>

            {/* Expert Guides */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-mums-dark">Expert Guides</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Access professionally written guides covering everything from pregnancy to toddler care, all reviewed by medical experts.
                </p>
              </div>
              <div>
                <img 
                  src={guidesImage}
                  alt="Expert Parenting Guides" 
                  className="w-full h-auto rounded-2xl shadow-lg border border-mums-accent border-opacity-20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300 mb-6">
                <Crown className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-semibold text-yellow-700">Limited Time Offer</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mums-dark">Join Our Founders Club</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Be among the first 100 founding members and get lifetime access for just $59.99 AUD
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
                  <h3 className="text-2xl font-bold text-yellow-800 mb-4">Founders Benefits</h3>
                  <ul className="space-y-3 text-yellow-700">
                    <li className="flex items-start space-x-3">
                      <Crown className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Lifetime access to all premium features</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Crown className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Exclusive founders-only chatroom</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Crown className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Your name on our Wall of Founders</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Crown className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Early access to new features</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-mums-dark mb-2">$59.99 AUD</div>
                  <div className="text-sm text-gray-500 mb-4">One-time payment • Lifetime access</div>
                  <Button 
                    onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full text-lg"
                    data-testid="button-join-founders"
                  >
                    Join Founders Club
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Limited to 100 members</p>
                </div>
              </div>
              
              <div>
                <img 
                  src={foundersImage}
                  alt="Mum's Space Founders Club" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mums-dark">Stay Connected</h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700">
              Be the first to know when our app launches and get exclusive updates from the Mum's Space community.
            </p>
            <NewsletterSignup />
            
            <div className="mt-8 flex justify-center">
              <a 
                href="https://www.facebook.com/profile.php?id=61571008256753" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Follow us on Facebook
              </a>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;