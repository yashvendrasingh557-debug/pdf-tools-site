// TEST TO PDF
document.getElementById("generateBtn")?.addEventListener("click", () => {
    const text = document.getElementById("textInput").value;
    const blob = new Blob([text], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text.pdf";
    link.click();
});

// MERGE PDF
document.getElementById("mergeBtn")?.addEventListener("click", async () => {
    const files = document.getElementById("mergeFiles").files;
    const pdfLib = await PDFLib.PDFDocument.create();

    for (let f of files) {
        let bytes = await f.arrayBuffer();
        let tempPdf = await PDFLib.PDFDocument.load(bytes);
        let pages = await pdfLib.copyPages(tempPdf, tempPdf.getPageIndices());
        pages.forEach(p => pdfLib.addPage(p));
    }

    const mergedPdf = await pdfLib.save();
    const blob = new Blob([mergedPdf], { type: "application/pdf" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "merged.pdf";
    link.click();
});

// YOUTUBE NOTES
document.getElementById("notesBtn")?.addEventListener("click", () => {
    const link = document.getElementById("ytLink").value;
    const text = "YouTube Notes for: " + link;
    const blob = new Blob([text], { type: "application/pdf" });
    const download = document.createElement("a");

    download.href = URL.createObjectURL(blob);
    download.download = "YT-Notes.pdf";
    download.click();
});
// Merge PDF
document.addEventListener('DOMContentLoaded', () => {
    const mergeBtn = document.getElementById("mergeBtn");
    const mergeInput = document.getElementById("mergeInput");

    if (mergeBtn) {
        mergeBtn.addEventListener("click", async () => {
            const files = mergeInput.files;
            if (files.length < 2) {
                alert("Please select at least 2 PDFs");
                return;
            }

            const { PDFDocument } = PDFLib;
            const mergedPdf = await PDFDocument.create();

            for (let file of files) {
                const pdfBytes = await file.arrayBuffer();
                const pdf = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedBytes = await mergedPdf.save();
            download(mergedBytes, "merged.pdf", "application/pdf");
        });
    }
});

// Text to PDF
function generatePDF() {
    const text = document.getElementById("textInput").value;

    if (!text.trim()) {
        alert("Enter text first!");
        return;
    }

    const { PDFDocument, StandardFonts } = PDFLib;

    (async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        page.drawText(text, { x: 40, y: 750, size: 12, font });

        const pdfBytes = await pdfDoc.save();
        download(pdfBytes, "text.pdf", "application/pdf");
    })();
}

// YouTube Notes (placeholder)
function getYTNotes() {
    alert("YouTube Notes feature coming soon!");
}
