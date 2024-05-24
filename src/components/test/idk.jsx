import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import "/app/globals.css";

export default function PDF() {
    const pdfRef = useRef(null);

    const handleDownload = () => {
        const content = pdfRef.current;

        const doc = new jsPDF("p", "mm", "a4");
        doc.internal.pageSize.setWidth(5);
        console.log(content.clientWidth);
        console.log(doc.internal.pageSize.getWidth());
        console.log(doc.internal.pageSize.getHeight());
        doc.html(content, {
            callback: function (doc) {
                doc.save('sample.pdf');
            }
        });
    };

    return (
        <div className='w-full h-dvh bg-gray-300 p-10'>
            <div ref={pdfRef} className='bg-gray-300 border border-black h-full aspect-A4'>
                <div>bah oui</div>
                <div>bah oui</div>
                <div>bah oui</div>
                <div>bah oui</div>
                <div>bah oui</div>
                <div>bah oui</div>
            </div>
            <footer>
                <button onClick={handleDownload}>Download</button>
            </footer>
        </div>
    );
}