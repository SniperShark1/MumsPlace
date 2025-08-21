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

      <Footer />
    </div>
  );
};

export default Home;