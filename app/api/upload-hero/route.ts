import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const model = (formData.get("model") as string | null)?.toLowerCase() || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicImagesDir = path.join(process.cwd(), "public", "images");
    await fs.mkdir(publicImagesDir, { recursive: true });

    // Determine target filenames to support both named and original Gemini filenames
    let targetFileName = `model-${model}-ia.jpg`;
    if (model === "duna" || file.name.includes("uze0o2")) {
      targetFileName = "Gemini_Generated_Image_uze0o2uze0o2uze0.jpg";
      await fs.writeFile(path.join(publicImagesDir, "model-duna-ia.jpg"), buffer);
    } else if (model === "marea" || file.name.includes("edgigw")) {
      targetFileName = "Gemini_Generated_Image_edgigwedgigwedgi.jpg";
      await fs.writeFile(path.join(publicImagesDir, "model-marea-ia.jpg"), buffer);
    } else if (model === "ocaso" || file.name.includes("aofjj1")) {
      targetFileName = "Gemini_Generated_Image_aofjj1aofjj1aofj.jpg";
      await fs.writeFile(path.join(publicImagesDir, "model-ocaso-ia.jpg"), buffer);
    }

    const filePath = path.join(publicImagesDir, targetFileName);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      fileName: targetFileName,
      path: `/images/${targetFileName}?v=${Date.now()}`,
    });
  } catch (err: any) {
    console.error("Error saving uploaded hero image:", err);
    return NextResponse.json(
      { error: err?.message || "Error saving file" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const publicImagesDir = path.join(process.cwd(), "public", "images");
    const checkFile = async (name: string) => {
      try {
        await fs.access(path.join(publicImagesDir, name));
        return true;
      } catch {
        return false;
      }
    };

    const status = {
      duna:
        (await checkFile("Gemini_Generated_Image_uze0o2uze0o2uze0.jpg")) ||
        (await checkFile("model-duna-ia.jpg")),
      marea:
        (await checkFile("Gemini_Generated_Image_edgigwedgigwedgi.jpg")) ||
        (await checkFile("model-marea-ia.jpg")),
      ocaso:
        (await checkFile("Gemini_Generated_Image_aofjj1aofjj1aofj.jpg")) ||
        (await checkFile("model-ocaso-ia.jpg")),
    };

    return NextResponse.json({ status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
