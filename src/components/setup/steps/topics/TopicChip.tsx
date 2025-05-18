
import { useState, useRef, useEffect } from "react";
import { Topic } from "@/types/brandTypes";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicChipProps {
  topic: Topic;
  onUpdate: (updatedTopic: Topic) => void;
}

export const TopicChip = ({ topic, onUpdate }: TopicChipProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(topic.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim() !== "") {
      onUpdate({
        ...topic,
        name: editValue.trim()
      });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(topic.name); // Reset to original value
      setIsEditing(false);
    }
  };

  return (
    <div className="relative inline-block">
      {isEditing ? (
        <div className="min-w-[120px]">
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="py-1 h-8 text-sm focus:ring-brand-purple"
            autoFocus
          />
        </div>
      ) : (
        <Badge
          variant="outline"
          className={cn(
            "px-4 py-2 text-sm cursor-pointer transition-all hover:bg-brand-purple/10",
            "border-brand-purple/30 hover:border-brand-purple",
            "group flex items-center gap-1.5 min-w-[80px]"
          )}
          onClick={handleEdit}
        >
          <span className="truncate">{topic.name}</span>
          <Edit className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
        </Badge>
      )}
    </div>
  );
};
