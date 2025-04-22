// pages/api/generate-design.ts

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }
  
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      });
  
      if (!response.ok) {
        const err = await response.text();
        return res.status(500).json({ message: "API call failed", details: err });
      }
  
      const buffer = await response.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      const dataUrl = `data:image/png;base64,${base64Image}`;
  
      return res.status(200).json({ image: dataUrl });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong", error: err });
    }
  }
  