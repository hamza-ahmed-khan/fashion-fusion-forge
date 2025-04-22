
import { useState } from "react";
import { Client } from "@gradio/client";
import { DesignForm } from "./DesignForm";
import type { DesignPrompt } from "@/types/design";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export const DesignStudio = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateDesign = async (designPrompt: DesignPrompt) => {
    setIsLoading(true);
    try {
      const client = await Client.connect("stabilityai/stable-diffusion");
      const result = await client.predict("/infer", {
        prompt: designPrompt.prompt,
        negative: designPrompt.negative,
        scale: designPrompt.scale,
      });
      
      setGeneratedImage(result.data[0]);
      toast({
        title: "Design Generated!",
        description: "Your fashion design has been created successfully.",
      });
    } catch (error) {
      console.error("Error generating design:", error);
      toast({
        title: "Error",
        description: "Failed to generate design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-900">Fashion Design Studio</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your fashion ideas into stunning designs using AI. Simply describe your vision,
            and watch it come to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <DesignForm onSubmit={generateDesign} isLoading={isLoading} />
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-900">Generated Design</h2>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {isLoading ? (
                  <div className="text-gray-500">Generating your design...</div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated design"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500">
                    Your generated design will appear here
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
