import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Plus,
    Minus,
    Trash2,
    ShoppingBag,
    Utensils,
    Sparkles,
    Search,
    Check,
    ChevronsUpDown,
    AlertCircle,
    PackageOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ItemRow } from "../types/transaccion.types";
import type { Plato } from "@/modules/platos/types/plato.types";
import type { Producto } from "@/modules/productos/types/producto.types";
import { useState, type KeyboardEvent, type RefObject } from "react";

interface TransactionItemsTableProps {
    rows: ItemRow[];
    platos: Plato[];
    productos: Producto[];
    selectItem: (rowId: string, itemId: string) => void;
    updateRow: (id: string, updates: Partial<ItemRow>) => void;
    incrementCantidad: (id: string) => void;
    decrementCantidad: (id: string) => void;
    addNewRow: () => void;
    removeRow: (id: string) => void;
    addExtraToRow: (rowId: string) => void;
    removeExtraFromRow: (rowId: string, extraId: string) => void;
    handleKeyDown: (e: KeyboardEvent, rowId: string, rowIndex: number, cell: "cantidad" | "notas") => void;
    extrasPopoverOpen: { [key: string]: boolean };
    setExtrasPopoverOpen: (open: React.SetStateAction<{ [key: string]: boolean }>) => void;
    extraForm: { precio: string };
    setExtraForm: (form: { precio: string }) => void;
    cantidadInputRefs: RefObject<{ [key: string]: HTMLInputElement | null }>;
    notasInputRefs: RefObject<{ [key: string]: HTMLInputElement | null }>;
}

export function TransactionItemsTable({
    rows,
    platos,
    productos,
    selectItem,
    updateRow,
    incrementCantidad,
    decrementCantidad,
    addNewRow,
    removeRow,
    addExtraToRow,
    removeExtraFromRow,
    handleKeyDown,
    extrasPopoverOpen,
    setExtrasPopoverOpen,
    extraForm,
    setExtraForm,
    cantidadInputRefs,
    notasInputRefs,
}: TransactionItemsTableProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Utensils className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg tracking-tight">Items del Pedido</h3>
                        <p className="text-xs text-muted-foreground">Administra los platos y productos de esta venta</p>
                    </div>
                </div>
                <Button 
                    onClick={addNewRow} 
                    variant="default" 
                    size="sm" 
                    className="shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                    <Plus className="h-4 w-4 mr-2" /> Agregar Item
                </Button>
            </div>

            {rows.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl bg-muted/20 text-muted-foreground animate-in fade-in zoom-in duration-300">
                    <div className="p-4 rounded-full bg-muted mb-4">
                        <PackageOpen className="h-10 w-10 opacity-50" />
                    </div>
                    <p className="text-sm font-medium">No hay items en el pedido</p>
                    <Button 
                        variant="link" 
                        size="sm" 
                        onClick={addNewRow}
                        className="mt-1"
                    >
                        Haz clic aquí para empezar
                    </Button>
                </div>
            ) : (
                <>
                    {/* Desktop View - Table */}
                    <div className="hidden md:block border rounded-xl overflow-hidden shadow-sm bg-card transition-all">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40 border-b">
                                    <TableHead className="w-[50px] text-center font-bold">#</TableHead>
                                    <TableHead className="min-w-[320px] font-bold">Item (Producto o Plato)</TableHead>
                                    <TableHead className="w-[160px] text-center font-bold">Cantidad</TableHead>
                                    <TableHead className="w-[100px] text-center font-bold">Extras</TableHead>
                                    <TableHead className="min-w-[200px] font-bold">Observaciones</TableHead>
                                    <TableHead className="w-[80px] text-right font-bold pr-6">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.id} className="group hover:bg-muted/20 transition-colors border-b last:border-0">
                                        <TableCell className="text-center">
                                            <span className="font-mono text-xs text-muted-foreground font-medium">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                        </TableCell>

                                        {/* Item Selection with Searchable Combobox */}
                                        <TableCell>
                                            <div className="flex flex-col gap-1.5 py-1">
                                                <ItemSelector
                                                    value={row.item_id}
                                                    onSelect={(value) => selectItem(row.id, value)}
                                                    platos={platos}
                                                    productos={productos}
                                                />

                                                {/* Inline Extras Display */}
                                                {row.extras.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mt-1.5 animate-in slide-in-from-left-2 duration-200">
                                                        {row.extras.map((extra) => (
                                                            <Badge
                                                                key={extra.id}
                                                                variant="secondary"
                                                                className="px-2 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-700 border-amber-200"
                                                            >
                                                                <Sparkles className="h-2.5 w-2.5 mr-1" />
                                                                {extra.descripcion} (+Bs {extra.precio.toFixed(2)})
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Cantidad */}
                                        <TableCell>
                                            <div className="flex items-center justify-center">
                                                <div className="flex items-center bg-muted/30 rounded-lg p-1 border">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-md hover:bg-background shadow-none transition-all active:scale-90"
                                                        onClick={() => decrementCantidad(row.id)}
                                                        disabled={row.cantidad <= 1}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <Input
                                                        ref={(el) => {
                                                            if (cantidadInputRefs.current) {
                                                                cantidadInputRefs.current[row.id] = el;
                                                            }
                                                        }}
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        value={row.cantidad}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                            updateRow(row.id, {
                                                                cantidad: parseInt(e.target.value) || 1,
                                                            })
                                                        }
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e, row.id, index, "cantidad")
                                                        }
                                                        className="text-center h-7 w-12 border-0 bg-transparent focus-visible:ring-0 font-bold p-0"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-md hover:bg-background shadow-none transition-all active:scale-90"
                                                        onClick={() => incrementCantidad(row.id)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Extras Button */}
                                        <TableCell className="text-center">
                                            <ItemExtrasPopover
                                                row={row}
                                                extrasPopoverOpen={extrasPopoverOpen}
                                                setExtrasPopoverOpen={setExtrasPopoverOpen}
                                                extraForm={extraForm}
                                                setExtraForm={setExtraForm}
                                                addExtraToRow={addExtraToRow}
                                                removeExtraFromRow={removeExtraFromRow}
                                            />
                                        </TableCell>

                                        {/* Notas */}
                                        <TableCell>
                                            <div className="relative group/input">
                                                <Input
                                                    ref={(el) => {
                                                        if (notasInputRefs.current) {
                                                            notasInputRefs.current[row.id] = el;
                                                        }
                                                    }}
                                                    value={row.notas}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        updateRow(row.id, { notas: e.target.value })
                                                    }
                                                    placeholder="Sin observaciones..."
                                                    className="h-9 bg-muted/10 border-muted-foreground/20 focus:bg-background transition-colors text-sm"
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(e, row.id, index, "notas")
                                                    }
                                                />
                                            </div>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right pr-6">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeRow(row.id)}
                                                className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="md:hidden space-y-4">
                        {rows.map((row, index) => (
                            <div key={row.id} className="p-4 border shadow-sm rounded-2xl bg-card space-y-4 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                
                                <div className="flex items-center justify-between pl-1">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                            {index + 1}
                                        </div>
                                        {row.item_nombre && (
                                            <Badge variant="outline" className="text-[10px] py-0 border-primary/20 text-primary">
                                                {row.tipo === "plato" ? "PLATO" : "PRODUCTO"}
                                            </Badge>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeRow(row.id)}
                                        className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-4 pl-1">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Seleccionar Item</label>
                                        <ItemSelector
                                            value={row.item_id}
                                            onSelect={(value) => selectItem(row.id, value)}
                                            platos={platos}
                                            productos={productos}
                                            className="h-11 rounded-xl"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Cantidad</label>
                                            <div className="flex items-center justify-between bg-muted/30 rounded-xl p-1 border">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg bg-background shadow-sm hover:shadow active:scale-90"
                                                    onClick={() => decrementCantidad(row.id)}
                                                    disabled={row.cantidad <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="font-bold text-lg">{row.cantidad}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg bg-background shadow-sm hover:shadow active:scale-90"
                                                    onClick={() => incrementCantidad(row.id)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5 flex flex-col justify-end">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Extras</label>
                                            <ItemExtrasPopover
                                                row={row}
                                                extrasPopoverOpen={extrasPopoverOpen}
                                                setExtrasPopoverOpen={setExtrasPopoverOpen}
                                                extraForm={extraForm}
                                                setExtraForm={setExtraForm}
                                                addExtraToRow={addExtraToRow}
                                                removeExtraFromRow={removeExtraFromRow}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Notas / Observaciones</label>
                                        <Input
                                            value={row.notas}
                                            onChange={(e) => updateRow(row.id, { notas: e.target.value })}
                                            placeholder="Ej. Sin cebolla, término medio..."
                                            className="h-11 rounded-xl bg-muted/10"
                                        />
                                    </div>

                                    {/* Mobile Extras Display */}
                                    {row.extras.length > 0 && (
                                        <div className="flex flex-wrap gap-2 py-1">
                                            {row.extras.map((extra) => (
                                                <Badge
                                                    key={extra.id}
                                                    variant="secondary"
                                                    className="bg-amber-50 text-amber-700 border-amber-200/50 px-2.5 py-1 rounded-lg text-[10px] font-semibold"
                                                >
                                                    <Sparkles className="h-2.5 w-2.5 mr-1" />
                                                    {extra.descripcion}: Bs {extra.precio.toFixed(2)}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

/**
 * Searchable Item Selector (Combobox)
 * Provides a much better UX than a standard Select for large lists
 */
function ItemSelector({
    value,
    onSelect,
    platos,
    productos,
    className
}: {
    value: string;
    onSelect: (val: string) => void;
    platos: Plato[];
    productos: Producto[];
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    
    // Find selected item label for display
    const selectedPlato = platos.find(p => p.id === value);
    const selectedProducto = productos.find(p => p.id === value);
    
    const label = selectedPlato 
        ? selectedPlato.nombre 
        : selectedProducto 
            ? selectedProducto.nombre 
            : "Seleccionar item...";
            
    const price = selectedPlato 
        ? Number(selectedPlato.precio).toFixed(2) 
        : selectedProducto 
            ? Number(selectedProducto.precio).toFixed(2) 
            : null;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between h-9 text-sm font-normal bg-background/50 hover:bg-background transition-colors",
                        !value && "text-muted-foreground",
                        value && "font-medium",
                        className
                    )}
                >
                    <div className="flex items-center gap-2 truncate">
                        {selectedPlato && <Utensils className="h-3.5 w-3.5 text-orange-500" />}
                        {selectedProducto && <ShoppingBag className="h-3.5 w-3.5 text-blue-500" />}
                        {!value && <Search className="h-3.5 w-3.5 opacity-50" />}
                        <span className="truncate">{label}</span>
                        {price && (
                            <span className="ml-1 text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full border">
                                Bs {price}
                            </span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[300px]" align="start">
                <Command>
                    <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <CommandInput placeholder="Buscar plato o producto..." className="h-10 border-none focus:ring-0" />
                    </div>
                    <CommandList 
                        className="max-h-[300px] overflow-y-auto"
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                    >
                        <CommandEmpty>
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <AlertCircle className="h-8 w-8 text-muted-foreground/30 mb-2" />
                                <p className="text-sm">No se encontraron resultados</p>
                            </div>
                        </CommandEmpty>
                        
                        {platos.length > 0 && (
                            <CommandGroup heading={<span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-1.5"><Utensils className="h-3 w-3" /> Platos</span>}>
                                {platos.map((plato) => (
                                    <CommandItem
                                        key={plato.id}
                                        value={plato.nombre}
                                        onSelect={() => {
                                            onSelect(plato.id);
                                            setOpen(false);
                                        }}
                                        className="flex items-center justify-between cursor-pointer py-2.5 px-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "h-8 w-8 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-600",
                                                value === plato.id && "bg-orange-500 text-white"
                                            )}>
                                                <Utensils className="h-4 w-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm leading-none mb-1">{plato.nombre}</span>
                                                <span className="text-[10px] text-muted-foreground">Plato preparado</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-foreground">Bs {Number(plato.precio).toFixed(2)}</span>
                                            {value === plato.id && <Check className="h-4 w-4 text-primary" />}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        
                        <Separator className="my-1 opacity-50" />
                        
                        {productos.length > 0 && (
                            <CommandGroup heading={<span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-1.5"><ShoppingBag className="h-3 w-3" /> Productos</span>}>
                                {productos.map((producto) => (
                                    <CommandItem
                                        key={producto.id}
                                        value={producto.nombre}
                                        onSelect={() => {
                                            onSelect(producto.id);
                                            setOpen(false);
                                        }}
                                        className="flex items-center justify-between cursor-pointer py-2.5 px-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "h-8 w-8 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-600",
                                                value === producto.id && "bg-blue-500 text-white"
                                            )}>
                                                <ShoppingBag className="h-4 w-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm leading-none mb-1">{producto.nombre}</span>
                                                <span className="text-[10px] text-muted-foreground">Producto de stock</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-foreground">Bs {Number(producto.precio).toFixed(2)}</span>
                                            {value === producto.id && <Check className="h-4 w-4 text-primary" />}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

// Subcomponent to handle extras popover in both views
function ItemExtrasPopover({
    row,
    extrasPopoverOpen,
    setExtrasPopoverOpen,
    extraForm,
    setExtraForm,
    addExtraToRow,
    removeExtraFromRow,
}: {
    row: ItemRow;
    extrasPopoverOpen: { [key: string]: boolean };
    setExtrasPopoverOpen: (open: React.SetStateAction<{ [key: string]: boolean }>) => void;
    extraForm: { precio: string };
    setExtraForm: (form: { precio: string }) => void;
    addExtraToRow: (rowId: string) => void;
    removeExtraFromRow: (rowId: string, extraId: string) => void;
}) {
    const hasExtras = row.extras.length > 0;
    
    return (
        <Popover
            open={extrasPopoverOpen[row.id] || false}
            onOpenChange={(open) =>
                setExtrasPopoverOpen((prev) => ({
                    ...prev,
                    [row.id]: open,
                }))
            }
        >
            <PopoverTrigger asChild>
                <Button
                    variant={hasExtras ? "default" : "outline"}
                    size="sm"
                    className={cn(
                        "h-9 md:h-8 w-full md:w-auto min-w-[40px] rounded-xl md:rounded-lg shadow-sm border-dashed",
                        hasExtras && "bg-amber-500 hover:bg-amber-600 border-none text-white",
                        !row.item_id && "opacity-50 pointer-events-none"
                    )}
                    disabled={!row.item_id}
                >
                    <Sparkles className={cn("h-3.5 w-3.5", hasExtras ? "mr-1.5" : "")} />
                    {hasExtras && <span className="font-bold text-xs">{row.extras.length}</span>}
                    {!hasExtras && <span className="md:hidden ml-2 text-xs">Extras</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 sm:w-96 p-0 border rounded-2xl shadow-xl overflow-hidden" align="end">
                <div className="bg-amber-500 p-4 text-white">
                    <h4 className="font-bold text-base flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Extras del Item
                    </h4>
                    <p className="text-[10px] opacity-90 mt-0.5 uppercase tracking-wider font-semibold">
                        {row.item_nombre || "Cargando..."}
                    </p>
                </div>
                
                <div className="p-4 space-y-4">
                    {row.extras.length > 0 ? (
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                            {row.extras.map((extra) => (
                                <div
                                    key={extra.id}
                                    className="flex items-center justify-between p-3 bg-muted/50 rounded-xl group transition-colors hover:bg-muted"
                                >
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-foreground">
                                            {extra.ingrediente_nombre || extra.descripcion}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Badge variant="outline" className="h-4 text-[9px] px-1 py-0">BS {extra.precio.toFixed(2)}</Badge>
                                            <span className="text-[10px] text-muted-foreground opacity-70 italic">Cantidad: {extra.cantidad}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-destructive/60 hover:text-destructive hover:bg-destructive/10 rounded-lg group-hover:bg-background"
                                        onClick={() => removeExtraFromRow(row.id, extra.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground italic">
                            <Plus className="h-8 w-8 opacity-20 mb-2" />
                            <p className="text-xs">No hay extras aplicados aún</p>
                        </div>
                    )}

                    <div className="space-y-4 bg-muted/30 p-4 rounded-2xl border border-dashed">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest pl-1">Precio Personalizado</label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">Bs</span>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        value={extraForm.precio}
                                        onChange={(e) =>
                                            setExtraForm({
                                                ...extraForm,
                                                precio: e.target.value,
                                            })
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addExtraToRow(row.id);
                                            }
                                        }}
                                        className="h-10 pl-9 text-sm font-bold rounded-xl border-none shadow-inner bg-background"
                                    />
                                </div>
                                <Button
                                    size="icon"
                                    className="h-10 w-10 shrink-0 rounded-xl"
                                    onClick={() => addExtraToRow(row.id)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <Separator className="opacity-50" />
                        
                        <Button
                            size="sm"
                            className="w-full h-10 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
                            onClick={() => addExtraToRow(row.id)}
                        >
                            <Plus className="h-3.5 w-3.5 mr-2" />
                            Agregar Detalle Extra
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

