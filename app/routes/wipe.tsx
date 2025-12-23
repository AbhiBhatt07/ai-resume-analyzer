
// ============= wipe.tsx =============
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { Trash2, Loader2 } from "lucide-react";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-dark-card border border-zinc-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Account Info</h2>
          <p className="text-zinc-400">Authenticated as: {auth.user?.username}</p>
        </div>

        <div className="bg-dark-card border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Existing Files</h3>
          <div className="flex flex-col gap-2">
            {files.map((file) => (
              <div key={file.id} className="flex flex-row gap-4 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                <p className="text-zinc-300">{file.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-card border border-red-900/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h3>
          <button
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl cursor-pointer transition-all duration-200"
            onClick={() => handleDelete()}
          >
            <Trash2 className="w-5 h-5" />
            Wipe All App Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default WipeApp;