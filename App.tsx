
import React, { useState, useCallback, Suspense, lazy } from 'react';
import { SkeletonElement } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';

const LazyExportModal = lazy(() => import('./components/ExportModal'));

const App: React.FC = () => {
  const [elements, setElements] = useState<SkeletonElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const addElement = useCallback((element: Omit<SkeletonElement, 'id'>) => {
    setElements((prev) => [...prev, { ...element, id: `el_${Date.now()}` }]);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<SkeletonElement>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if(selectedElementId === id) {
        setSelectedElementId(null);
    }
  }, [selectedElementId]);

  const selectedElement = elements.find((el) => el.id === selectedElementId) || null;

  return (
    <div className="flex flex-col h-screen bg-slate-900 font-sans">
      <Header onExport={() => setIsExportModalOpen(true)} />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar onAddElement={addElement} />
        <div className="flex-1 flex justify-center items-center p-4 lg:p-8 bg-grid-pattern overflow-auto">
             <Canvas
                elements={elements}
                selectedElementId={selectedElementId}
                onSelectElement={setSelectedElementId}
                onUpdateElement={updateElement}
            />
        </div>
        <PropertiesPanel
          selectedElement={selectedElement}
          onUpdateElement={updateElement}
          onRemoveElement={removeElement}
        />
      </main>
      {isExportModalOpen && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">Loading...</div>}>
            <LazyExportModal
                elements={elements}
                onClose={() => setIsExportModalOpen(false)}
            />
        </Suspense>
      )}
    </div>
  );
};

const bgPattern = `
.bg-grid-pattern {
    background-image: linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: center;
}
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = bgPattern;
document.head.appendChild(styleSheet);


export default App;
