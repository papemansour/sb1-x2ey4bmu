import React from 'react';
import { Level, Document, Homework } from '../../types/course';
import { AdminHomework } from './AdminHomework';
import { AdminDocuments } from './AdminDocuments';

interface AdminLevelCardProps {
  level: Level;
  documents: Document[];
  homework: Homework[];
  onAddDocument: (document: Document) => void;
  onDeleteDocument: (documentId: string) => void;
  onDeleteHomework: (homeworkId: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

export function AdminLevelCard({
  level,
  documents,
  homework,
  onAddDocument,
  onDeleteDocument,
  onDeleteHomework,
  isSelected,
  onSelect,
}: AdminLevelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{level.name}</h3>
          <button
            onClick={onSelect}
            className={`px-4 py-2 rounded ${
              isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>

        <AdminDocuments levelId={level.id} levelName={level.name} />
        <AdminHomework levelId={level.id} levelName={level.name} />
      </div>
    </div>
  );
}