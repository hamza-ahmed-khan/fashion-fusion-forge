import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DesignPrompt, DesignCategory } from "@/types/design";
import { Textarea } from "@/components/ui/textarea";

interface DesignFormProps {
  onSubmit: (data: DesignPrompt) => void;
  isLoading: boolean;
}

export const DesignForm = ({ onSubmit, isLoading }: DesignFormProps) => {
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [scale, setScale] = useState([9]);
  const [category, setCategory] = useState<DesignCategory>("clothing");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      prompt: `${category}: ${prompt}`,
      negative,
      scale: scale[0],
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="category">Design Category</Label>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as DesignCategory)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="bags">Bags</SelectItem>
            <SelectItem value="shoes">Shoes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prompt">Design Description</Label>
        <Textarea
          id="prompt"
          placeholder="Describe your design (e.g., A modern minimalist summer dress with floral patterns)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="h-24"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="negative">Negative Prompt</Label>
        <Textarea
          id="negative"
          placeholder="What to avoid in the design (e.g., dark colors, complex patterns)"
          value={negative}
          onChange={(e) => setNegative(e.target.value)}
          className="h-24"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Guidance Scale: {scale}</Label>
        <Slider
          value={scale}
          onValueChange={setScale}
          min={1}
          max={20}
          step={1}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Generating Design..." : "Generate Design"}
      </Button>
    </form>
  );
};
