import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './invoice.css'

const Invoice = ({ order }) => {
  const generatePDF = () => {
    const invoice = document.getElementById('invoice-template');
    html2canvas(invoice, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${order._id}.pdf`);
    }).catch((error) => {
      console.error("Error generating PDF: ", error);
    });
  };

  return (
    <div>
      <button onClick={generatePDF} className="my-button">
        Download Invoice
      </button>

      <div id="invoice-template" className="invoice-template">
        <div className="invoice-header">
          <h1>Invoice</h1>
          {/* <p>Order ID: {order._id}</p> */}
          <p>Date: {order.createdAt.slice(0, 10)}</p>
        </div>

        <div className="invoice-body">
          <h2>Order Details</h2>
          {order.cart.map((item, index) => (
            <div key={index} className="invoice-item">
              <img src={`${backend_url}/${item.images[0]}`} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>SKU: {item.skuid}</p>
                <p>Category: {item.category}</p>
                <p>Subcategory: {item.subcategory}</p>
                <p>Quantity: {item.qty}</p>
                <p>Price: ₹{item.discountPrice}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="invoice-footer">
          <h2>Totals</h2>
          <p>Total Price: ₹{order.totalPrice}</p>
          <p>Shipping: ₹{order.shipping.toFixed(2)}</p>
          <p>Discount: ₹{order.discount.toFixed(2)}</p>
          <p>Grand Total: ₹{order.totalPrice + order.shipping}</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;