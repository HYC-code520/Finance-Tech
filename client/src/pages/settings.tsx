import React, { useState, useRef, useEffect } from "react";
import { User, Bell, Shield, Key, Palette, Database, Save, Camera } from "lucide-react";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Particle interface for background animation
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  update(): void;
  draw(): void;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [userSettings, setUserSettings] = useState({
    name: "Sofia Chen",
    email: "sofia.chen@spglobal.com",
    role: "AI Product Specialist",
    notifications: {
      email: true,
      push: true,
      sms: false,
      weeklyReport: true,
    },
    privacy: {
      profileVisible: true,
      activityTracking: false,
      dataSharing: false,
    },
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation effect - similar to dashboard
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 25;
    let animationId: number;

    class ParticleImpl implements Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      color: string = '';

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 10;
        this.speedX = (Math.random() - 0.5) * 12;
        this.speedY = (Math.random() - 0.5) * 12;
        const r = Math.floor(Math.random() * 100) + 100;
        const g = Math.floor(Math.random() * 100) + 150;
        const b = Math.floor(Math.random() * 55) + 200;
        const a = Math.random() * 0.2 + 0.05;
        this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new ParticleImpl());
    }

    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime: number) {
      if (!ctx || !canvas) return;
      
      if (currentTime - lastTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setUserSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const settingsSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "account", label: "Account", icon: Key },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data Management", icon: Database },
  ];

  const renderProfileSection = () => (
    <Card className="bg-[#092946]/50 border-[#71FDFF]/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Profile Information</CardTitle>
        <CardDescription className="text-gray-300">
          Update your personal information and profile settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-[#041420] text-accent-cyan text-lg font-medium">
              SC
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" className="bg-[#092946]/50 border-[#71FDFF]/30 text-white hover:bg-[#71FDFF]/10">
              <Camera className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
            <p className="text-sm text-gray-400 mt-1">JPG, PNG or GIF. Max size 5MB.</p>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              id="name"
              value={userSettings.name}
              onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
              className="bg-[#092946]/80 border-[#71FDFF]/30 text-white placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={userSettings.email}
              onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
              className="bg-[#092946]/80 border-[#71FDFF]/30 text-white placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-white">Job Title</Label>
            <Input
              id="role"
              value={userSettings.role}
              onChange={(e) => setUserSettings(prev => ({ ...prev, role: e.target.value }))}
              className="bg-[#092946]/80 border-[#71FDFF]/30 text-white placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department" className="text-white">Department</Label>
            <Input
              id="department"
              placeholder="Product Management"
              className="bg-[#092946]/80 border-[#71FDFF]/30 text-white placeholder:text-gray-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderNotificationsSection = () => (
    <Card className="bg-[#092946]/50 border-[#71FDFF]/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Notification Preferences</CardTitle>
        <CardDescription className="text-gray-300">
          Choose how you want to be notified about updates and activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {Object.entries(userSettings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="text-white text-base">
                  {key === 'email' && 'Email Notifications'}
                  {key === 'push' && 'Push Notifications'}
                  {key === 'sms' && 'SMS Notifications'}
                  {key === 'weeklyReport' && 'Weekly Reports'}
                </Label>
                <p className="text-sm text-gray-400">
                  {key === 'email' && 'Receive notifications via email'}
                  {key === 'push' && 'Receive push notifications in browser'}
                  {key === 'sms' && 'Receive SMS notifications on your phone'}
                  {key === 'weeklyReport' && 'Get weekly summary reports'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => handleSettingChange('notifications', key, checked)}
                className="data-[state=checked]:bg-accent-cyan"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderPrivacySection = () => (
    <Card className="bg-[#092946]/50 border-[#71FDFF]/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Privacy & Security</CardTitle>
        <CardDescription className="text-gray-300">
          Manage your privacy settings and data sharing preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {Object.entries(userSettings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="text-white text-base">
                  {key === 'profileVisible' && 'Public Profile'}
                  {key === 'activityTracking' && 'Activity Tracking'}
                  {key === 'dataSharing' && 'Data Sharing'}
                </Label>
                <p className="text-sm text-gray-400">
                  {key === 'profileVisible' && 'Allow others to see your profile information'}
                  {key === 'activityTracking' && 'Track your activity for analytics'}
                  {key === 'dataSharing' && 'Share anonymized data for product improvement'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => handleSettingChange('privacy', key, checked)}
                className="data-[state=checked]:bg-accent-cyan"
              />
            </div>
          ))}
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-3">
          <h4 className="text-white font-medium">Password & Authentication</h4>
          <div className="space-y-2">
            <Button variant="outline" className="bg-[#092946]/50 border-[#71FDFF]/30 text-white hover:bg-[#71FDFF]/10">
              Change Password
            </Button>
            <Button variant="outline" className="bg-[#092946]/50 border-[#71FDFF]/30 text-white hover:bg-[#71FDFF]/10 ml-2">
              Setup 2FA
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAccountSection = () => (
    <Card className="bg-[#092946]/50 border-[#71FDFF]/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Account Management</CardTitle>
        <CardDescription className="text-gray-300">
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-white text-base">Account Status</Label>
            <p className="text-accent-cyan text-sm">Active - Premium Plan</p>
          </div>
          
          <div>
            <Label className="text-white text-base">Member Since</Label>
            <p className="text-gray-300 text-sm">January 15, 2024</p>
          </div>

          <div>
            <Label className="text-white text-base">Last Login</Label>
            <p className="text-gray-300 text-sm">Today at 2:34 PM</p>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-3">
          <h4 className="text-white font-medium">Danger Zone</h4>
          <div className="space-y-2">
            <Button variant="outline" className="bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/30">
              Export Data
            </Button>
            <Button variant="outline" className="bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/30 ml-2">
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "account":
        return renderAccountSection();
      case "appearance":
        return (
          <Card className="bg-[#092946]/50 border-[#71FDFF]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Appearance</CardTitle>
              <CardDescription className="text-gray-300">
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">Theme customization options coming soon...</p>
            </CardContent>
          </Card>
        );
      case "data":
        return (
          <Card className="bg-[#092946]/50 border-[#71FDFF]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Data Management</CardTitle>
              <CardDescription className="text-gray-300">
                Manage your data storage and export options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white">Data management features coming soon...</p>
            </CardContent>
          </Card>
        );
      default:
        return renderProfileSection();
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-slate-900" 
      data-testid="settings-page"
    >
      {/* Animated particles background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-30 transform-gpu" 
      />
      
      {/* Navigation */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <Navigation />
      </div>
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-16 pt-4">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-300">Manage your account settings and preferences</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <Card className="bg-[#092946]/50 border-[#71FDFF]/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {settingsSections.map((section) => {
                      const Icon = section.icon;
                      const isActive = activeSection === section.id;
                      
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{section.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              {renderSection()}
              
              {/* Save Button */}
              <div className="mt-6">
                <Button className="bg-accent-cyan text-primary-dark hover:bg-accent-cyan/80 font-semibold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
