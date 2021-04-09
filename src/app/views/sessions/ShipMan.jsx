import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { Container, Grid } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import Loading from '../Loading';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//pdfjs.GlobalWorkerOptions.workerSrc = ${ process.env.PUBLIC_URL } /scripts/pdf.worker.js;
export default function ShipMan() {
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

    const shipman = "/shipman.pdf"
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
        setLoading(false)
    }
    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
    const previousPage = () => {
        changePage(-1);
    }

    const nextPage = () => {
        changePage(1);
    }
    const handleChange = (event, value) => {
        setPageNumber(value)
        //console.log(value);
    }
    return (
        <div className="flex justify-center mt-5">
            <Loading open={loading} />
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}>
                <Grid item xs={9} >
                    <Document
                        file={shipman}
                        options={{ workerSrc: "/pdf.worker.js" }}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading=""
                        onLoadError={(error) => {
                            //console.log(error);
                        }}
                    >
                        <Page pageNumber={pageNumber} />
                        {/* {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))} */}
                    </Document>
                </Grid>
                <Grid item xs={3}>

                    <Pagination count={numPages} variant="outlined" color="primary" onChange={handleChange} />

                </Grid>
            </Grid>
            {/* <Container className="ml-5">
                <Document
                    file={shipman}
                    options={{ workerSrc: "/pdf.worker.js" }}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading=""
                    onLoadError={(error) => {
                        //console.log(error);
                    }}
                >
                    <Page pageNumber={pageNumber} />
                {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))} 
                </Document>
            </Container> */}
            {/* <div className="mr-9" style={{
                marginTop: "400px"
            }}>
                <Pagination count={numPages} variant="outlined" color="primary" onChange={handleChange} />
            </div> */}
        </div>

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
