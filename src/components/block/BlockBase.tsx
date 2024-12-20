import { PropsWithChildren } from 'react';
import { Node } from '@xyflow/react';
import { useEditingBlockStore } from '@/store/editingBlock';
import { useIsEditingStore } from '@/store/workflow';
import UiIcon from '../ui/UiIcon';
import UiCard from '../ui/UiCard';

interface BlockBaseProps extends PropsWithChildren {
  id?: string;
  blockData?: Node;
}

const BlockBase = ({ id, blockData, children }: BlockBaseProps) => {
  const { setEditingBlock } = useEditingBlockStore();
  const { setIsEditing } = useIsEditingStore();

  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.stopPropagation();
  };
  const onEditBlock = () => {
    // label -> blockData
    console.log('edit block', id, blockData);
    if (blockData) {
      setEditingBlock(blockData);
      setIsEditing(true);
    }
  };
  return (
    <div className="block-base relative w-48" onDoubleClick={onDoubleClick}>
      <div
        className="block-menu-container absolute top-0 hidden w-full"
        style={{ transform: 'translateY(-100%)' }}
      >
        <div className="pointer-events-none">
          <p
            title="Block id (click to copy)"
            className="block-menu pointer-events-auto text-overflow inline-block px-1 dark:text-gray-300"
            style={{ maxWidth: '96px', marginBottom: 0 }}
          >
            ✅ Copied
          </p>
        </div>
        {/* Block Menu */}
        <div className="block-menu inline-flex items-center dark:text-gray-300">
          <button title="Delete block">
            <UiIcon name="RiDeleteBinLine" />
          </button>
          <button title="Edit block" onClick={onEditBlock}>
            <UiIcon name="RiPencilLine" />
          </button>
          <button title="Block settings">
            <UiIcon name="RiSettings3Line" />
          </button>
          <button title="Run workflow from here">
            <UiIcon name="RiPlayLine" />
          </button>
        </div>
      </div>
      <UiCard className="block-base__content relative z-10">{children}</UiCard>
    </div>
  );
};

export default BlockBase;
