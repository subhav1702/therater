import React, { useState, useRef } from "react";
import ReactDOM from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useHistory } from "react-router-dom";
import { jsPDF } from "jspdf";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AddBulkQrCode() {
  let history = useHistory();
  const { eid } = useParams();
  const [screenNumber, setScreenNumber] = useState("");
  const [rowStart, setRowStart] = useState("");
  const [rowEnd, setRowEnd] = useState("");
  const [seatNumberStart, setSeatNumberStart] = useState("");
  const [seatNumberEnd, setSeatNumberEnd] = useState("");
  const qrContainerRef = useRef(null);

  const isNumeric = (value) => /^\d+$/.test(value);

  const generateQrData = () => {
    let qrData = [];
    
    if (isNumeric(rowStart)) {
      for (let row = parseInt(rowStart); row <= parseInt(rowEnd); row++) {
        for (
          let seat = parseInt(seatNumberStart);
          seat <= parseInt(seatNumberEnd);
          seat++
        ) {
          qrData.push({ screen: screenNumber, row, seat });
        }
      }
    } else {
      const startChar = rowStart.toUpperCase().charCodeAt(0);
      const endChar = rowEnd.toUpperCase().charCodeAt(0);
      
      for (let charCode = startChar; charCode <= endChar; charCode++) {
        const row = String.fromCharCode(charCode);
        for (
          let seat = parseInt(seatNumberStart);
          seat <= parseInt(seatNumberEnd);
          seat++
        ) {
          qrData.push({ screen: screenNumber, row, seat });
        }
      }
    }
    
    return qrData;
  };

  const downloadPDF = async () => {
    const qrData = generateQrData();
    if (qrData.length === 0) {
      alert("Please enter valid range values");
      return;
    }

    const doc = new jsPDF("portrait", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const qrSize = 80;
    const marginX = (pageWidth - 2 * qrSize) / 3;
    const marginY = (pageHeight - 2 * qrSize) / 3;
    let x = marginX, y = marginY;

    // Create hidden container
    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.position = 'fixed';
    hiddenContainer.style.top = '-10000px';
    hiddenContainer.style.left = '-10000px';
    document.body.appendChild(hiddenContainer);

    try {
      for (let i = 0; i < qrData.length; i++) {
        const { screen, row, seat } = qrData[i];
        
        // Create container for this QR code
        const qrElement = document.createElement('div');
        qrElement.id = `qr-${i}`;
        qrElement.style.width = '128px';
        qrElement.style.height = '160px';
        qrElement.style.padding = '10px';
        qrElement.style.border = '1px solid #ccc';
        qrElement.style.display = 'flex';
        qrElement.style.flexDirection = 'column';
        qrElement.style.alignItems = 'center';
        qrElement.style.justifyContent = 'center';
        hiddenContainer.appendChild(qrElement);

        // Render QR code properly with React
        ReactDOM.render(
          <>
            <QRCode 
              value={`https://www.google.com/?screen=${screen}&row=${row}&seat=${seat}`}
              size={120}
            />
            <p style={{
              fontSize: '8px',
              textAlign: 'center',
              marginTop: '8px'
            }}>
              Screen: {screen}, Row: {row}, Seat: {seat}
            </p>
          </>,
          qrElement
        );

        // Wait for rendering to complete
        await new Promise(resolve => setTimeout(resolve, 50));

        // Capture the QR code
        const canvas = await html2canvas(qrElement, {
          scale: 2,
          logging: false,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", x, y, qrSize, qrSize);

        // Position next QR code
        if ((i + 1) % 2 === 0) {
          x = marginX;
          y += qrSize + marginY;
        } else {
          x += qrSize + marginX;
        }

        if ((i + 1) % 4 === 0 && i + 1 < qrData.length) {
          doc.addPage();
          x = marginX;
          y = marginY;
        }

        // Clean up
        ReactDOM.unmountComponentAtNode(qrElement);
        hiddenContainer.removeChild(qrElement);
      }

      doc.save("QR_Codes.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      document.body.removeChild(hiddenContainer);
    }
  };

  return (
    <div className="t-4 mx-auto max-w-full">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              inventory
              <BreadcrumbItem>
                <BreadcrumbLink to="/qr">QR</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Generate Bulk QR</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <section>
        <div className="mt-6 mx-auto w-full">
          <div className="min-w-0 mb-6 bg-blueGray-100 bg-white relative flex w-full flex-col break-words rounded-lg border-0 shadow-lg">
            <div className="px-4 py-6 pt-6 flex-auto lg:px-6">
              <div className="flex flex-wrap">
                {/* Screen Number Input */}
                <div className="px-4 w-full">
                  <div className="mb-3 relative w-full md:w-1/2">
                    <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                      Screen Number
                    </label>
                    <Input
                      type="text"
                      className="px-3 py-2"
                      value={screenNumber}
                      onChange={(e) => setScreenNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="px-4 w-full">
                  <div className="mb-3 relative w-full md:w-1/2">
                    <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                      Rows
                    </label>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4 items-center">
                        <label htmlFor="seatStart" className="w-1/12">
                          Start
                        </label>
                        <Input
                          type="text"
                          className="px-3 py-2"
                          id="seatStart"
                          value={rowStart}
                          onChange={(e) => setRowStart(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-4 items-center">
                        <label htmlFor="seatEnd" className="w-1/12">
                          End
                        </label>
                        <Input
                          type="text"
                          className="px-3 py-2"
                          id="seatEnd"
                          value={rowEnd}
                          onChange={(e) => setRowEnd(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seat Number Input */}
                <div className="px-4 w-full">
                  <div className="mb-3 relative w-full md:w-1/2">
                    <label className="text-blueGray-600 mb-2 block text-lg font-bold">
                      Seat Number
                    </label>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4 items-center">
                        <label htmlFor="seatStart" className="w-1/12">
                          Start
                        </label>
                        <Input
                          type="text"
                          className="px-3 py-2"
                          id="seatStart"
                          value={seatNumberStart}
                          onChange={(e) => setSeatNumberStart(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-4 items-center">
                        <label htmlFor="seatEnd" className="w-1/12">
                          End
                        </label>
                        <Input
                          type="text"
                          className="px-3 py-2"
                          id="seatEnd"
                          value={seatNumberEnd}
                          onChange={(e) => setSeatNumberEnd(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="pt-5 gap-5 flex justify-end w-full px-4">
                  <Button
                    type="button"
                    variant="cancel"
                    className="w-24"
                    onClick={() => {
                      history.push("/products");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="black"
                    className="w-24"
                    onClick={downloadPDF}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}