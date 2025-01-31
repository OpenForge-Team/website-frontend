import { useState, useEffect } from "react";
import { getDocumentUrl } from "@/utils/storage/r2";

interface DocumentViewerProps {
  fileName: string;
  fileType: string;
  onClose: () => void;
}

export function DocumentViewer({ fileName, fileType, onClose }: DocumentViewerProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const documentUrl = await getDocumentUrl(fileName);
        setUrl(documentUrl);
      } catch (error) {
        setError("Failed to load document");
        console.error("Error fetching document URL:", error);
      }
    };
    fetchUrl();
  }, [fileName]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-3xl w-full mx-4">
          <div className="text-red-500">{error}</div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-5xl w-full mx-4 h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Document Viewer</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          {fileType.startsWith('image/') ? (
            <img src={url} alt="Document preview" className="max-w-full h-auto" />
          ) : fileType.startsWith('video/') ? (
            <video controls className="w-full h-full">
              <source src={url} type={fileType} />
              Your browser does not support the video tag.
            </video>
          ) : fileType.startsWith('audio/') ? (
            <audio controls className="w-full">
              <source src={url} type={fileType} />
              Your browser does not support the audio tag.
            </audio>
          ) : fileType === 'application/pdf' ? (
            <iframe src={url} className="w-full h-full" />
          ) : (
            <div className="text-center p-4">
              <p>This file type cannot be previewed.</p>
              <a
                href={url}
                download
                className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
