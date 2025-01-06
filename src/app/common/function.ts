export function convertToWords(num: number) {
  const ones: string[] = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens: string[] = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];
  const scales: string[] = ['', 'Thousand', 'Lakh', 'Crore'];

  const convertHundreds = (n: number): string => {
    let str = '';
    if (n > 99) {
      str += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n > 19) {
      str += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    if (n > 0) {
      str += ones[n] + ' ';
    }
    return str.trim();
  };

  const convertSection = (n: number, scaleIndex: number): string => {
    if (n === 0) return '';
    return convertHundreds(n) + ' ' + scales[scaleIndex] + ' ';
  };

  if (num === 0) return 'Zero Rupees';

  let result = '';


  if (num >= 10000000000) { // Handle Crores
    return '';
  }


  if (num >= 10000000) { // Handle Crores
    let crorePart = Math.floor(num / 10000000);
    result += convertSection(crorePart, 3);
    num %= 10000000;
  }

  if (num >= 100000) { // Handle Lakhs
    let lakhPart = Math.floor(num / 100000);
    result += convertSection(lakhPart, 2);
    num %= 100000;
  }

  if (num >= 1000) { // Handle Thousands
    let thousandPart = Math.floor(num / 1000);
    result += convertSection(thousandPart, 1);
    num %= 1000;
  }

  if (num > 0) { // Handle Hundreds
    result += convertSection(num, 0);
  }

  return result.trim() + ' Rupees';
};
