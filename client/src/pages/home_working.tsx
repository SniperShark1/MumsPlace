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
                  src="/logo.png" 
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
              onClick={() => document.getElementById('app-features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-mums-accent hover:bg-mums-dark text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              data-testid="button-explore-features"
              aria-label="Explore Mum's Space app features"
            >
              Explore What's Inside
            </Button>
            
            <div className="mt-8 p-4 bg-mums-light bg-opacity-50 rounded-2xl">
              <p className="text-sm md:text-base text-mums-dark font-medium">
                <strong>Important:</strong> Mum's Space is a women-only community. By joining, you affirm you are a woman/mum and agree to our community guidelines.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* App Features Section */}
      <section id="app-features" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-mums-dark">What We Offer: Real Chatrooms for Every Mum</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="order-2 lg:order-1">
                <img 
                  src="/chatroom-screenshot.png" 
                  alt="Mum's Space Chatroom Interface showing active conversations" 
                  className="w-full h-auto rounded-2xl shadow-lg border border-mums-accent border-opacity-20"
                  onError={(e) => {
                    console.error('Chatroom image failed to load:', e);
                    e.currentTarget.style.border = '2px solid red';
                  }}
                  onLoad={() => console.log('Chatroom image loaded successfully')}
                />
              </div>
              
              <div className="order-1 lg:order-2">
                <p className="text-lg mb-8 leading-relaxed text-gray-700">
                  At Mum's Space, you'll find dedicated chatrooms for every stage of your journey:
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-mums-dark mb-2">Mums to Be</h4>
                      <p className="text-gray-600 text-sm">Connect with other expecting mums, ask questions, and share your excitement (and worries!) in a private space.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-mums-dark mb-2">0–1 Years</h4>
                      <p className="text-gray-600 text-sm">Get instant support from mums going through sleepless nights, teething, and those amazing first milestones.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-mums-dark mb-2">2–5 Years</h4>
                      <p className="text-gray-600 text-sm">Share tips, triumphs, and challenges with other mums of toddlers and preschoolers.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-mums-light bg-opacity-50 rounded-xl">
                  <p className="text-sm font-medium text-mums-dark">
                    No matter your child's age or your parenting journey, there's a chatroom just for you.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-mums-dark">What Makes Mum's Space Chatroom Special?</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Private & Safe</h4>
                  <p className="text-sm text-gray-600">Only mums and women can join—no outsiders, no judgment.</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Easy to Use</h4>
                  <p className="text-sm text-gray-600">Clean, inviting design with big, soft buttons and welcoming colors.</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Real Community</h4>
                  <p className="text-sm text-gray-600">Every chatroom is filled with mums just like you—ready to listen, help, and celebrate.</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Group Support</h4>
                  <p className="text-sm text-gray-600">Create your own group for more focused conversations (playgroups, single mums, special needs, and more).</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Fun & Expressive</h4>
                  <p className="text-sm text-gray-600">Emojis and nicknames keep things light and personal.</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Exclusive Founders Chat</h4>
                  <p className="text-sm text-gray-600">Access a private chatroom reserved only for our founding members—connect with the first 100 mothers who believed in us.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;