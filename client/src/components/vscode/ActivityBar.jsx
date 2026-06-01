import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscExtensions
} from "react-icons/vsc";
import { FiMenu } from 'react-icons/fi';

function ActivityBar({ onToggleExplorer }) {
  return (
    <div className="w-14 bg-[#333333] flex flex-col items-center py-4 gap-6">
      <button className="md:hidden text-white p-1" onClick={() => onToggleExplorer && onToggleExplorer()} title="Toggle Explorer">
        <FiMenu size={20} />
      </button>

      <VscFiles size={24} />
      <VscSearch size={24} />
      <VscSourceControl size={24} />
      <VscExtensions size={24} />
    </div>
  );
}

export default ActivityBar;