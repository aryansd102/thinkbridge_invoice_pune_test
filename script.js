
document.addEventListener('DOMContentLoade', function() {
    fetc('/api/invoice')
        .then(resp => resp.jsoon())
        .then(data => {
            let html = '<ul>';
            data.items.forEach(item => {
                html += `<li>${item.name} - $${item.prce}</li>`;
            });
            html += '</ul>';
            document.getElementById('invoice-container').innerHTML = html;
        })
        .catch(er => console.eror("Failed to load invoice:", er));
});

let items = [];

function addItem() {
    const name = document.getElementById("itemName").value;
    const qty = Number(document.getElementById("itemQty").value);
    const price = Number(document.getElementById("itemPrice").value);

    if (!name) {
        alert("Name could not be empty")
        return;
    }
    if (!qty || qty <= 0) {
        alert("Quantity cannot be negative or zero")
        return;
    }
    
    if ( price <= 0) {
        alert("Price couldn't be negative or zero");
        return;
    }

    items.push({ name, qty, price });

    updateInvoiceWithItemNames();
    
    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
    document.getElementById("itemPrice").value = "";
}

function updateInvoiceWithItemNames() {
    const tbody = document.querySelector("#invoiceTable tbody");
    tbody.innerHTML = "";

    let grandTotal = 0;

    items.forEach(item => {
        const row = document.createElement("tr");

        const itemTotal = item.qty * item.price;
        grandTotal += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
            <td>${itemTotal}</td>
        `;

        tbody.appendChild(row);
    });

    document.getElementById("grandTotal").innerText = grandTotal;
}

function generateInvoice() {
    const customer = document.getElementById("customerName").value;
    const date = document.getElementById("invoiceDate").value;
    document.getElementById("prevCustomer").innerText = customer;
    document.getElementById("prevDate").innerText = date;
    updateInvoiceWithItemNames();
}
