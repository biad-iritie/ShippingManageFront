import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { shipman } from '../../../shipman.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//pdfjs.GlobalWorkerOptions.workerSrc = ${ process.env.PUBLIC_URL } /scripts/pdf.worker.js;
export default function ShipMan() {
    const [numPages, setNumPages] = useState(null);
    const shipman = shipman
    const onDocumentLoadSuccess = (numPages) => {
        setNumPages(numPages);
    }

    return (
        <Document
            file={shipman}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
                console.log(error);
            }}
        >
            {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
        </Document>
    )
}


/* export default class ShipMan extends Component {

    render(props) {
        const [numPages, setNumPages] = useState(null);
        const onDocumentLoadSuccess = (numPages) => {
            setNumPages(numPages);
        }
        //const { pdf } = props;
        return (
            <div>
                Shipman
                <Document
                    file="../ShipMan.pdf"
                    options={{ workerSrc: "/pdf.worker.js" }}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </div>
        )
    }
} */
