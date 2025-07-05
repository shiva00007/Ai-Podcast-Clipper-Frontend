import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-5 py-12">
      <Loader2 className="text-muted-foreground h-12 w-12 animate-spin" />
      <span className="ml-3 text-2xl">Loading...</span>
    </div>
  );
};

export default Loading;
