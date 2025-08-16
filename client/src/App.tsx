import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import DesignSystem from "@/pages/design-system";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/design-system" component={DesignSystem} />
      <Route path="/about" component={() => (
        <div className="min-h-screen gradient-bg text-white">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <Navigation />
            <div className="flex items-center justify-center min-h-screen -mt-24">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center">About Page - Coming Soon</h1>
            </div>
          </div>
        </div>
      )} />
      <Route path="/dashboard" component={() => (
        <div className="min-h-screen gradient-bg text-white">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            <Navigation />
            <div className="flex items-center justify-center min-h-screen -mt-24">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center">Dashboard - Coming Soon</h1>
            </div>
          </div>
        </div>
      )} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
