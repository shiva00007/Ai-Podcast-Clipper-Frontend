import { useEffect, useState } from "react";
import { getClipPlayUrl } from "~/actions/generation";

export function useClipPlayUrl(clipId: string) {
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPlayUrl() {
      try {
        const result = await getClipPlayUrl(clipId);

        if (!isMounted) return;

        if (result.success && result.url) {
          setPlayUrl(result.url);
        } else {
          setError(result.error ?? "Failed to get a URL.");
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message || "Unexpected error occurred.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchPlayUrl();

    return () => {
      isMounted = false;
    };
  }, [clipId]);

  return { playUrl, isLoading, error };
}
