document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const amountWithoutVatSpan = document.getElementById('amount-without-vat');
    const vat17Span = document.getElementById('vat-17');
    const amount18Span = document.getElementById('amount-18');
    const totalWith18Span = document.getElementById('total-with-18');
    const copyBtn = document.querySelector('.copy-btn');

    function calculateAll() {
        const amount = parseFloat(amountInput.value) || 0;
        
        // סכום ללא מע"מ (ס פחות 17%)
        const amountWithoutVat = amount / 1.17;
        
        // מע"מ 17% (ס פחות שורה ראשונה)
        const vat17 = amount - amountWithoutVat;
        
        // סכום ה-18% (18% מהסכום ללא מע"מ)
        const amount18 = amountWithoutVat * 0.18;
        
        // סה"כ עם 18% (סכום ללא מע"מ + 18%)
        const totalWith18 = amountWithoutVat + amount18;

        // הצגת התוצאות עם שתי ספרות אחרי הנקודה
        amountWithoutVatSpan.textContent = amountWithoutVat.toFixed(2);
        vat17Span.textContent = vat17.toFixed(2);
        amount18Span.textContent = amount18.toFixed(2);
        totalWith18Span.textContent = totalWith18.toFixed(2);
    }

    // חישוב בכל פעם שהערך משתנה
    amountInput.addEventListener('input', calculateAll);

    // פונקציית ההעתקה
    copyBtn.addEventListener('click', async () => {
        const textToCopy = totalWith18Span.textContent;
        try {
            await navigator.clipboard.writeText(textToCopy);
            copyBtn.classList.add('copy-success');
            copyBtn.classList.remove('fa-copy');
            copyBtn.classList.add('fa-check');
            
            setTimeout(() => {
                copyBtn.classList.remove('copy-success', 'fa-check');
                copyBtn.classList.add('fa-copy');
            }, 2000);
        } catch (err) {
            console.error('שגיאה בהעתקה:', err);
        }
    });

    // חישוב ראשוני
    calculateAll();
});
