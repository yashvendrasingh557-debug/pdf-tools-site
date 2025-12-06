function generateTestPDF() {
    const text = document.getElementById("testInput").value;

    if (!text.trim()) {
        alert("Please enter some text!");
        return;
    }

    // Create PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const lines = pdf.splitTextToSize(text, 180); 
    pdf.text(lines, 15, 20);

    pdf.save("test.pdf");
}
