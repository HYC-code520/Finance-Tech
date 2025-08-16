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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/design-system" component={DesignSystem} />
      <Route path="/about" component={() => <div className="min-h-screen gradient-bg text-white flex items-center justify-center"><h1 className="text-4xl">About Page - Coming Soon</h1></div>} />
      <Route path="/dashboard" component={() => <div className="min-h-screen gradient-bg text-white flex items-center justify-center"><h1 className="text-4xl">Dashboard - Coming Soon</h1></div>} />
      <Route path="/others" component={() => <div className="min-h-screen gradient-bg text-white flex items-center justify-center"><h1 className="text-4xl">Others - Coming Soon</h1></div>} />
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
