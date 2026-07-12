import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Logo } from "@/components/logo";
import {
  IcDashboard,
  IcBriefcase,
  IcScan,
  IcSettings,
  IcLogout,
  IcSun,
  IcMoon,
} from "@/components/icons";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: IcDashboard },
  { title: "Applications", url: "/applications", icon: IcBriefcase },
  { title: "Resume", url: "/resume", icon: IcScan },
  { title: "Settings", url: "/settings", icon: IcSettings },
] as const;

export function AppSidebar() {
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme, toggle } = useTheme();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    router.navigate({ to: "/auth", replace: true });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-1.5 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Hiredge dashboard"
        >
          <Logo size={24} />
          <span className="truncate text-[13px] font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Hiredge
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.14em]">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  currentPath === item.url || currentPath.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="h-8"
                    >
                      <Link to={item.url} className="flex items-center gap-2.5">
                        <item.icon size={16} className={active ? "text-primary" : ""} />
                        <span className="text-[13px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-1 px-1 group-data-[collapsible=icon]:flex-col">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="h-8 w-8 shrink-0"
          >
            {theme === "dark" ? <IcSun size={15} /> : <IcMoon size={15} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="h-8 flex-1 justify-start text-[13px] group-data-[collapsible=icon]:hidden"
          >
            <IcLogout size={15} className="mr-2" />
            Sign out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
