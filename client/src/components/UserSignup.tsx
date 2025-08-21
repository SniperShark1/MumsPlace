import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

const UserSignup = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    username: ""
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupData) => {
      return await apiRequest("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Welcome to Mum's Space!",
        description: "Your account has been created. You'll be notified when the app launches!",
        variant: "default",
      });
      setFormData({ firstName: "", lastName: "", email: "", username: "" });
      queryClient.invalidateQueries({ queryKey: ['/api/signups'] });
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    signupMutation.mutate(formData);
  };

  const handleChange = (field: keyof SignupData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="signup" className="py-16 bg-white bg-opacity-30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mums-dark">
            Join Mum's Space Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Be among the first to join our supportive community of mothers. Create your account now and get early access when we launch!
          </p>
        </div>

        <Card className="section-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-mums-dark font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className="rounded-full border-2 border-mums-accent/20 focus:border-mums-accent"
                  data-testid="input-first-name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-mums-dark font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className="rounded-full border-2 border-mums-accent/20 focus:border-mums-accent"
                  data-testid="input-last-name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-mums-dark font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email address"
                className="rounded-full border-2 border-mums-accent/20 focus:border-mums-accent"
                data-testid="input-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-mums-dark font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="Choose a username"
                className="rounded-full border-2 border-mums-accent/20 focus:border-mums-accent"
                data-testid="input-username"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be your display name in the community
              </p>
            </div>

            <Button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full bg-mums-accent hover:bg-mums-dark text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              data-testid="button-signup"
            >
              {signupMutation.isPending ? "Creating Account..." : "Join Mum's Space"}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to be notified when Mum's Space launches. 
              We respect your privacy and won't spam you.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default UserSignup;