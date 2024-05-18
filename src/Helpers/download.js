export const exportTxt = (content, txtName) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = txtName;
    link.href = url;
    link.click();
}