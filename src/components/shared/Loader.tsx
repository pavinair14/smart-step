import { Loader2 } from "lucide-react";

export const LoaderCircle = ({ className }: { className?: string }) => (
    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <Loader2 className={`h-8 w-8 animate-spin mb-2 ${className}`} />
        <span>Loading...</span>
    </div>
);