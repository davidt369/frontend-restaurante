import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cajaService } from '../services/caja.service';
import { type CajaTurnoResponse, type GastoCajaResponse } from '../types/caja.types';
import { AbrirCajaForm } from '../components/abrir-caja-form';
import { CajaDashboard } from '../components/caja-dashboard';
import { HistorialCajasTable } from '../components/historial-cajas-table';
import { HistorialGastosTable } from '../components/historial-gastos-table';
import { Archive, DollarSign, History, Home } from 'lucide-react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { cn } from '@/lib/utils';

type TabValue = 'gestion' | 'historial-cajas' | 'historial-gastos';

const tabsConfig = {
  'gestion': { label: 'Caja Actual', icon: DollarSign },
  'historial-cajas': { label: 'Historial Cierres', icon: Archive },
  'historial-gastos': { label: 'Historial Gastos', icon: History },
} as const;

export function CajaPage() {
  const [cajaAbierta, setCajaAbierta] = useState<CajaTurnoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>('gestion');

  const [historialCajas, setHistorialCajas] = useState<CajaTurnoResponse[]>([]);
  const [historialGastos, setHistorialGastos] = useState<GastoCajaResponse[]>([]);

  const fetchEstadoCaja = async () => {
    try {
      setLoading(true);
      const data = await cajaService.obtenerCajaAbierta();
      setCajaAbierta(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);
      const [cajas, gastos] = await Promise.all([
        cajaService.obtenerHistorial(),
        cajaService.obtenerHistorialGastos()
      ]);
      setHistorialCajas(cajas);
      setHistorialGastos(gastos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchEstadoCaja();
    loadHistory();
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue);
    if (value !== 'gestion') {
      loadHistory();
    }
  };

  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'gestion':
        return 'Panel de Operaciones';
      case 'historial-cajas':
        return 'Logs de Cierre de Turnos';
      case 'historial-gastos':
        return 'Registro Histórico de Egresos';
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="container mx-auto py-4 sm:py-8 space-y-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-[250px]" />
          <Skeleton className="h-5 w-[200px]" />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 py-3">
          <Skeleton className="h-12 w-full lg:w-[400px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="space-y-6">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  const tabOrder: TabValue[] = ['gestion', 'historial-cajas', 'historial-gastos'];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-4 sm:py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Gestión Financiera
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            {getBreadcrumb()}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          {/* Dashboard Navigation - Ajustado top-16 para que se pegue DEBAJO del header global */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-background/95 backdrop-blur-md sticky top-16 z-20 py-3 border-b border-border/50">
            <TabsList className="bg-muted/50 p-1 h-12 w-full lg:w-auto">
              {tabOrder.map((tab) => {
                const Icon = tabsConfig[tab].icon;
                return (
                  <TabsTrigger 
                    key={tab} 
                    value={tab} 
                    className={cn(
                      "flex-1 lg:px-6 h-10 gap-2 font-semibold transition-all data-[state=active]:bg-background data-[state=active]:shadow-lg",
                      activeTab === tab ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tabsConfig[tab].label}</span>
                    <span className="sm:hidden">{tab === 'gestion' ? 'Hoy' : tab === 'historial-cajas' ? 'Turnos' : 'Gastos'}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-muted/30 rounded-full border border-border/50">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">
                Cajero: {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
          </div>

          <TabsContent value="gestion" className="space-y-6 pt-2 focus-visible:outline-none">
            {cajaAbierta ? (
              <CajaDashboard
                caja={cajaAbierta}
                onCajaCerrada={() => {
                  fetchEstadoCaja();
                  loadHistory();
                }}
                onRefreshCaja={fetchEstadoCaja}
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full min-h-[400px] border-2 border-dashed rounded-3xl bg-muted/5 border-muted-foreground/10 px-4">
                <div className="text-center space-y-3 mb-8">
                  <div className="bg-muted/50 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border">
                    <DollarSign className="h-8 w-8 text-muted-foreground/40" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Caja Cerrada</h2>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    No hay un turno activo en este momento. Inicia el conteo inicial para comenzar.
                  </p>
                </div>
                <AbrirCajaForm onCajaOpened={fetchEstadoCaja} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="historial-cajas" className="focus-visible:outline-none">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Bitácora de Turnos</CardTitle>
                    <CardDescription>Auditoría completa de aperturas y cierres.</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('gestion')}
                    className="gap-2"
                  >
                    <Home className="h-4 w-4" />
                    <span>Inicio</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="rounded-2xl border bg-card/50 overflow-hidden shadow-sm">
                  <HistorialCajasTable cajas={historialCajas} isLoading={loadingHistory} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historial-gastos" className="focus-visible:outline-none">
            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Historial de Egresos</CardTitle>
                    <CardDescription>Detalle cronológico de todos los gastos de caja.</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('gestion')}
                    className="gap-2"
                  >
                    <Home className="h-4 w-4" />
                    <span>Inicio</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="rounded-2xl border bg-card/50 overflow-hidden shadow-sm">
                  <HistorialGastosTable gastos={historialGastos} isLoading={loadingHistory} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
