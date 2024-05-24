import { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import "/app/globals.css";

export default function PDF() {
    const pdfRef = useRef(null);
    const content = pdfRef.current;

    const doc = new jsPDF();
    const handleDownload = () => {
        useEffect(() => {
            
        })
        // doc.internal.pageSize.setWidth(595);
        // doc.internal.pageSize.setHeight(842);
        console.log();
        console.log(content.clientWidth, content.clientHeight)
        doc.internal.pageSize.setWidth(content.clientWidth);
        doc.internal.pageSize.setHeight(content.clientHeight);
        doc.html(content, {
            callback: function (doc) {
                doc.save('sample.pdf');
            }
        });
    };

    return (
        <div id="screen" className='w-full h-dvh flex p-10'>
            <div id="config" className='w-full'>
                <p>lol</p>
                <button onClick={handleDownload}>Download</button>
            </div>
            <div className='w-fit'>
                <div ref={pdfRef} id="livepreview" className='bg-gray-300 border border-black w-A4 h-A4 origin-top-right'>
                    <div>bah oui</div>
                    <div>bah oui</div>
                    <div>bah oui</div>
                    <div>bah oui</div>
                    <div>bah oui</div>
                    <div>bah oui</div>
                </div>
            </div>
        </div>
    );
}