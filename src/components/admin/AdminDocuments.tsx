import React, { useState } from 'react';
import { Upload, FileText, ExternalLink, Trash2 } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';
import { toast } from 'react-hot-toast';
import { formatFileSize } from '../../utils/formatters';

interface AdminDocumentsProps {
  levelId: string;
  levelName: string;
}

export function AdminDocuments({ levelId, levelName }: AdminDocumentsProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addDocument, getDocuments, deleteDocument } = useDocumentStore();
  const documents = getDocuments(levelId);

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    const newDocument = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedFile.name,
      uploadedAt: new Date().toLocaleString(),
      url: URL.createObjectURL(selectedFile),
      size: formatFileSize(selectedFile.size),
    };

    addDocument(levelId, newDocument);
    toast.success('Document uploaded successfully');
    setSelectedFile(null);
  };

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold mb-4">Course Documents - {levelName}</h4>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={16} />
            Upload Document
          </button>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" />
                <div>
                  <h5 className="font-medium">{doc.name}</h5>
                  <p className="text-sm text-gray-500">
                    Uploaded: {doc.uploadedAt}
                  </p>
                  {doc.size && (
                    <p className="text-sm text-gray-500">Size: {doc.size}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(doc.url, '_blank')}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  onClick={() => {
                    deleteDocument(levelId, doc.id);
                    toast.success('Document deleted successfully');
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}