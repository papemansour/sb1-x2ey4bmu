import React from 'react';
import { FileText, ExternalLink, Trash2, Calendar } from 'lucide-react';
import { useHomeworkStore } from '../../store/homeworkStore';
import { toast } from 'react-hot-toast';

interface AdminHomeworkProps {
  levelId: string;
  levelName: string;
}

export function AdminHomework({ levelId, levelName }: AdminHomeworkProps) {
  const { getCompletedHomework, deleteCompletedHomework } = useHomeworkStore();
  const submissions = getCompletedHomework(levelId);

  const handleDelete = (homeworkId: string) => {
    deleteCompletedHomework(levelId, homeworkId);
    toast.success('Homework submission deleted');
  };

  if (submissions.length === 0) {
    return (
      <div className="border-t pt-4">
        <h4 className="font-semibold mb-3">Homework Submissions - {levelName}</h4>
        <p className="text-gray-500">No homework submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold mb-3">
        Homework Submissions - {levelName} ({submissions.length})
      </h4>
      <div className="space-y-3">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" />
              <div>
                <h5 className="font-medium">{submission.name}</h5>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>Submitted: {submission.uploadedAt}</span>
                </div>
                {submission.size && (
                  <p className="text-sm text-gray-500">Size: {submission.size}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(submission.url, '_blank')}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={18} />
              </button>
              <button
                onClick={() => handleDelete(submission.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}