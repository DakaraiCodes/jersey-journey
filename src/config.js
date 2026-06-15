export const FEEDBACK_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfLsCT0UrSEaGhgyETpXcz370BNk3dgnciGOF4ARNK2plcimA/viewform?usp=publish-editor";

export function isFeedbackFormEnabled(url = FEEDBACK_FORM_URL) {
  const trimmedUrl = url.trim();

  return (
    trimmedUrl.length > 0 &&
    !trimmedUrl.includes("PLACEHOLDER") &&
    !trimmedUrl.includes("example.com") &&
    !trimmedUrl.includes("[") &&
    !trimmedUrl.includes("]") &&
    /^https?:\/\//.test(trimmedUrl)
  );
}

export function openFeedbackForm() {
  if (!isFeedbackFormEnabled()) return false;

  window.open(FEEDBACK_FORM_URL, "_blank", "noopener,noreferrer");
  return true;
}
