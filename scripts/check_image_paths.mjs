import fs from "node:fs/promises";
import path from "node:path";

const PUB = path.join(process.cwd(), "public");

async function checkImagePaths() {
  console.log("Checking image paths...");
  
  // Check BE state images
  const beDir = path.join(PUB, "assets", "lid", "states", "BE");
  const beFiles = await fs.readdir(beDir);
  console.log("BE directory files:", beFiles);
  
  // Check if specific files exist
  const testFiles = [
    "BE01_A.png",
    "BE01_B.png", 
    "BE01_C.png",
    "BE01_D.png"
  ];
  
  for (const file of testFiles) {
    const filePath = path.join(beDir, file);
    try {
      await fs.access(filePath);
      console.log(`✅ ${file} exists`);
    } catch (error) {
      console.log(`❌ ${file} missing`);
    }
  }
  
  // Check JSON structure
  const beJsonPath = path.join(PUB, "lid", "be.json");
  try {
    const jsonContent = await fs.readFile(beJsonPath, "utf8");
    const data = JSON.parse(jsonContent);
    console.log("BE01 question structure:");
    console.log("- ID:", data[0]?.id);
    console.log("- Choices:", data[0]?.choices?.length);
    console.log("- First choice imageSrc:", data[0]?.choices?.[0]?.imageSrc);
  } catch (error) {
    console.error("Error reading BE JSON:", error);
  }
}

checkImagePaths();
