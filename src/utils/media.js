const MEDIA_ROOT = "/media";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
const VIDEO_EXTENSIONS = ["mp4", "webm", "mov", "m4v", "avi", "mkv"];

function encodeFileName(fileName) {
  return fileName
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function mediaPath(folder, fileName) {
  return `${MEDIA_ROOT}/${folder}/${encodeFileName(fileName)}`;
}

export function getFileExtension(fileName) {
  if (!fileName) {
    return "";
  }

  const noQuery = fileName.split("?")[0];
  const parts = noQuery.split(".");
  if (parts.length < 2) {
    return "";
  }

  return parts[parts.length - 1].toLowerCase();
}

export function getMediaType(fileName, fallbackType = "") {
  const ext = getFileExtension(fileName);
  if (IMAGE_EXTENSIONS.includes(ext)) {
    return "image";
  }

  if (VIDEO_EXTENSIONS.includes(ext)) {
    return "video";
  }

  if (ext === "pdf") {
    return "pdf";
  }

  if (ext) {
    return ext;
  }

  return fallbackType ? fallbackType.toLowerCase() : "file";
}

export function canPreviewInline(mediaType) {
  return ["image", "video", "pdf"].includes(mediaType);
}

function createDoc(name, folder, fileName, size) {
  const path = mediaPath(folder, fileName);
  const mediaType = getMediaType(fileName);

  return {
    name,
    type: mediaType === "file" ? "FILE" : mediaType.toUpperCase(),
    size,
    fileName,
    downloadPath: path,
    previewPath: path,
  };
}

function createImage(name, fileName) {
  return {
    name,
    fileName,
    path: mediaPath("images", fileName),
  };
}

function createVideo(name, fileName) {
  return {
    name,
    fileName,
    path: mediaPath("videos", fileName),
  };
}

export const mediaLibrary = {
  resumeDocuments: [
    createDoc("CV - Eunice Ngosia Mukhebi", "resume", "My CV.pdf", "2.4 MB"),
    createDoc("Recommendation Letter", "resume", "recomendationLatter.pdf", "540 KB"),
  ],
  certificates: [
    createDoc("Advanced Diploma Transcript", "certificates", "Advanced Diploma - Bungoma Bible School Transcripts.pdf", "756 KB"),
    createDoc("Bachelor Transcript", "certificates", "Bachelor of Biblical study - Northwestern Transcript.pdf", "890 KB"),
    createDoc("Ministers' Conference Certificate", "certificates", "Ministers' Conference certificate.pdf", "645 KB"),
    createDoc("School of Worship Certificate", "certificates", "School of Worship Certificate.pdf", "645 KB"),
    createDoc("Certificate Transcript", "certificates", "Transcript - Certificate Bungoma Bible School.pdf", "700 KB"),
  ],
  documents: [
    createDoc("Computer Packages", "documents", "Computer packages.pdf", "420 KB"),
    createDoc("Employment Letter", "documents", "Employment Letter.pdf", "380 KB"),
  ],
  images: [
    createImage("Portrait 1", "img.jpeg"),
    createImage("Ministry Photo 1", "WhatsApp Image 2026-05-21 at 1.08.13 PM.jpeg"),
    createImage("Ministry Photo 2", "WhatsApp Image 2026-05-21 at 1.08.13 PM (1).jpeg"),
    createImage("Ministry Photo 3", "WhatsApp Image 2026-05-21 at 1.08.13 PM (2).jpeg"),
    createImage("Ministry Photo 4", "WhatsApp Image 2026-05-21 at 1.08.13 PM (3).jpeg"),
    createImage("Ministry Photo 5", "WhatsApp Image 2026-05-21 at 1.08.14 PM.jpeg"),
  ],
  videos: [
    createVideo("Ministry Highlight", "WhatsApp Video 2026-05-21 at 2.05.16 AM.mp4"),
  ],
};
