"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { AddFile } from "@/components/section-addFile";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CVGenerator } from "@/components/cv-generator";
import supabase from "@/supabase/supabase";

export default function Page() {
  const [user, setUser] = useState(null);
  
    useEffect(() => {
      const init = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        // Escuchar cambios de auth
        supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });
      };
  
      init();
    }, []);


  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader user={user} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <CVGenerator user={user} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
